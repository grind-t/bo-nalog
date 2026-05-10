import { addSuffixToKeys } from "@grind-t/toolkit/object";
import * as v from "valibot";

const financialRow = <T extends string>(code: T) =>
	addSuffixToKeys(
		{
			expl: v.nullish(v.string()),
			current: v.nullish(v.number()),
			previous: v.nullish(v.number()),
		},
		code,
	);

// Новые коды - https://tinyurl.com/3entksyk
// Старые коды - https://tinyurl.com/2mn8edbh
export const FinancialResultSchema = v.strictObject({
	id: v.number(),
	okud: v.string(),
	...financialRow("2110"),
	...financialRow("2120"),
	...financialRow("2100"),
	...financialRow("2210"),
	...financialRow("2220"),
	...financialRow("2200"),
	...financialRow("2310"),
	...financialRow("2320"),
	...financialRow("2330"),
	...financialRow("2340"),
	...financialRow("2350"),
	...financialRow("2300"),
	...financialRow("2410"),
	...financialRow("2411"),
	...financialRow("2412"),
	...financialRow("2420"),
	...financialRow("2460"),
	...financialRow("2400"),
	...financialRow("2510"),
	...financialRow("2520"),
	...financialRow("2530"),
	...financialRow("2500"),
	...financialRow("2900"),
	...financialRow("2910"),
});
