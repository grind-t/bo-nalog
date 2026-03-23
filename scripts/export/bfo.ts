import { join } from "node:path";
import pl from "nodejs-polars";
import { getOrganizationBFO } from "../../src/bfo/index.ts";
import { fs, sleep } from "zx";

const EXPORTS_DIR = join(import.meta.dirname, "..", "..", "exports");

const companyIds = (
	pl
		.readParquet(join(EXPORTS_DIR, "companies.parquet"))
		.getColumn("id")
		.toArray() as number[]
).map((v) => Math.trunc(v));

const bfo: Record<string, any> = {};

for (const id of companyIds) {
	await sleep(200);
	bfo[id] = await getOrganizationBFO(id);
}

fs.outputFile(join(EXPORTS_DIR, "bfo.json"), JSON.stringify(bfo, null, 2));
