import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { setTimeout } from "node:timers/promises";
import { promisify } from "node:util";
import { brotliCompress, brotliDecompressSync } from "node:zlib";
import * as v from "valibot";
import { getOrganizationBFO } from "../../src/bfo/index.ts";
import {
	type BFOResponse,
	BFOResponseSchema,
} from "../../src/bfo/schemas/index.ts";
import type { Correction } from "../../src/index.ts";

const brotliCompressAsync = promisify(brotliCompress);
const EXPORTS_DIR = join(import.meta.dirname, "..", "..", "exports");

const ids = await readOrgIds();
const bfo = await fetchBfo(ids);

await Promise.all([exportRaw(bfo), exportLatest(bfo)]);

async function readOrgIds() {
	const file = await readFile(join(EXPORTS_DIR, "companies.json.br"));
	const data = JSON.parse(brotliDecompressSync(file).toString());
	return data.map(({ id }: { id: number }) => id);
}

async function fetchBfo(ids: number[]) {
	const result: Record<string, BFOResponse> = {};

	for (const id of ids) {
		await setTimeout(200);
		const data = await getOrganizationBFO(id);
		const { success, output, issues } = v.safeParse(BFOResponseSchema, data);

		if (!success) {
			console.error(`Failed to parse ${id}:\n\n${v.summarize(issues)}`);
			process.exitCode = 1;
			continue;
		}

		result[id] = output;
	}

	return result;
}

async function exportRaw(data: Record<string, BFOResponse>) {
	const json = JSON.stringify(data);
	const compressed = await brotliCompressAsync(json);
	await writeFile(join(EXPORTS_DIR, "bfo-raw.json.br"), compressed);
}

async function exportLatest(data: Record<string, BFOResponse>) {
	const corrections: Correction[] = [];

	for (const bfos of Object.values(data)) {
		const bfo = bfos.reduce(
			(acc, v) => (Number(v.period) > Number(acc.period) ? v : acc),
			bfos[0],
		);

		corrections.push(bfo.typeCorrections[0].correction);
	}

	const json = JSON.stringify(corrections);
	const compressed = await brotliCompressAsync(json);
	await writeFile(join(EXPORTS_DIR, "bfo-latest.json.br"), compressed);
}
