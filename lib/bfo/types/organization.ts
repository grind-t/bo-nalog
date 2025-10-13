import { z } from "zod";

export const OrganizationInfoSchema = z.object({
	fullName: z.string().nullish(),
	inn: z.string().nullish(),
	kpp: z.string().nullish(),
	address: z.string().nullish(),
	okved2_id: z.string().nullish(),
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
	okpo: z.string().nullish(),
});
