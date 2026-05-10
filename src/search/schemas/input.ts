import * as v from "valibot";

/**
 * Схема входных параметров для поиска организаций
 * Основана на анализе запроса к /advanced-search/organizations
 */
export const SearchInputSchema = v.object({
	/** Адрес организации */
	address: v.optional(v.string()),

	/** Все поля должны совпадать */
	allFieldsMatch: v.optional(v.boolean()),

	/** ИНН организации */
	inn: v.optional(v.string()),

	/** Название организации */
	name: v.optional(v.string()),

	/** ОГРН организации */
	ogrn: v.optional(v.string()),

	/** Код ОКВЭД */
	okved: v.optional(v.string()),

	/** Период (год) */
	period: v.optional(v.string()),

	/** Номер страницы (по умолчанию 0) */
	page: v.optional(v.pipe(v.number(), v.integer())),

	/** Размер страницы (по умолчанию 20) */
	size: v.optional(v.pipe(v.number(), v.integer())),
});

export type SearchInput = v.InferOutput<typeof SearchInputSchema>;
