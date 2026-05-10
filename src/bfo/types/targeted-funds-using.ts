import { addSuffixToKeys } from "@grind-t/toolkit/object";
import * as v from "valibot";

const fundsUsingRow = <T extends string>(code: T) =>
	addSuffixToKeys(
		{
			expl: v.nullish(v.string()),
			current: v.nullish(v.number()),
			previous: v.nullish(v.number()),
		},
		code,
	);

// Новые коды - https://tinyurl.com/4xzf2nv6
// Старые коды - https://tinyurl.com/nhehfhfx
export const TargetedFundsUsingSchema = v.strictObject({
	id: v.number(),
	okud: v.string(),
	...fundsUsingRow("6100"),
	...fundsUsingRow("6200"),
	...fundsUsingRow("6210"),
	...fundsUsingRow("6215"),
	...fundsUsingRow("6220"),
	...fundsUsingRow("6230"),
	...fundsUsingRow("6240"),
	...fundsUsingRow("6250"),
	...fundsUsingRow("6300"),
	...fundsUsingRow("6310"),
	...fundsUsingRow("6311"),
	...fundsUsingRow("6312"),
	...fundsUsingRow("6313"),
	...fundsUsingRow("6320"),
	...fundsUsingRow("6321"),
	...fundsUsingRow("6322"),
	...fundsUsingRow("6323"),
	...fundsUsingRow("6324"),
	...fundsUsingRow("6325"),
	...fundsUsingRow("6326"),
	...fundsUsingRow("6330"),
	...fundsUsingRow("6350"),
	...fundsUsingRow("6400"),
});
