import { addSuffixToKeys } from "@grind-t/toolkit/object";
import * as v from "valibot";

const capitalRow = <T extends string>(code: T) =>
	addSuffixToKeys(
		{
			expl: v.nullish(v.string()),
			authorized: v.nullish(v.number()),
			additional: v.nullish(v.number()),
			reserve: v.nullish(v.number()),
			unallocated: v.nullish(v.number()),
			redeemed: v.nullish(v.number()),
			revaluation: v.nullish(v.number()),
			total: v.nullish(v.number()),
		},
		code,
	);

const adjustmentRow = <T extends string>(code: T) =>
	addSuffixToKeys(
		{
			netProfitLoss: v.nullish(v.number()),
			otherFactors: v.nullish(v.number()),
			previous: v.nullish(v.number()),
			beforePrevious: v.nullish(v.number()),
		},
		code,
	);

const extendedAdjustmentRow = <T extends string>(code: T) =>
	addSuffixToKeys(
		{
			netProfitLoss: v.nullish(v.number()),
			otherFactors: v.nullish(v.number()),
			previous: v.nullish(v.number()),
			beforePrevious: v.nullish(v.number()),
			authorized: v.nullish(v.number()),
			additional: v.nullish(v.number()),
			unallocated: v.nullish(v.number()),
			total: v.nullish(v.number()),
		},
		code,
	);

// Отчет об изменениях капитала
// Новые коды - https://tinyurl.com/mvwfhaav
// Старые коды - https://tinyurl.com/mr475uc8
export const CapitalChangeSchema = v.strictObject({
	id: v.number(),
	okud: v.string(),
	// Величина капитала на 31 декабря года, предшествующего предыдущему
	...capitalRow("3100"),
	// Величина капитала на 31 декабря года, предшествующего предыдущему, после корректировки
	...capitalRow("3101"),
	// Корректировка в связи с изменением учетной политики
	...capitalRow("3110"),
	// Корректировка в связи с исправлением ошибок
	...capitalRow("3120"),
	// Величина капитала на 31 декабря предыдущего года
	...capitalRow("3200"),
	// Величина капитала на 31 декабря предыдущего года после корректировки
	...capitalRow("3201"),
	// Корректировка в связи с изменением учетной политики
	...capitalRow("3210"),
	// Чистая прибыль (убыток)
	...capitalRow("3211"),
	// Переоценка внеоборотных активов
	...capitalRow("3212"),
	// Доходы, относящиеся непосредственно на увеличение капитала (legacy)
	...capitalRow("3213"),
	// Дополнительный выпуск акций (legacy)
	...capitalRow("3214"),
	// Увеличение номинальной стоимости акций (legacy)
	...capitalRow("3215"),
	// Реорганизация юридического лица
	...capitalRow("3216"),
	// Корректировка в связи с исправлением ошибок
	...capitalRow("3220"),
	// Убыток (legacy)
	...capitalRow("3221"),
	// Переоценка имущества (legacy)
	...capitalRow("3222"),
	// Расходы, относящиеся непосредственно на уменьшение капитала (legacy)
	...capitalRow("3223"),
	// Уменьшение номинальной стоимости акций (legacy)
	...capitalRow("3224"),
	// Уменьшение количества акций (legacy)
	...capitalRow("3225"),
	// Реорганизация юридического лица (legacy)
	...capitalRow("3226"),
	// Дивиденды
	...capitalRow("3227"),
	// Иные изменения за счет операций с собственниками (за исключением дивидендов) - всего
	...capitalRow("3230"),
	// в том числе (по видам)
	...capitalRow("3231"),
	...capitalRow("3232"),
	// Иные изменения - всего
	...capitalRow("3240"),
	// в том числе (по видам)
	...capitalRow("3241"),
	...capitalRow("3242"),
	// Величина капитала на дату окончания периода предыдущего года, аналогичного отчетному периоду
	...capitalRow("3250"),
	// Величина капитала на отчетную дату
	...capitalRow("3300"),
	// Увеличение капитала - всего (legacy)
	...capitalRow("3310"),
	// Чистая прибыль (убыток)
	...capitalRow("3311"),
	// Переоценка внеоборотных активов
	...capitalRow("3312"),
	// Доходы, относящиеся непосредственно на увеличение капитала (legacy)
	...capitalRow("3313"),
	// Дополнительный выпуск акций (legacy)
	...capitalRow("3314"),
	// Увеличение номинальной стоимости акций (legacy)
	...capitalRow("3315"),
	// Реорганизация юридического лица
	...capitalRow("3316"),
	// Уменьшение капитала - всего (legacy)
	...capitalRow("3320"),
	// Убыток (legacy)
	...capitalRow("3321"),
	// Переоценка имущества (legacy)
	...capitalRow("3322"),
	// Расходы, относящиеся непосредственно на уменьшение капитала (legacy)
	...capitalRow("3323"),
	// Уменьшение номинальной стоимости акций (legacy)
	...capitalRow("3324"),
	// Уменьшение количества акций (legacy)
	...capitalRow("3325"),
	// Реорганизация юридического лица (legacy)
	...capitalRow("3326"),
	// Дивиденды
	...capitalRow("3327"),
	// Иные изменения за счет операций с собственниками (за исключением дивидендов) - всего
	...capitalRow("3330"),
	// в том числе (по видам)
	...capitalRow("3331"),
	...capitalRow("3332"),
	// Иные изменения - всего
	...capitalRow("3340"),
	// в том числе (по видам)
	...capitalRow("3341"),
	...capitalRow("3342"),
	// Капитал всего до корректировок (legacy)
	...adjustmentRow("3400"),
	// Нераспределенная прибыль (непокрытый убыток) всего до корректировок (legacy)
	...adjustmentRow("3401"),
	// Другие статьи капитала, по которым осуществлены корректировки всего до корректировок (legacy)
	...adjustmentRow("3402"),
	// Корректировка в связи с изменением учетной политики (legacy)
	...adjustmentRow("3410"),
	// Корректировка в связи с изменением учетной политики (legacy)
	...adjustmentRow("3411"),
	// Корректировка в связи с изменением учетной политики (legacy)
	...adjustmentRow("3412"),
	// Корректировка в связи с исправлением ошибок (legacy)
	...extendedAdjustmentRow("3420"),
	// Корректировка в связи с исправлением ошибок (legacy)
	...extendedAdjustmentRow("3421"),
	// Корректировка в связи с исправлением ошибок (legacy)
	...extendedAdjustmentRow("3422"),
	// Капитал всего после корректировок (legacy)
	...adjustmentRow("3500"),
	// Нераспределенная прибыль (непокрытый убыток) всего после корректировок (legacy)
	...adjustmentRow("3501"),
	// Другие статьи капитала, по которым осуществлены корректировки всего после корректировок (legacy)
	...adjustmentRow("3502"),
	// Чистые активы (legacy)
	current3600: v.nullish(v.number()),
	previous3600: v.nullish(v.number()),
	beforePrevious3600: v.nullish(v.number()),
});
