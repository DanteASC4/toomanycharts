export const autoGap = (surfaceLength: number, numItems: number) => {
	return surfaceLength / numItems / 4;
};

export const asPercent = (num: number, ofnum: number) => {
	return (num * 100) / ofnum;
};

export const roundTo = (n: number, t = 10, upDown?: "up" | "down") => {
	if (upDown === "up") return Math.ceil(n / t) * t;
	if (upDown === "down") return Math.floor(n / t) * t;
	return Math.round(n / t) * t;
};

export const roundToTen = (n: number) => roundTo(n);

export const roundUpTo100 = (n: number) => roundTo(n, 100, "up");
