import { join } from "node:path";
import { exit } from "node:process";
import pl from "nodejs-polars";
import * as v from "valibot";
import { fs, sleep } from "zx";
import { searchOrganizations } from "../../src/search/index.ts";
import { SearchOutputSchema } from "../../src/search/types/output.ts";

const EXPORTS_DIR = join(import.meta.dirname, "..", "..", "exports");

const inns: string[] = await fs.readJSON(join(EXPORTS_DIR, "inns.json"));

const rows = [];

for (const inn of inns) {
	await sleep(200);

	const result = await searchOrganizations({ inn, size: 1 });
	const { success, output, issues } = v.safeParse(SearchOutputSchema, result);

	if (!success) {
		console.error(
			`Error parsing result for INN ${inn}:\n\n${v.summarize(issues)}`,
		);
		exit(1);
	}

	const org = output.content[0];

	if (!org) continue;

	rows.push({
		id: org.id,
		inn: org.inn,
		shortName: org.shortName,
		ogrn: org.ogrn,
		index: org.index,
		region: org.region,
		district: org.district,
		city: org.city,
		settlement: org.settlement,
		street: org.street,
		house: org.house,
		building: org.building,
		office: org.office,
		okved2: org.okved2,
		okopf: org.okopf,
		okato: org.okato,
		okpo: org.okpo,
		okfs: org.okfs,
		statusCode: org.statusCode,
		statusDate: org.statusDate,
		bfo_period: org.bfo.period,
		bfo_actualBfoDate: org.bfo.actualBfoDate,
		bfo_gainSum: org.bfo.gainSum,
		bfo_knd: org.bfo.knd,
		bfo_hasAz: org.bfo.hasAz,
		bfo_hasKs: org.bfo.hasKs,
		bfo_actualCorrectionNumber: org.bfo.actualCorrectionNumber,
		bfo_actualCorrectionDate: org.bfo.actualCorrectionDate,
		bfo_isCb: org.bfo.isCb,
		bfo_bfoPeriodTypes: org.bfo.bfoPeriodTypes,
	});
}

const df = pl.DataFrame(rows);

df.writeParquet(join(EXPORTS_DIR, "companies.parquet"));
