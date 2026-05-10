import { addSuffixToKeys } from "@grind-t/toolkit/object";
import * as v from "valibot";

const financialRow = <T extends string>(code: T) =>
	addSuffixToKeys(
		{
			expl: v.nullish(v.string()),
			current: v.nullish(v.number()),
			previous: v.nullish(v.number()),
		},
		code,
	);

// Отчет о финаносвых результатах
// Новые коды - https://tinyurl.com/3entksyk
// Старые коды - https://tinyurl.com/2mn8edbh
export const FinancialResultSchema = v.strictObject({
	id: v.number(),
	okud: v.string(),
	// Выручка
	...financialRow("2110"),
	// Себестоимость продаж
	...financialRow("2120"),
	// Валовая прибыль (убыток)
	...financialRow("2100"),
	// Коммерческие расходы
	...financialRow("2210"),
	// Управленческие расходы
	...financialRow("2220"),
	// Прибыль (убыток) от продаж
	...financialRow("2200"),
	// Доходы от участия в других организациях
	...financialRow("2310"),
	// Проценты к получению
	...financialRow("2320"),
	// Проценты к уплате
	...financialRow("2330"),
	// Прочие доходы
	...financialRow("2340"),
	// Прочие расходы
	...financialRow("2350"),
	// Прибыль (убыток) от продолжающейся деятельности до налогообложения
	...financialRow("2300"),
	// Налог на прибыль организаций
	...financialRow("2410"),
	// в том числе: текущий налог на прибыль организаций
	...financialRow("2411"),
	// в том числе: отложенный налог на прибыль организаций
	...financialRow("2412"),
	// Прибыль (убыток) от прекращаемой деятельности (за вычетом относящегося к ней налога на прибыль организаций)
	...financialRow("2420"),
	// Прочее
	...financialRow("2460"),
	// Чистая прибыль (убыток)
	...financialRow("2400"),
	// Результат от переоценки внеоборотных активов, не включаемый в чистую прибыль (убыток)
	...financialRow("2510"),
	// Результат от прочих операций, не включаемый в чистую прибыль (убыток)
	...financialRow("2520"),
	// Налог на прибыль организаций, относящийся к результатам переоценки внеоборотных активов и прочих операций, не включаемых в чистую прибыль (убыток)
	...financialRow("2530"),
	// Совокупный финансовый результат
	...financialRow("2500"),
	// Базовая прибыль (убыток) на акцию
	...financialRow("2900"),
	// Разводненная прибыль (убыток) на акцию
	...financialRow("2910"),
});
