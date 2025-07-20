import assert from "node:assert/strict";
import { it } from "node:test";
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

	assert.ok(SearchOutputSchema.safeParse(result).success);
	assert.strictEqual(result.size >= 0, true);
	assert.strictEqual(result.totalElements >= 0, true);
	assert.strictEqual(result.totalPages >= 0, true);
	assert.strictEqual(result.numberOfElements >= 0, true);
	assert.strictEqual(result.numberOfElements <= result.size, true);
});

it("should handle empty search results correctly", async () => {
	const searchParams = {
		name: "НЕСУЩЕСТВУЮЩАЯ_ОРГАНИЗАЦИЯ_12345",
		allFieldsMatch: true,
		page: 0,
		size: 20,
	};

	const result = await searchOrganizations(searchParams);

	assert.ok(SearchOutputSchema.safeParse(result).success);
	assert.strictEqual(result.empty, true);
	assert.strictEqual(result.content.length, 0);
	assert.strictEqual(result.totalElements, 0);
	assert.strictEqual(result.numberOfElements, 0);
	assert.strictEqual(result.first, true);
	assert.strictEqual(result.last, true);
});

it("should handle pagination parameters correctly", async () => {
	const searchParams = {
		name: "Сбер",
		allFieldsMatch: false,
		page: 1,
		size: 5,
	};

	const result = await searchOrganizations(searchParams);

	assert.ok(SearchOutputSchema.safeParse(result).success);
	assert.strictEqual(result.number, 1);
	assert.strictEqual(result.size, 5);
	assert.strictEqual(result.numberOfElements <= 5, true);
	assert.strictEqual(result.first, false);
});
