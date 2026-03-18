import { join } from "node:path";
import { env } from "node:process";
import { getMoexBondSecurities } from "@grind-t/moex";
import { toRecord } from "@grind-t/toolkit/array";
import { TinkoffInvestApi } from "tinkoff-invest-api";
import { fs } from "zx";

const EXPORTS_DIR = join(import.meta.dirname, "..", "..", "exports")

const tInvestApi = new TinkoffInvestApi({
	token: env.T_INVEST_READONLY_TOKEN as string,
});

const [bonds, moexSecurities] = await Promise.all([
	tInvestApi.instruments.bonds({}).then((v) => v.instruments),
	getMoexBondSecurities().then((v) => toRecord(v, (v) => v.isin)),
]);

const emitentInns = bonds.reduce((acc, v) => {
	const moexSecurity = moexSecurities[v.isin];
	const emitentInn = moexSecurity?.emitent_inn;

	acc.add(emitentInn);
	return acc;
}, new Set<string>());

fs.outputJSON(
	join(EXPORTS_DIR, "inns.json"),
	Array.from(emitentInns),
	{ spaces: "\t" },
);
