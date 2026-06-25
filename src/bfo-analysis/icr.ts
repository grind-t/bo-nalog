import type { Correction } from "../bfo/schemas/correction/index.ts";

export function icr(correction: Correction): number | null {
	const { current2300, current2330 } = correction.financialResult || {};

	if (!current2300 || !current2330) return null;

	return (current2300 + Math.abs(current2330)) / Math.abs(current2330);
}
