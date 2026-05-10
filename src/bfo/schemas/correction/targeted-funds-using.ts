import { addSuffixToKeys } from "@grind-t/toolkit/object";
import * as v from "valibot";

const fundsUsingRow = <T extends string>(code: T) =>
	addSuffixToKeys(
		{
			expl: v.nullish(v.string()),
			current: v.nullish(v.number()),
			previous: v.nullish(v.number()),
		},
		code,
	);

// Отчет о целевом использовании средств
// Новые коды - https://tinyurl.com/4xzf2nv6
// Старые коды - https://tinyurl.com/nhehfhfx
export const TargetedFundsUsingSchema = v.strictObject({
	id: v.number(),
	okud: v.string(),
	// Остаток средств на начало периода
	...fundsUsingRow("6100"),
	// Поступило средств - всего
	...fundsUsingRow("6200"),
	// Вступительные взносы
	...fundsUsingRow("6210"),
	// Членские взносы
	...fundsUsingRow("6215"),
	// Целевые взносы
	...fundsUsingRow("6220"),
	// Добровольные имущественные взносы и пожертвования
	...fundsUsingRow("6230"),
	// Прибыль от приносящей доход деятельности
	...fundsUsingRow("6240"),
	// Прочие
	...fundsUsingRow("6250"),
	// Использовано (израсходовано) средств - всего
	...fundsUsingRow("6300"),
	// Расходы на целевые мероприятия
	...fundsUsingRow("6310"),
	// в том числе: социальная и благотворительная помощь
	...fundsUsingRow("6311"),
	// в том числе: проведение конференций, совещаний, семинаров
	...fundsUsingRow("6312"),
	// в том числе: прочие
	...fundsUsingRow("6313"),
	// Расходы на содержание аппарата управления
	...fundsUsingRow("6320"),
	// в том числе: расходы, связанные с оплатой труда (включая начисления)
	...fundsUsingRow("6321"),
	// в том числе: выплаты, не связанные с оплатой труда
	...fundsUsingRow("6322"),
	// в том числе: расходы на служебные командировки и деловые поездки
	...fundsUsingRow("6323"),
	// в том числе: содержание помещений, зданий, автомобильного транспорта и иного имущества (кроме ремонта)
	...fundsUsingRow("6324"),
	// в том числе: ремонт основных средств и иного имущества
	...fundsUsingRow("6325"),
	// в том числе: прочие
	...fundsUsingRow("6326"),
	// Приобретение основных средств, инвентаря и иного имущества
	...fundsUsingRow("6330"),
	// Прочие
	...fundsUsingRow("6350"),
	// Остаток средств на конец периода
	...fundsUsingRow("6400"),
});
