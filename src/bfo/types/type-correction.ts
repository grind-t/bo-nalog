import * as v from "valibot";
import { CorrectionSchema } from "./correction.ts";

export const TypeCorrectionSchema = v.object({
	type: v.number(),
	correction: CorrectionSchema,
});

export type TypeCorrection = v.InferOutput<typeof TypeCorrectionSchema>;
