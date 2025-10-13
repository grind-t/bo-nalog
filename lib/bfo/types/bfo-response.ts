import z from "zod";
import { BFOSchema } from "./bfo.ts";

export const BFOResponseSchema = z.array(BFOSchema);

export type BFOResponse = z.infer<typeof BFOResponseSchema>;
