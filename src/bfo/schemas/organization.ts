import * as v from "valibot";

export const OrganizationInfoSchema = v.strictObject({
	fullName: v.string(),
	inn: v.string(),
	kpp: v.string(),
	address: v.string(),
	okved2_id: v.nullish(v.string()),
	okved2: v.nullish(
		v.strictObject({
			id: v.nullish(v.string()),
			name: v.nullish(v.string()),
		}),
	),
	okopf_id: v.number(),
	okopf: v.nullish(
		v.strictObject({
			id: v.nullish(v.number()),
			name: v.nullish(v.string()),
		}),
	),
	okfs_id: v.number(),
	okfs: v.nullish(
		v.strictObject({
			id: v.nullish(v.number()),
			name: v.nullish(v.string()),
		}),
	),
	okpo: v.nullish(v.string()),
});
