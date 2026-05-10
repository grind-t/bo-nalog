import * as v from "valibot";

const PositiveIntegerSchema = v.pipe(v.number(), v.integer(), v.minValue(0));

/**
 * Схема для информации о бухгалтерской отчетности
 */
export const BfoSchema = v.strictObject({
	/** Период отчетности */
	period: v.pipe(v.string(), v.regex(/^\d{4}$/)),

	/** Фактическая дата подачи БФО */
	actualBfoDate: v.pipe(v.string(), v.isoDate()),

	/** Сумма дохода */
	gainSum: v.nullable(v.pipe(v.number(), v.minValue(0))),

	/** Коды налоговых деклараций */
	knd: v.string(),

	/** Наличие аудиторского заключения */
	hasAz: v.boolean(),

	/** Наличие консолидированной отчетности */
	hasKs: v.boolean(),

	/** Номер актуальной корректировки */
	actualCorrectionNumber: PositiveIntegerSchema,

	/** Дата актуальной корректировки */
	actualCorrectionDate: v.pipe(v.string(), v.isoDate()),

	/** Является ли центральным банком */
	isCb: v.boolean(),

	/** Типы периодов БФО */
	bfoPeriodTypes: v.array(v.pipe(v.number(), v.integer())),
});

export type Bfo = v.InferOutput<typeof BfoSchema>;

/**
 * Схема для организации в результатах поиска
 */
export const OrganizationSchema = v.strictObject({
	/** Уникальный идентификатор */
	id: PositiveIntegerSchema,

	/** ИНН организации */
	inn: v.pipe(v.string(), v.regex(/^\d{10}$/)),

	/** Краткое название организации */
	shortName: v.pipe(v.string(), v.nonEmpty()),

	/** ОГРН организации */
	ogrn: v.pipe(v.string(), v.regex(/^\d{13}$/)),

	/** Почтовый индекс */
	index: v.pipe(v.string(), v.regex(/^\d{6}$/)),

	/** Регион */
	region: v.pipe(v.string(), v.nonEmpty()),

	/** Район */
	district: v.nullable(v.string()),

	/** Город */
	city: v.nullable(v.string()),

	/** Населенный пункт */
	settlement: v.nullable(v.string()),

	/** Улица */
	street: v.nullable(v.string()),

	/** Дом */
	house: v.nullable(v.string()),

	/** Строение */
	building: v.nullable(v.string()),

	/** Офис */
	office: v.nullable(v.string()),

	/** Код ОКВЭД */
	okved2: v.pipe(v.string(), v.regex(/^\d{2}\.\d{1,2}(\.\d{1,2})?$/)),

	/** Код ОКОПФ */
	okopf: v.pipe(v.number(), v.integer(), v.minValue(10000), v.maxValue(99999)),

	/** Код ОКАТО */
	okato: v.nullable(v.string()),

	/** Код ОКПО */
	okpo: v.nullable(v.string()),

	/** Код ОКФС */
	okfs: v.nullable(v.string()),

	/** Код статуса организации */
	statusCode: v.picklist([
		"ACTIVE",
		"INACTIVE",
		"REORGANIZATION_STAGE",
		"LIQUIDATION_STAGE",
	]),

	/** Дата статуса */
	statusDate: v.pipe(v.string(), v.isoDate()),

	/** Информация о бухгалтерской отчетности */
	bfo: BfoSchema,
});

export type Organization = v.InferOutput<typeof OrganizationSchema>;

/**
 * Схема для информации о сортировке
 */
export const SortSchema = v.strictObject({
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
export const PageableSchema = v.strictObject({
	/** Номер страницы */
	pageNumber: PositiveIntegerSchema,

	/** Размер страницы */
	pageSize: PositiveIntegerSchema,

	/** Информация о сортировке */
	sort: SortSchema,

	/** Смещение */
	offset: PositiveIntegerSchema,

	/** Разбито ли на страницы */
	paged: v.boolean(),

	/** Не разбито ли на страницы */
	unpaged: v.boolean(),
});

export type Pageable = v.InferOutput<typeof PageableSchema>;

/**
 * Схема для ответа поиска организаций
 */
export const SearchOutputSchema = v.strictObject({
	/** Список организаций */
	content: v.array(OrganizationSchema),

	/** Информация о пагинации */
	pageable: PageableSchema,

	/** Общее количество страниц */
	totalPages: PositiveIntegerSchema,

	/** Общее количество элементов */
	totalElements: PositiveIntegerSchema,

	/** Последняя ли это страница */
	last: v.boolean(),

	/** Первая ли это страница */
	first: v.boolean(),

	/** Количество элементов на текущей странице */
	numberOfElements: PositiveIntegerSchema,

	/** Размер страницы */
	size: PositiveIntegerSchema,

	/** Номер текущей страницы */
	number: PositiveIntegerSchema,

	/** Информация о сортировке */
	sort: SortSchema,

	/** Пустой ли результат */
	empty: v.boolean(),
});

export type SearchOutput = v.InferOutput<typeof SearchOutputSchema>;
