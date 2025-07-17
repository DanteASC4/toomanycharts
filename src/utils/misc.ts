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
