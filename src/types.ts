export type Optional<T> = {
	[K in keyof T]?: T[K];
};

export type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};

export type ChartOptions = {
	// min: number;
	// max: number;
	height: number;
	width: number;
	gap: number;
};

export type LinearGradientDirection =
	| "left-to-right"
	| "right-to-left"
	| "top-to-bottom"
	| "bottom-to-top"
	| `${number}`;

export type LinearGradientType = "individual" | "continuous";

export type BarChartClasses = {
	groupClass: string;
	parentClass: string;
	barClass: string;
	textClass: string;
	barGroupClass: string;
	textGroupClass: string;
};

export type BarChartOptionsBase = {
	type: "numerical" | "stacked";
	placement: "top" | "right" | "bottom" | "left";
	responsive: boolean;
	barWidth: number;
	// groupClass: string;
	// parentClass: string;
	// barClass: string;
	// textClass: string;
	colors: string[];
	gradientColors: string[];
	gradientMode: LinearGradientType;
	gradientDirection: LinearGradientDirection;
} & BarChartClasses &
	ChartOptions;

// type BarChartData = BarChartOptionsBase["type"] extends "numerical"
// 	? number[]
// 	: number[][];

export type BarChartLabels = string[];

export type BarChartNumericalOpts = Optional<
	Omit<BarChartOptionsBase, "type">
> & {
	type?: "numerical";
	readonly data: number[];
	readonly labels?: BarChartLabels;
};

export type BarChartStackedOpts = Optional<
	Omit<BarChartOptionsBase, "type">
> & {
	type?: "stacked";
	readonly data: number[][];
	readonly labels?: BarChartLabels;
};

export type BarChartOptions = BarChartNumericalOpts | BarChartStackedOpts;

// There's probably a better way than type predicates but going to go with this for now instead of getting hung up on type narrowing/inference/asserting.
export const isNumericalArray = (
	arr: number[] | number[][],
): arr is number[] => {
	return typeof arr[0] === "number";
};
export const is2DNumericalArray = (
	arr: number[] | number[][],
): arr is number[][] => {
	return Array.isArray(arr[0]);
};
export const isNumericalOptions = (
	opts: BarChartOptions,
): opts is BarChartNumericalOpts => {
	return "type" in opts && opts.type === "numerical";
};
export const isStackedOptions = (
	opts: BarChartOptions,
): opts is BarChartStackedOpts => {
	return "type" in opts && opts.type === "stacked";
};

// type BarChartOptions = Optional<BarChartOptionsBase> & {
// 	readonly data: BarChartData;
// 	readonly labels: BarChartLabels;
// };
