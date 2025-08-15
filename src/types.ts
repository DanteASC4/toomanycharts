export type Optional<T> = {
	[K in keyof T]?: T[K];
};

export type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};

type MakeRange<
	N extends number,
	Result extends Array<unknown> = [],
> = Result["length"] extends N
	? Result
	: MakeRange<N, [...Result, Result["length"]]>;

type MaxP = MakeRange<101>;

type Percentage = `${MaxP[number]}%`;

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

export type GradientColor = string | `${string}:${Percentage}`;

export type LinearGradientDirection =
	| "left-to-right"
	| "right-to-left"
	| "top-to-bottom"
	| "bottom-to-top"
	| `${number}`;

export type LinearGradientType = "individual" | "continuous";

export type LinearGradientOptions = {
	/**
	 * Array of CSS color values
	 */
	gradientColors: GradientColor[];
	/**
	 * Defaults to `"individual"` when `gradientColors` is supplied but no `gradientMode` is given.
	 */
	gradientMode: LinearGradientType;
	/**
	 * Defaults to `"left-to-right"` when `gradientColors` is supplied but no `gradientDirection` is given.
	 */
	gradientDirection: LinearGradientDirection;
};

// TODO use this to allow multiple gradients
export type ManyLinearGradientOptions = {
	gradientColors: GradientColor[][];
	gradientMode: Extract<LinearGradientType, "individual">;
	gradientDirection: LinearGradientDirection;
};

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
} & BarChartClasses &
	LinearGradientOptions &
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
	/**
	 * Added to resulting `<path>` elements
	 */
	lineClass: string;
	/**
	 * Added to resulting `<g>` tag containing line `<path>` elements
	 */
	lineGroupClass: string;
	/**
	 * Added to resulting parent `<svg>` element
	 */
	parentClass: string;
	/**
	 * Added to resulting `<text>` elements
	 */
	labelClass: string;
	/**
	 * Added to resulting `<g>` tag containing line `<text>` elements
	 */
	labelGroupClass: string;
};

/**
 * Used for resulting path's [`stroke-linecap`](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/stroke-linecap) attribute
 */
type LineCaps = "round" | "butt" | "square";
/**
 * Controls whether resulting lines are drawn straight or smooth
 */
type LineTypes = "straight" | "smooth";

export type LineChartOptionsBase = {
	/**
	 * When not supplied, defaults to `10` greater than the largest datapoint in the supplied `data` array.
	 */
	max: number;
	/**
	 * Used for resulting path's `stroke-width`
	 */
	thickness: number | number[];
	/**
	 * Used for resulting path's [`stroke-linecap`](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/stroke-linecap) attribute
	 */
	cap: LineCaps | LineCaps[];
	/**
	 * Controls whether resulting lines are drawn straight or smooth
	 * Defaults to `"straight"`
	 */
	lineType: LineTypes | LineTypes[];
	/**
	 * Decides whether the drawn line reaches the end of it's containing SVG box,
	 * Defaults to false
	 */
	fullWidthLine: boolean;
};

export type LineChartColors = {
	/**
	 * Used for the resulting path's `stroke` attribute, effectively coloring the line
	 * Defaults to `#ffffff`
	 * Will alternate between colors if there are less colors than the number of drawn lines.
	 */
	colors: string | string[];
	/**
	 * Used for the resulting label text color
	 * Defaults to `#ffffff`
	 * Will alternate between colors if there are less colors than labels.
	 */
	labelColors: string | string[];
};

export type LineChartOptions = Optional<
	LineChartOptionsBase &
		LineChartColors &
		ChartOptions &
		LinearGradientOptions &
		LineChartClasses
> & {
	readonly data: number[][] | number[];
	readonly labels?: string[][] | string[];
};

// Currently unused, to be deleted
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
