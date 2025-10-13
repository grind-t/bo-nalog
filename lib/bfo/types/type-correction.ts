import z from "zod";
import { CorrectionSchema } from "./correction.ts";

export const TypeCorrectionSchema = z.object({
	type: z.number(),
	correction: CorrectionSchema,
});

export type TypeCorrection = z.infer<typeof TypeCorrectionSchema>;
