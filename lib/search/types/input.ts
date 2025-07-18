import { z } from "zod";

/**
 * Схема входных параметров для поиска организаций
 * Основана на анализе запроса к /advanced-search/organizations
 */
export const SearchInputSchema = z.object({
	/** Адрес организации */
	address: z.string().optional(),

	/** Все поля должны совпадать */
	allFieldsMatch: z.boolean().optional(),

	/** ИНН организации */
	inn: z.string().optional(),

	/** Название организации */
	name: z.string().optional(),

	/** ОГРН организации */
	ogrn: z.string().optional(),

	/** Код ОКВЭД */
	okved: z.string().optional(),

	/** Период (год) */
	period: z.string().optional(),

	/** Номер страницы (по умолчанию 0) */
	page: z.number().int().optional(),

	/** Размер страницы (по умолчанию 20) */
	size: z.number().int().optional(),
});

export type SearchInput = z.infer<typeof SearchInputSchema>;
