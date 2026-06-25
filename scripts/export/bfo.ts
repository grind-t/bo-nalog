import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { setTimeout } from "node:timers/promises";
import { promisify } from "node:util";
import { brotliCompress, brotliDecompressSync } from "node:zlib";
import * as v from "valibot";
import { getOrganizationBFO } from "../../src/bfo/index.ts";
import { BFOResponseSchema } from "../../src/bfo/schemas/index.ts";
import { getBFOAnalysis } from "../../src/bfo-analysis/index.ts";
import type { BFOAnalysis } from "../../src/bfo-analysis/schemas/index.ts";
import type { BFO } from "../../src/index.ts";

const brotliCompressAsync = promisify(brotliCompress);
const EXPORTS_DIR = join(import.meta.dirname, "..", "..", "exports");

const ids = await readOrgIds();
const bfo = await fetchBfo(ids);
const analysis = bfo.map(getBFOAnalysis);
const latestAnalysis = Array.from(
	analysis
		.reduce((acc, curr) => {
			const prev = acc.get(curr.inn);
			const isNewer = !prev || curr.period > prev.period;
			if (isNewer) acc.set(curr.inn, curr);
			return acc;
		}, new Map<string, BFOAnalysis>())
		.values(),
);

await Promise.all([
	exportData("bfo", bfo),
	exportData("bfo-analysis", analysis),
	exportData("bfo-analysis-latest", latestAnalysis),
]);

async function readOrgIds() {
	const file = await readFile(join(EXPORTS_DIR, "companies.json.br"));
	const data = JSON.parse(brotliDecompressSync(file).toString());
	return data.map(({ id }: { id: number }) => id);
}

async function fetchBfo(ids: number[]): Promise<BFO[]> {
	const result: BFO[] = [];

	for (const id of ids) {
		await setTimeout(200);
		const data = await getOrganizationBFO(id);
		const { success, output, issues } = v.safeParse(BFOResponseSchema, data);

		if (!success) {
			console.error(`Failed to parse ${id}:\n\n${v.summarize(issues)}`);
			process.exitCode = 1;
			continue;
		}

		result.push(...output);
	}

	return result;
}

async function exportData(name: string, data: unknown) {
	const json = JSON.stringify(data);
	const compressed = await brotliCompressAsync(json);
	await writeFile(join(EXPORTS_DIR, `${name}.json.br`), compressed);
}
