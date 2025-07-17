import type { BarChartOptionsBase } from "../types.ts";

export const sum2DArrayInPlace = (arr: number[][]) => {
	return arr.slice().map((a) => a.flat().reduce((c, p) => c + p, 0));
};

const roundToTen = (n: number) => {
	return Math.round(n / 10) * 10;
};

export const autoMaxNumerical = (data: number[]) => {
	return roundToTen(Math.max(...data));
};

export const autoMaxStacked = (data: number[][]) => {
	const summed = sum2DArrayInPlace(data.slice());
	return roundToTen(Math.max(...summed));
};

export const autoBarWidth = (
	orientation: BarChartOptionsBase["orientation"],
	width: number,
	height: number,
	gap: number,
	numDataPoints: number,
) => {
	if (orientation === "vertical") return width / numDataPoints - gap;
	return height / numDataPoints - gap;
};
