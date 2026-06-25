import * as v from "valibot";

export const BFOAnalysisSchema = v.object({
	inn: v.string(),
	period: v.number(),
	icr: v.nullable(v.number()),
});

export type BFOAnalysis = v.InferOutput<typeof BFOAnalysisSchema>;
