import * as v from "valibot";
import { BalanceSchema } from "./balance.ts";
import { CapitalChangeSchema } from "./capital-change.ts";
import { FinancialResultSchema } from "./financial-result.ts";
import { FundsMovementSchema } from "./funds-movement.ts";
import { TargetedFundsUsingSchema } from "./targeted-funds-using.ts";

export const CorrectionSchema = v.strictObject({
	id: v.number(),
	bfoOrganizationInfo: v.strictObject({
		id: v.number(),
		fullName: v.string(),
		inn: v.string(),
		kpp: v.string(),
		address: v.string(),
		okved2: v.nullish(
			v.strictObject({
				id: v.string(),
				name: v.string(),
			}),
		),
		okopf_id: v.number(),
		okopf: v.nullish(
			v.strictObject({
				id: v.number(),
				name: v.string(),
			}),
		),
		okfs_id: v.number(),
		okfs: v.nullish(
			v.strictObject({
				id: v.number(),
				name: v.string(),
			}),
		),
		bfoId: v.number(),
		okpo: v.nullish(v.string()),
	}),
	balance: BalanceSchema,
	financialResult: v.nullish(FinancialResultSchema),
	capitalChange: v.nullish(CapitalChangeSchema),
	fundsMovement: v.nullish(FundsMovementSchema),
	targetedFundsUsing: v.nullish(TargetedFundsUsingSchema),
	correctionVersion: v.number(),
	requiredAudit: v.number(),
	datePresent: v.string(),
	prBn: v.number(),
	knd: v.string(),
	clarification: v.nullish(
		v.strictObject({
			id: v.number(),
			fileMetadata: v.strictObject({
				id: v.number(),
				contentType: v.string(),
				size: v.number(),
				originalName: v.string(),
				fileToken: v.string(),
			}),
		}),
	),
	auditReport: v.nullish(
		v.strictObject({
			id: v.number(),
			inn: v.nullish(v.string()),
			ogrn: v.nullish(v.string()),
			name: v.nullish(v.string()),
			isOrganization: v.boolean(),
			fileMetadata: v.strictObject({
				id: v.number(),
				contentType: v.string(),
				size: v.number(),
				originalName: v.string(),
				fileToken: v.string(),
			}),
		}),
	),
	periodType: v.number(),
});

export const TypeCorrectionSchema = v.strictObject({
	type: v.number(),
	correction: CorrectionSchema,
});

export type Correction = v.InferOutput<typeof CorrectionSchema>;
export type TypeCorrection = v.InferOutput<typeof TypeCorrectionSchema>;
