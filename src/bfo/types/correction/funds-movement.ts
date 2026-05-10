import { addSuffixToKeys } from "@grind-t/toolkit/object";
import * as v from "valibot";

const fundsRow = <T extends string>(code: T) =>
	addSuffixToKeys(
		{
			expl: v.nullish(v.string()),
			current: v.nullish(v.number()),
			previous: v.nullish(v.number()),
		},
		code,
	);

// Новые коды - https://tinyurl.com/27fse6fs
// Старые коды - https://tinyurl.com/y4msekz2
export const FundsMovementSchema = v.strictObject({
	id: v.number(),
	okud: v.string(),
	...fundsRow("4100"),
	...fundsRow("4110"),
	...fundsRow("4111"),
	...fundsRow("4112"),
	...fundsRow("4113"),
	...fundsRow("4114"),
	...fundsRow("4119"),
	...fundsRow("4120"),
	...fundsRow("4121"),
	...fundsRow("4122"),
	...fundsRow("4123"),
	...fundsRow("4124"),
	...fundsRow("4129"),
	...fundsRow("4200"),
	...fundsRow("4210"),
	...fundsRow("4211"),
	...fundsRow("4212"),
	...fundsRow("4213"),
	...fundsRow("4214"),
	...fundsRow("4219"),
	...fundsRow("4220"),
	...fundsRow("4221"),
	...fundsRow("4222"),
	...fundsRow("4223"),
	...fundsRow("4224"),
	...fundsRow("4229"),
	...fundsRow("4300"),
	...fundsRow("4310"),
	...fundsRow("4311"),
	...fundsRow("4312"),
	...fundsRow("4313"),
	...fundsRow("4314"),
	...fundsRow("4319"),
	...fundsRow("4320"),
	...fundsRow("4321"),
	...fundsRow("4322"),
	...fundsRow("4323"),
	...fundsRow("4329"),
	...fundsRow("4400"),
	...fundsRow("4450"),
	...fundsRow("4490"),
	...fundsRow("4500"),
});
