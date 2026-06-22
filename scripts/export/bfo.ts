import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { setTimeout } from "node:timers/promises";
import { brotliCompressSync, brotliDecompressSync } from "node:zlib";
import * as v from "valibot";
import { getOrganizationBFO } from "../../src/bfo/index.ts";
import {
	type BFOResponse,
	BFOResponseSchema,
} from "../../src/bfo/schemas/index.ts";

const EXPORTS_DIR = join(import.meta.dirname, "..", "..", "exports");

const ids = readOrgIds();
const bfo = await fetchBfo(ids);
const compressed = brotliCompressSync(JSON.stringify(bfo));

writeFileSync(join(EXPORTS_DIR, "bfo.json.br"), compressed);

function readOrgIds() {
	const file = readFileSync(join(EXPORTS_DIR, "companies.json.br"));
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
