export type Optional<T> = {
	[K in keyof T]?: T[K];
};

export type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};

export type ChartOptions = {
	// min: number;
	/**
	 * Defaults to `300`
	 */
	height: number;
	/**
	 * Defaults to `300`
	 */
	width: number;
};

export type LinearGradientDirection =
	| "left-to-right"
	| "right-to-left"
	| "top-to-bottom"
	| "bottom-to-top"
	| `${number}`;

export type LinearGradientType = "individual" | "continuous";

export type BarChartClasses = {
	/**
	 * Name is ambiguous, but attached to parent group of both label & bar groups
	 */
	groupClass: string;
	/**
	 * Attached to the parent `SVG` element
	 */
	parentClass: string;
	/**
	 * Attached to each individual bar `<rect ... />` element
	 */
	barClass: string;
	/**
	 * Attached to each individual label `<text ... />` element
	 */
	labelClass: string;
	/**
	 * Attached to the parent `g` element which contains the bar elements
	 */
	barGroupClass: string;
	/**
	 * Attached to the parent `g` element which contains the label elements
	 */
	labelGroupClass: string;
};

export type BarChartOptionsBase = {
	/**
	 * Defaults to `"bottom"` if not supplied
	 */
	placement: "top" | "right" | "bottom" | "left";
	/**
	 * Currently unused
	 */
	responsive: boolean;
	/**
	 * When not supplied this is calculated automatically using the following formula:
	 * ```
	 * barWidth = surfaceLength / numBars / 2
	 * ```
	 * Which results in an even width for each bar, based on the available space for the surface the bars are being attached to.
	 */
	barWidth: number;
	/**
	 * When not supplied, defaults to `10` greater than the largest datapoint in the supplied `data` array.
	 */
	max: number;
	/**
	 * When not supplied this is calculated automatically using the following formula:
	 * ```
	 * gap = surfaceLength / numBars / 4
	 * ```
	 * Which results in even spacing between all bars based on the available space for the surface the bars are being attached to.
	 */
	gap: number;
	/**
	 * Defaults to `#ffffff`
	 */
	colors: string[];
	/**
	 * Defaults to `#ffffff`
	 */
	labelColors: string[];
	gradientColors: string[];
	/**
	 * Defaults to `"individual"` when `gradientColors` is supplied but no `gradientMode` is given.
	 */
	gradientMode: LinearGradientType;
	/**
	 * Defaults to `"left-to-right"` when `gradientColors` is supplied but no `gradientDirection` is given.
	 */
	gradientDirection: LinearGradientDirection;
} & BarChartClasses &
	ChartOptions;

export type Labels = string[];

export type BarChartNumericalOpts = Optional<BarChartOptionsBase> & {
	readonly data: number[];
	/**
	 * Defaults to `[]` which is a chart with no labels
	 */
	readonly labels?: string[];
};

export type BarChartStackedOpts = Optional<BarChartOptionsBase> & {
	readonly data: number[][];
	/**
	 * Defaults to `[]` which is a chart with no labels
	 */
	readonly labels?: string[];
};

export type BarChartOptions = BarChartNumericalOpts | BarChartStackedOpts;

export type LineChartClasses = {
	lineClass: string;
	lineGroupClass: string;
	parentClass: string;
	labelClass: string;
	labelGroupClass: string;
};

export type LineChartOptionsBase = {
	/**
	 * When not supplied, defaults to `10` greater than the largest datapoint in the supplied `data` array.
	 */
	max: number;
	/**
	 * Defaults to `#ffffff`
	 */
	colors: string[];
	/**
	 * Defaults to `#ffffff`
	 */
	labelColors: string[];
	gradientColors: string[];
	/**
	 * Defaults to `"individual"` when `gradientColors` is supplied but no `gradientMode` is given.
	 */
	gradientMode: LinearGradientType;
	/**
	 * Defaults to `"left-to-right"` when `gradientColors` is supplied but no `gradientDirection` is given.
	 */
	gradientDirection: LinearGradientDirection;
	/**
	 * Defaults to `"straight"`
	 */
	lineType: "straight" | "cubic" | "quadratic";
} & ChartOptions &
	LineChartClasses;

export type LineChartOptions = Optional<LineChartOptionsBase> & {
	readonly data: number[];
	readonly labels?: string[];
};

export type MultiLineChartOptions = Optional<LineChartOptionsBase> & {
	readonly data: number[][];
	readonly labels?: string[];
};

// Currently mostly unused, to be deleted
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
