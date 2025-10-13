import { z } from "zod";
import { OrganizationInfoSchema } from "./organization.ts";
import { TypeCorrectionSchema } from "./type-correction.ts";

export const BFOSchema = z.object({
	id: z.number(),
	period: z.string(),
	publication: z.number().nullish(),
	actualBfoDate: z.string().nullish(),
	gainSum: z.number().nullish().describe("Выручка"),
	knd: z.string().nullish().describe("Код налоговой формы"),
	hasAz: z
		.boolean()
		.nullish()
		.describe("Наличие дополнительных зачётных/специфичных приложений"),
	hasKs: z
		.boolean()
		.nullish()
		.describe("Наличие консолидированного/корректирующего сегмента)"),
	actualCorrectionNumber: z.number().nullish(),
	actualCorrectionDate: z.string().nullish(),
	publishedCorrectionNumber: z.number().nullish(),
	publishedCorrectionDate: z.string().nullish(),
	actives: z.number().nullish().describe("Итоговая сумма активов (баланс)"),
	isCb: z
		.boolean()
		.nullish()
		.describe("Относится ли организация к центральному банку"),
	mspCategory: z
		.string()
		.nullish()
		.describe("Категория малых и средних предприятий"),
	organizationInfo: OrganizationInfoSchema.nullish(),
	typeCorrections: z
		.array(TypeCorrectionSchema)
		.nullish()
		.describe(
			"Массив корректировок по типам: хранит детали изменений (баланс/финрез/движение средств) и позволяет восстановить историю правок",
		),
	published: z.boolean().nullish(),
});

export type BFO = z.infer<typeof BFOSchema>;
