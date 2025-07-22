import { randomIntegerBetween } from "@std/random";

export const fillStrings = (arr: string[], amt: number) => {
	let i = amt;
	while (i !== 0) {
		arr.push("");
		i--;
	}
};

export const fillEmptyArray = (arr: number[][], amt: number) => {
	let i = amt;
	while (i !== 0) {
		arr.push([]);
		i--;
	}
};

export const fillZeros = (arr: number[], amt: number) => {
	let i = amt;
	while (i !== 0) {
		arr.push(0);
		i--;
	}
};

export const randId = (len = 8) => {
	const alphabet =
		"abdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	let id = "";
	for (let i = 0; i < len; i++) {
		id += alphabet[randomIntegerBetween(0, alphabet.length - 1)];
	}

	return id;
};
