import { ensureDirSync } from "jsr:@std/fs";
import { randomIntegerBetween } from "@std/random";

const toOutP = (group: string, name: string) =>
	`./temp/out/${group}/${name}.svg`;
const toOutDir = (group: string) => `./temp/out/${group}/`;

// Directory needs to exist.
export const saveIfReal = (
	result: SVGElement | null,
	group: string,
	name: string,
) => {
	if (Deno.env.get("BUILD")) return;
	if (result) {
		const out = toOutP(group, name);
		ensureDirSync(toOutDir(group));
		console.log(`%c${name}`, "color:magenta;");
		Deno.writeTextFileSync(out, result.outerHTML.toString());
	}
};
const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

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
		dataArray.push(randomIntegerBetween(vMin ?? 10, vMax ?? 280));
	}

	return dataArray;
};

export const randomStackedDataArray = (
	amount?: number,
	aMin?: number,
	aMax?: number,
	vMin?: number,
	vMax?: number,
) => {
	const data = [];
	let dataPoints = 0;
	const amt = amount ?? randomIntegerBetween(2, 5);

	for (let i = 0; i < amt; i++) {
		const dataArr = randomDataArray(aMin, aMax, vMin, vMax);
		dataPoints += dataArr.length;
		data.push(dataArr);
	}

	return { dataArray: data, totalDatapoints: dataPoints };
};

export const randShortString = () => {
	let str = "";
	const len = randomIntegerBetween(1, 5);
	for (let i = 0; i < len; i++) {
		str += alphabet[randomIntegerBetween(0, alphabet.length - 1)];
	}
	return str;
};
