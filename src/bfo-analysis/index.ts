import type { BFO } from "../bfo/schemas/index.ts";
import { icr } from "./icr.ts";
import type { BFOAnalysis } from "./schemas/index.ts";

export function getBFOAnalysis(bfo: BFO): BFOAnalysis {
	const inn = bfo.organizationInfo.inn;
	const period = Number(bfo.period);
	const correction = bfo.typeCorrections[0].correction;

	return {
		inn,
		period,
		icr: icr(correction),
	};
}
