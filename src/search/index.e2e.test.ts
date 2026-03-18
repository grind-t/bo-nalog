import assert from "node:assert/strict";
import { it } from "node:test";
import * as v from "valibot";
import { searchOrganizations } from "./index.ts";
import { SearchOutputSchema } from "./types/output.ts";

it("should search organizations and validate response with zod schema", async () => {
	const searchParams = {
		name: "Сбер",
		allFieldsMatch: false,
		page: 0,
		size: 20,
	};

	const result = await searchOrganizations(searchParams);
	const { output, issues, success } = v.safeParse(SearchOutputSchema, result);

	assert(success, issues && v.summarize(issues));
	assert.strictEqual(output.size >= 0, true);
	assert.strictEqual(output.totalElements >= 0, true);
	assert.strictEqual(output.totalPages >= 0, true);
	assert.strictEqual(output.numberOfElements >= 0, true);
	assert.strictEqual(output.numberOfElements <= output.size, true);
});

it("should handle empty search results correctly", async () => {
	const searchParams = {
		name: "НЕСУЩЕСТВУЮЩАЯ_ОРГАНИЗАЦИЯ_12345",
		allFieldsMatch: true,
		page: 0,
		size: 20,
	};

	const result = await searchOrganizations(searchParams);
	const { success, output, issues } = v.safeParse(SearchOutputSchema, result);

	assert(success, issues && v.summarize(issues));
	assert.strictEqual(output.empty, true);
	assert.strictEqual(output.content.length, 0);
	assert.strictEqual(output.totalElements, 0);
	assert.strictEqual(output.numberOfElements, 0);
	assert.strictEqual(output.first, true);
	assert.strictEqual(output.last, true);
});

it("should handle pagination parameters correctly", async () => {
	const searchParams = {
		name: "Сбер",
		allFieldsMatch: false,
		page: 1,
		size: 5,
	};

	const result = await searchOrganizations(searchParams);
	const { success, output, issues } = v.safeParse(SearchOutputSchema, result);

	assert(success, issues && v.summarize(issues));
	assert.strictEqual(output.number, 1);
	assert.strictEqual(output.size, 5);
	assert.strictEqual(output.numberOfElements <= 5, true);
	assert.strictEqual(output.first, false);
});
