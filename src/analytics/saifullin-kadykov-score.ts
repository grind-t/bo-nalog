import type { Correction } from "../bfo/schemas/correction/index.ts";

// Модель Сайфуллина-Кадыкова (адаптирована под РСБУ)
// > 1 — устойчивое финансовое положение
// < 1 — высокий риск банкротства
export function calcSaifullinKadykovScore(correction: Correction): number {
	const b = correction.balance;
	const f = correction.financialResult;

	const equity = b.current1300 ?? 0;
	const currentAssets = b.current1200 ?? 0;
	const currentLiabilities = b.current1500 ?? 0;
	const totalAssets = b.current1600 ?? 0;
	const revenue = f?.current2110 ?? 0;
	const netIncome = f?.current2400 ?? 0;
	const grossProfit = f?.current2100 ?? 0;

	if (totalAssets === 0 || currentAssets === 0 || equity === 0) return 0;

	// Коэффициент обеспеченности собственными оборотными средствами
	const nonCurrentAssets = b.current1100 ?? 0;
	const ownWorkingCapital = equity - nonCurrentAssets;
	const x1 = ownWorkingCapital / currentAssets;

	// Коэффициент текущей ликвидности
	const x2 = currentLiabilities !== 0 ? currentAssets / currentLiabilities : 0;

	// Интенсивность оборота авансируемого капитала (оборачиваемость активов)
	const x3 = revenue / totalAssets;

	// Коэффициент менеджмента (рентабельность продаж)
	const x4 = revenue !== 0 ? grossProfit / revenue : 0;

	// Рентабельность собственного капитала
	const x5 = netIncome / equity;

	return 2 * x1 + 0.1 * x2 + 0.08 * x3 + 0.45 * x4 + x5;
}
