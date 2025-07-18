import { z } from "zod";

/**
 * Схема для информации о бухгалтерской отчетности
 */
export const BfoSchema = z.object({
	/** Период отчетности */
	period: z.string(),

	/** Фактическая дата подачи БФО */
	actualBfoDate: z.string().nullable(),

	/** Сумма дохода */
	gainSum: z.number().nullable(),

	/** Коды налоговых деклараций */
	knd: z.string(),

	/** Наличие аудиторского заключения */
	hasAz: z.boolean(),

	/** Наличие консолидированной отчетности */
	hasKs: z.boolean(),

	/** Номер актуальной корректировки */
	actualCorrectionNumber: z.number(),

	/** Дата актуальной корректировки */
	actualCorrectionDate: z.string(),

	/** Является ли центральным банком */
	isCb: z.boolean(),

	/** Типы периодов БФО */
	bfoPeriodTypes: z.array(z.number()),
});

export type Bfo = z.infer<typeof BfoSchema>;

/**
 * Схема для организации в результатах поиска
 */
export const OrganizationSchema = z.object({
	/** Уникальный идентификатор */
	id: z.number(),

	/** ИНН организации */
	inn: z.string(),

	/** Краткое название организации */
	shortName: z.string(),

	/** ОГРН организации */
	ogrn: z.string(),

	/** Почтовый индекс */
	index: z.string(),

	/** Регион */
	region: z.string(),

	/** Район */
	district: z.string().nullable(),

	/** Город */
	city: z.string().nullable(),

	/** Населенный пункт */
	settlement: z.string().nullable(),

	/** Улица */
	street: z.string(),

	/** Дом */
	house: z.string(),

	/** Строение */
	building: z.string().nullable(),

	/** Офис */
	office: z.string().nullable(),

	/** Код ОКВЭД */
	okved2: z.string(),

	/** Код ОКОПФ */
	okopf: z.number(),

	/** Код ОКАТО */
	okato: z.string().nullable(),

	/** Код ОКПО */
	okpo: z.string().nullable(),

	/** Код ОКФС */
	okfs: z.string().nullable(),

	/** Код статуса организации */
	statusCode: z.enum(["ACTIVE", "INACTIVE"]),

	/** Дата статуса */
	statusDate: z.string(),

	/** Информация о бухгалтерской отчетности */
	bfo: BfoSchema,
});

export type Organization = z.infer<typeof OrganizationSchema>;

/**
 * Схема для информации о сортировке
 */
export const SortSchema = z.object({
	/** Отсортировано ли */
	sorted: z.boolean(),

	/** Не отсортировано ли */
	unsorted: z.boolean(),

	/** Пусто ли */
	empty: z.boolean(),
});

export type Sort = z.infer<typeof SortSchema>;

/**
 * Схема для информации о пагинации
 */
export const PageableSchema = z.object({
	/** Номер страницы */
	pageNumber: z.number(),

	/** Размер страницы */
	pageSize: z.number(),

	/** Информация о сортировке */
	sort: SortSchema,

	/** Смещение */
	offset: z.number(),

	/** Разбито ли на страницы */
	paged: z.boolean(),

	/** Не разбито ли на страницы */
	unpaged: z.boolean(),
});

export type Pageable = z.infer<typeof PageableSchema>;

/**
 * Схема для ответа поиска организаций
 */
export const SearchOutputSchema = z.object({
	/** Список организаций */
	content: z.array(OrganizationSchema),

	/** Информация о пагинации */
	pageable: PageableSchema,

	/** Общее количество страниц */
	totalPages: z.number(),

	/** Общее количество элементов */
	totalElements: z.number(),

	/** Последняя ли это страница */
	last: z.boolean(),

	/** Первая ли это страница */
	first: z.boolean(),

	/** Количество элементов на текущей странице */
	numberOfElements: z.number(),

	/** Размер страницы */
	size: z.number(),

	/** Номер текущей страницы */
	number: z.number(),

	/** Информация о сортировке */
	sort: SortSchema,

	/** Пустой ли результат */
	empty: z.boolean(),
});

export type SearchOutput = z.infer<typeof SearchOutputSchema>;
