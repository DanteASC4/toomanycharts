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
	numDataPoints: number,
) => {
	if (orientation === "vertical") {
		const evenH = height / numDataPoints;
		return evenH / 2;
	}
	const evenW = width / numDataPoints;
	return evenW / 2;
};

export const autoGap = (
	orientation: BarChartOptionsBase["orientation"],
	width: number,
	height: number,
	numDataPoints: number,
	barWidth: number,
) => {
	const spaceTaken = barWidth * numDataPoints;
	const evenSpacedGap =
		orientation === "horizontal"
			? (height - spaceTaken) / numDataPoints
			: (width - spaceTaken) / numDataPoints;
	return evenSpacedGap;
};
