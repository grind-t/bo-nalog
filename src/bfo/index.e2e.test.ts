import assert from "node:assert/strict";
import { it } from "node:test";
import * as v from "valibot";
import { getOrganizationBFO } from "./index.ts";
import { BFOResponseSchema } from "./types/index.ts";

it("should fetch organization BFO and validate with zod schema", async () => {
	const result = await getOrganizationBFO(3036741);

	assert.ok(v.safeParse(BFOResponseSchema, result).success);
});
