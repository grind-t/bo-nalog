import type { Correction } from "../bfo/schemas/correction/index.ts";

// Модифицированный Z'-Score Альтмана для непубличных компаний
// X4 использует балансовую стоимость капитала вместо рыночной
// > 2.6 — устойчивое финансовое положение
// 1.1 – 2.6 — серая зона
// < 1.1 — высокий риск банкротства
export function calcZScore(correction: Correction): number {
	const b = correction.balance;
	const f = correction.financialResult;

	const workingCapital = (b.current1200 ?? 0) - (b.current1500 ?? 0);
	const totalAssets = b.current1600 ?? 0;
	const retainedEarnings = b.current1370 ?? 0;
	const ebit = (f.current2300 ?? 0) + (f.current2330 ?? 0);
	const equity = b.current1300 ?? 0;
	const totalLiabilities = (b.current1400 ?? 0) + (b.current1500 ?? 0);
	const revenue = f.current2110 ?? 0;

	if (totalAssets === 0) return 0;

	const x1 = workingCapital / totalAssets;
	const x2 = retainedEarnings / totalAssets;
	const x3 = ebit / totalAssets;
	const x4 = totalLiabilities !== 0 ? equity / totalLiabilities : 0;
	const x5 = revenue / totalAssets;

	return 1.2 * x1 + 1.4 * x2 + 3.3 * x3 + 0.6 * x4 + x5;
}
