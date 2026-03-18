import * as v from "valibot";

/**
 * Схема для информации о бухгалтерской отчетности
 */
export const BfoSchema = v.object({
	/** Период отчетности */
	period: v.string(),

	/** Фактическая дата подачи БФО */
	actualBfoDate: v.nullable(v.string()),

	/** Сумма дохода */
	gainSum: v.nullable(v.number()),

	/** Коды налоговых деклараций */
	knd: v.string(),

	/** Наличие аудиторского заключения */
	hasAz: v.boolean(),

	/** Наличие консолидированной отчетности */
	hasKs: v.boolean(),

	/** Номер актуальной корректировки */
	actualCorrectionNumber: v.number(),

	/** Дата актуальной корректировки */
	actualCorrectionDate: v.string(),

	/** Является ли центральным банком */
	isCb: v.boolean(),

	/** Типы периодов БФО */
	bfoPeriodTypes: v.array(v.number()),
});

export type Bfo = v.InferOutput<typeof BfoSchema>;

/**
 * Схема для организации в результатах поиска
 */
export const OrganizationSchema = v.object({
	/** Уникальный идентификатор */
	id: v.number(),

	/** ИНН организации */
	inn: v.string(),

	/** Краткое название организации */
	shortName: v.string(),

	/** ОГРН организации */
	ogrn: v.string(),

	/** Почтовый индекс */
	index: v.string(),

	/** Регион */
	region: v.string(),

	/** Район */
	district: v.nullable(v.string()),

	/** Город */
	city: v.nullable(v.string()),

	/** Населенный пункт */
	settlement: v.nullable(v.string()),

	/** Улица */
	street: v.string(),

	/** Дом */
	house: v.string(),

	/** Строение */
	building: v.nullable(v.string()),

	/** Офис */
	office: v.nullable(v.string()),

	/** Код ОКВЭД */
	okved2: v.string(),

	/** Код ОКОПФ */
	okopf: v.number(),

	/** Код ОКАТО */
	okato: v.nullable(v.string()),

	/** Код ОКПО */
	okpo: v.nullable(v.string()),

	/** Код ОКФС */
	okfs: v.nullable(v.string()),

	/** Код статуса организации */
	statusCode: v.picklist(["ACTIVE", "INACTIVE", "LIQUIDATION_STAGE"]),

	/** Дата статуса */
	statusDate: v.string(),

	/** Информация о бухгалтерской отчетности */
	bfo: BfoSchema,
});

export type Organization = v.InferOutput<typeof OrganizationSchema>;

/**
 * Схема для информации о сортировке
 */
export const SortSchema = v.object({
	/** Отсортировано ли */
	sorted: v.boolean(),

	/** Не отсортировано ли */
	unsorted: v.boolean(),

	/** Пусто ли */
	empty: v.boolean(),
});

export type Sort = v.InferOutput<typeof SortSchema>;

/**
 * Схема для информации о пагинации
 */
export const PageableSchema = v.object({
	/** Номер страницы */
	pageNumber: v.number(),

	/** Размер страницы */
	pageSize: v.number(),

	/** Информация о сортировке */
	sort: SortSchema,

	/** Смещение */
	offset: v.number(),

	/** Разбито ли на страницы */
	paged: v.boolean(),

	/** Не разбито ли на страницы */
	unpaged: v.boolean(),
});

export type Pageable = v.InferOutput<typeof PageableSchema>;

/**
 * Схема для ответа поиска организаций
 */
export const SearchOutputSchema = v.object({
	/** Список организаций */
	content: v.array(OrganizationSchema),

	/** Информация о пагинации */
	pageable: PageableSchema,

	/** Общее количество страниц */
	totalPages: v.number(),

	/** Общее количество элементов */
	totalElements: v.number(),

	/** Последняя ли это страница */
	last: v.boolean(),

	/** Первая ли это страница */
	first: v.boolean(),

	/** Количество элементов на текущей странице */
	numberOfElements: v.number(),

	/** Размер страницы */
	size: v.number(),

	/** Номер текущей страницы */
	number: v.number(),

	/** Информация о сортировке */
	sort: SortSchema,

	/** Пустой ли результат */
	empty: v.boolean(),
});

export type SearchOutput = v.InferOutput<typeof SearchOutputSchema>;
