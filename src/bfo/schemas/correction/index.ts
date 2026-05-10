import * as v from "valibot";
import { BalanceSchema } from "./balance.ts";
import { CapitalChangeSchema } from "./capital-change.ts";
import { FinancialResultSchema } from "./financial-result.ts";
import { FundsMovementSchema } from "./funds-movement.ts";
import { TargetedFundsUsingSchema } from "./targeted-funds-using.ts";

export const CorrectionSchema = v.strictObject({
	id: v.number(),
	bfoOrganizationInfo: v.nullish(
		v.strictObject({
			id: v.nullish(v.number()),
			fullName: v.nullish(v.string()),
			inn: v.nullish(v.string()),
			kpp: v.nullish(v.string()),
			address: v.nullish(v.string()),
			okved2: v.nullish(
				v.strictObject({
					id: v.nullish(v.string()),
					name: v.nullish(v.string()),
				}),
			),
			okopf_id: v.nullish(v.number()),
			okopf: v.nullish(
				v.strictObject({
					id: v.nullish(v.number()),
					name: v.nullish(v.string()),
				}),
			),
			okfs_id: v.nullish(v.number()),
			okfs: v.nullish(
				v.strictObject({
					id: v.nullish(v.number()),
					name: v.nullish(v.string()),
				}),
			),
			bfoId: v.nullish(v.number()),
			okpo: v.nullish(v.string()),
		}),
	),
	balance: v.nullish(BalanceSchema),
	financialResult: v.nullish(FinancialResultSchema),
	capitalChange: v.nullish(CapitalChangeSchema),
	fundsMovement: v.nullish(FundsMovementSchema),
	targetedFundsUsing: v.nullish(TargetedFundsUsingSchema),
	correctionVersion: v.nullish(v.number()),
	requiredAudit: v.nullish(v.number()),
	datePresent: v.nullish(v.string()),
	prBn: v.nullish(v.number()),
	knd: v.nullish(v.string()),
	clarification: v.nullish(
		v.strictObject({
			id: v.number(),
			fileMetadata: v.object({
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
			isOrganization: v.nullish(v.boolean()),
			fileMetadata: v.nullish(
				v.strictObject({
					id: v.number(),
					contentType: v.string(),
					size: v.number(),
					originalName: v.string(),
					fileToken: v.string(),
				}),
			),
		}),
	),
	periodType: v.nullish(v.number()),
});

export const TypeCorrectionSchema = v.strictObject({
	type: v.number(),
	correction: CorrectionSchema,
});

export type Correction = v.InferOutput<typeof CorrectionSchema>;
export type TypeCorrection = v.InferOutput<typeof TypeCorrectionSchema>;
