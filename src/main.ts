import {
	type BarChartNumericalOpts,
	type BarChartOptions,
	type BarChartStackedOpts,
	is2DNumericalArray,
	isNumericalArray,
	isNumericalOptions,
	isStackedOptions,
} from "./types.ts";
import { BarChartDefaults } from "./utils/defaults.ts";
import {
	autoBarWidth,
	autoMaxNumerical,
	autoMaxStacked,
} from "./utils/maths.ts";
import { fillEmptyArray, fillStrings, fillZeros } from "./utils/misc.ts";

function barchartNumerical({
	data,
	labels,
	min,
	max,
	height,
	width,
	gap,
	orientation,
	barWidth,
}: BarChartNumericalOpts) {
	if (!max) max = autoMaxNumerical(data);
	if (!min) min = BarChartDefaults.min;
	if (!height) height = BarChartDefaults.size;
	if (!width) width = BarChartDefaults.size;
	if (!gap) gap = BarChartDefaults.gap;
	if (!orientation) orientation = BarChartDefaults.orientation;

	const padLabels = labels.length < data.length;
	if (padLabels) {
		const diff = Math.abs(labels.length - data.length);
		fillStrings(labels, diff);
	}
	const padData = data.length < labels.length;
	if (padData) {
		const diff = Math.abs(labels.length - data.length);
		fillZeros(data, diff);
	}
	const dataPointsAmt = data.length;
	if (!barWidth)
		barWidth = autoBarWidth(orientation, width, height, gap, dataPointsAmt);

	const estTotalSize = barWidth * dataPointsAmt + (gap * dataPointsAmt - 1);

	if (orientation === "vertical" && estTotalSize > width)
		console.warn("NanoChart might exceed given size bounds");
	if (orientation === "horizontal" && estTotalSize > height)
		console.warn("NanoChart might exceed given size bounds");

	// Chart creation begin
}

function barchartStacked({
	data,
	labels,
	min,
	max,
	height,
	width,
	gap,
	orientation,
}: BarChartStackedOpts) {
	if (!max) max = autoMaxStacked(data);
	if (!min) min = BarChartDefaults.min;
	if (!height) height = BarChartDefaults.size;
	if (!width) width = BarChartDefaults.size;
	if (!gap) gap = BarChartDefaults.gap;
	if (!orientation) orientation = BarChartDefaults.orientation;

	const padLabels = labels.length < data.length;
	if (padLabels) {
		const diff = Math.abs(labels.length - data.length);
		fillStrings(labels, diff);
	}
	const padData = data.length < labels.length;
	if (padData) {
		const diff = Math.abs(labels.length - data.length);
		fillEmptyArray(data, diff);
	}
}

export function barchart(options: BarChartOptions) {
	let { data, labels, type } = options;
	if (data.length !== labels.length) {
		console.warn("nanocharts: Not all datapoints have labels");
	}

	if (type === "numerical") {
		const goodNumericalData = isNumericalArray(data);
		if (!goodNumericalData) {
			console.error(
				'Data for "numerical" charts should be an array of numbers!',
			);
			return null;
		}

		const goodOpts = isNumericalOptions(options);
		if (!goodOpts) {
			// this shouldn't be possible, more just to satify ts
			return null;
		}

		return barchartNumerical(options);
	}
	if (type === "stacked") {
		const goodNumericalData = is2DNumericalArray(data);
		if (!goodNumericalData) {
			console.error(
				'Data for "stacked" charts should be a 2D-array of numbers!',
			);
			return null;
		}

		const goodOpts = isStackedOptions(options);
		if (!goodOpts) {
			// this shouldn't be possible, more just to satify ts
			return null;
		}

		return barchartStacked(options);
	}

	if (!type && typeof data[0] === "number") {
		type = "numerical";
		if (!isNumericalOptions(options)) return null;
		return barchartNumerical(options);
	} else if (!type && Array.isArray(data[0])) {
		type = "stacked";
		if (!isStackedOptions(options)) return null;
		return barchartStacked(options);
	} else {
		console.log("nanocharts: Cannot determine data type, exiting...");
		return null;
	}
}

barchart({ data: [1, 2, 3], labels: ["a", "b"], type: "numerical" });
barchart({
	data: [
		[1, 2, 3],
		[4, 5, 6],
	],
	labels: ["a", "b"],
	type: "stacked",
	min: 10,
});
