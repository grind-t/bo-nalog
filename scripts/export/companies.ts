import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { env } from "node:process";
import { setTimeout } from "node:timers/promises";
import { brotliCompressSync } from "node:zlib";
import { getMoexBondSecurities } from "@grind-t/moex";
import { TInvestApi } from "@grind-t/t-invest";
import { toRecord } from "@grind-t/toolkit/array";
import * as v from "valibot";
import { searchOrganizations } from "../../src/search/index.ts";
import { SearchOutputSchema } from "../../src/search/schemas/output.ts";

const EXPORTS_DIR = join(import.meta.dirname, "..", "..", "exports");

const inns = await fetchInns();
const companies = await fetchCompanies(inns);
const compressed = brotliCompressSync(JSON.stringify(companies));

writeFileSync(join(EXPORTS_DIR, "companies.json.br"), compressed);

async function fetchInns() {
	const tInvestApi = new TInvestApi(env.T_INVEST_READONLY_TOKEN);

	const [bonds, moexSecurities] = await Promise.all([
		tInvestApi.instruments.bonds({}).then((v) => v.instruments),
		getMoexBondSecurities().then((v) => toRecord(v, (v) => v.isin)),
	]);

	return bonds.reduce((acc, v) => {
		const moexSecurity = moexSecurities[v.isin];
		const emitentInn = moexSecurity?.emitent_inn;

		emitentInn && acc.add(emitentInn);
		return acc;
	}, new Set<string>());
}

async function fetchCompanies(inns: Iterable<string>) {
	const companies = [];

	for (const inn of inns) {
		await setTimeout(200);
		const result = await searchOrganizations({ inn, size: 1 });
		const { success, output, issues } = v.safeParse(SearchOutputSchema, result);

		if (!success) {
			console.error(`Failed to parse ${inn}:\n\n${v.summarize(issues)}`);
			process.exitCode = 1;
			continue;
		}

		const org = output.content[0];
		org && companies.push(org);
	}

	return companies;
}
