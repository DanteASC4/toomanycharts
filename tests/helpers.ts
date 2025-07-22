import { randomIntegerBetween } from "@std/random";

/*
 * Returns an array of 2-5 positive numbers with each valuing anywhere from 10-300
 * With optional params to change both of those ranges
 */
export const randomDataArray = (
	aMin?: number,
	aMax?: number,
	vMin?: number,
	vMax?: number,
) => {
	const dataPoints = randomIntegerBetween(aMin ?? 2, aMax ?? 5);
	const dataArray = [];

	for (let i = 0; i < dataPoints; i++) {
		dataArray.push(randomIntegerBetween(vMin ?? 10, vMax ?? 300));
	}

	return dataArray;
};
