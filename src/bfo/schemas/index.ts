import * as v from "valibot";
import { TypeCorrectionSchema } from "./correction/index.ts";
import { OrganizationInfoSchema } from "./organization.ts";

export const BFOSchema = v.strictObject({
	id: v.number(),
	period: v.string(),
	publication: v.number(),
	actualBfoDate: v.string(),
	gainSum: v.nullish(v.number()),
	knd: v.string(),
	hasAz: v.nullish(v.boolean()),
	hasKs: v.nullish(v.boolean()),
	actualCorrectionNumber: v.number(),
	actualCorrectionDate: v.string(),
	publishedCorrectionNumber: v.number(),
	publishedCorrectionDate: v.string(),
	actives: v.number(),
	isCb: v.boolean(),
	mspCategory: v.nullish(v.string()),
	organizationInfo: OrganizationInfoSchema,
	typeCorrections: v.array(TypeCorrectionSchema),
	published: v.boolean(),
});

export const BFOResponseSchema = v.array(BFOSchema);

export type BFO = v.InferOutput<typeof BFOSchema>;
export type BFOResponse = v.InferOutput<typeof BFOResponseSchema>;
