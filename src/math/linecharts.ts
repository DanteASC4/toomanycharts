import { asPercent } from "../math/common.ts";

export const genCoordsStraight = (
	vals: number[],
	offset: number,
	max: number,
	width: number,
) => {
	const coords: [number, number][] = [];
	for (let i = 0; i < vals.length; i++) {
		const x = width * ((offset * i) / 100);
		const v = vals[i];
		const y = max * (asPercent(v, max) / 100);
		coords.push([x, y]);
	}
	return coords;
};

export const autoOffset = (numPoints: number) => {
	return 100 / numPoints;
};
