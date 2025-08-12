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

export const distP = (x1: number, y1: number, x2: number, y2: number) =>
	Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

export const midpoint = (x1: number, y1: number, x2: number, y2: number) => [
	(x1 + x2) / 2,
	(y1 + y2) / 2,
];

export const lawcosFora = (b: number, c: number, C: number) =>
	Math.sqrt(b ** 2 + c ** 2 - 2 * b * c * Math.cos(C));

export const lawsinForA = (a: number, b: number, A: number) =>
	Math.asin((Math.sin(A) * b) / a);
