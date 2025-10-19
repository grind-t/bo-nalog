import { z } from "zod";
import { BalanceSchema } from "./balance.ts";
import { CapitalChangeSchema } from "./capital-change.ts";
import { FinancialResultSchema } from "./financial-result.ts";
import { FundsMovementSchema } from "./funds-movement.ts";

export const CorrectionSchema = z.object({
	id: z.number(),
	bfoOrganizationInfo: z
		.object({
			id: z.number().nullish(),
			fullName: z.string().nullish(),
			inn: z.string().nullish(),
			kpp: z.string().nullish(),
			address: z.string().nullish(),
			okved2: z
				.object({
					id: z.string().nullish(),
					name: z.string().nullish(),
				})
				.nullish(),
			okopf_id: z.number().nullish(),
			okopf: z
				.object({
					id: z.number().nullish(),
					name: z.string().nullish(),
				})
				.nullish(),
			okfs_id: z.number().nullish(),
			okfs: z
				.object({
					id: z.number().nullish(),
					name: z.string().nullish(),
				})
				.nullish(),
			bfoId: z.number().nullish(),
			okpo: z.string().nullish(),
		})
		.nullish(),
	balance: BalanceSchema.nullish(),
	financialResult: FinancialResultSchema.nullish(),
	capitalChange: CapitalChangeSchema.nullish(),
	fundsMovement: FundsMovementSchema.nullish(),
	correctionVersion: z.number().nullish(),
	requiredAudit: z.number().nullish(),
	datePresent: z.string().nullish(),
	prBn: z.number().nullish(),
	knd: z.string().nullish(),
	auditReport: z
		.object({
			id: z.number(),
			inn: z.string().nullish(),
			ogrn: z.string().nullish(),
			name: z.string().nullish(),
			isOrganization: z.boolean().nullish(),
			fileMetadata: z
				.object({
					id: z.number(),
					contentType: z.string(),
					size: z.number(),
					originalName: z.string(),
					fileToken: z.string(),
				})
				.nullish(),
		})
		.nullish(),
	periodType: z.number().nullish(),
});

export type Correction = z.infer<typeof CorrectionSchema>;
