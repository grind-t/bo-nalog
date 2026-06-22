import type { Correction } from "../bfo/schemas/correction/index.ts";

// Модель Таффлера (1977)
// > 0.3 — низкий риск банкротства
// 0.2 – 0.3 — серая зона
// < 0.2 — высокий риск банкротства
export function calcTafflerScore(correction: Correction): number {
	const b = correction.balance;
	const f = correction.financialResult;

	const ebt = f?.current2300 ?? 0;
	const currentLiabilities = b.current1500 ?? 0;
	const currentAssets = b.current1200 ?? 0;
	const totalLiabilities = (b.current1400 ?? 0) + (b.current1500 ?? 0);
	const totalAssets = b.current1600 ?? 0;
	const revenue = f?.current2110 ?? 0;

	if (totalAssets === 0) return 0;

	const x1 = currentLiabilities !== 0 ? ebt / currentLiabilities : 0;
	const x2 = totalLiabilities !== 0 ? currentAssets / totalLiabilities : 0;
	const x3 = currentLiabilities / totalAssets;
	const x4 = revenue / totalAssets;

	return 0.53 * x1 + 0.13 * x2 + 0.18 * x3 + 0.16 * x4;
}
