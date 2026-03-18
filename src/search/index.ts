import type { SearchInput } from "./types/input.ts";
import type { SearchOutput } from "./types/output.ts";

/**
 * Базовый URL для API поиска организаций
 */
const BASE_URL = "https://bo.nalog.gov.ru";

/**
 * Поиск организаций через API ФНС
 *
 * @param params - Параметры поиска организаций
 * @returns Promise с результатами поиска
 *
 * @example
 * ```typescript
 * const results = await searchOrganizations({
 *   name: "Сбер"
 * });
 * ```
 */
export async function searchOrganizations({
	allFieldsMatch = false,
	page = 0,
	size = 20,
	...restParams
}: SearchInput): Promise<SearchOutput> {
	const url = new URL("/advanced-search/organizations", BASE_URL);

	url.searchParams.set("allFieldsMatch", allFieldsMatch.toString());
	url.searchParams.set("page", page.toString());
	url.searchParams.set("size", size.toString());

	for (const [key, value] of Object.entries(restParams)) {
		value && url.searchParams.set(key, value);
	}

	const response = await fetch(url.toString());

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	return await response.json();
}
