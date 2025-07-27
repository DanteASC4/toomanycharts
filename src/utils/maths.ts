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

export const autoBarWidth = (surfaceWidth: number, numBars: number) => {
	return surfaceWidth / numBars / 2;
};

// export const autoBarWidth = (
// 	placement: BarChartOptionsBase["placement"],
// 	width: number,
// 	height: number,
// 	numDataPoints: number,
// ) => {
// 	if (placement === "top" || placement === "bottom") {
// 		const evenH = height / numDataPoints;
// 		return evenH / 2;
// 	}
// 	const evenW = width / numDataPoints;
// 	return evenW / 2;
// };

export const autoGap = (surfaceLength: number, numBars: number) => {
	return surfaceLength / numBars / 4;
};
// export const autoGap = (
// 	placement: BarChartOptionsBase["placement"],
// 	width: number,
// 	height: number,
// 	numDataPoints: number,
// 	barWidth: number,
// ) => {
// 	const spaceTaken = barWidth * numDataPoints;
// 	const evenSpacedGap =
// 		placement === "left" || placement === "right"
// 			? (height - spaceTaken) / numDataPoints
// 			: (width - spaceTaken) / numDataPoints;
// 	return evenSpacedGap;
// };

export const lgDistTest = (colorsAmt: number) => {
	const result: number[] = [];

	const dist = 1 / (colorsAmt - 1);
	for (let i = 0; i < colorsAmt; i++) {
		const p = i * dist * 100;
		result.push(p);
	}

	return result;
};
