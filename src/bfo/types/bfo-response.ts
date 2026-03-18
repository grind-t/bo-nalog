import * as v from "valibot";
import { BFOSchema } from "./bfo.ts";

export const BFOResponseSchema = v.array(BFOSchema);

export type BFOResponse = v.InferOutput<typeof BFOResponseSchema>;
