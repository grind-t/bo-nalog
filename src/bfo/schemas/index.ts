import * as v from "valibot";
import { TypeCorrectionSchema } from "./correction/index.ts";
import { OrganizationInfoSchema } from "./organization.ts";

export const BFOSchema = v.strictObject({
	id: v.number(),
	period: v.string(),
	publication: v.nullish(v.number()),
	actualBfoDate: v.nullish(v.string()),
	gainSum: v.nullish(v.number()),
	knd: v.nullish(v.string()),
	hasAz: v.nullish(v.boolean()),
	hasKs: v.nullish(v.boolean()),
	actualCorrectionNumber: v.nullish(v.number()),
	actualCorrectionDate: v.nullish(v.string()),
	publishedCorrectionNumber: v.nullish(v.number()),
	publishedCorrectionDate: v.nullish(v.string()),
	actives: v.nullish(v.number()),
	isCb: v.nullish(v.boolean()),
	mspCategory: v.nullish(v.string()),
	organizationInfo: v.nullish(OrganizationInfoSchema),
	typeCorrections: v.nullish(v.array(TypeCorrectionSchema)),
	published: v.nullish(v.boolean()),
});

export const BFOResponseSchema = v.array(BFOSchema);

export type BFO = v.InferOutput<typeof BFOSchema>;
export type BFOResponse = v.InferOutput<typeof BFOResponseSchema>;
