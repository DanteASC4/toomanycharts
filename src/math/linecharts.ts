export const genCoordsStraight = (
	vals: number[],
	offset: number,
	max: number,
) => {
	const coords: [number, number][] = [];
	for (let i = 0; i < vals.length; i++) {
		const x = offset * i;
		const v = vals[i];
		const y = max - (v / max) * 100;
		coords.push([x, y]);
	}
	return coords;
};

export const autoOffset = (width: number, numPoints: number) => {
	return width / numPoints;
};
