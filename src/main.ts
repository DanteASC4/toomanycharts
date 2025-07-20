import { createBarChartGroup } from "./creating/barchart.ts";
import { makeSVGParent } from "./creating/common.ts";
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
import { autoBarWidth, autoGap } from "./utils/maths.ts";
import { fillEmptyArray, fillStrings, fillZeros } from "./utils/misc.ts";

Deno.env.set("MODE", "DEV");

function barchartNumerical({
	data,
	labels,
	height,
	width,
	gap,
	placement,
	barWidth,
	parentClass,
	groupClass,
	barClass,
	textClass,
	colors,
}: BarChartNumericalOpts) {
	// if (!max) max = autoMaxNumerical(data);
	// if (!min) min = BarChartDefaults.min;
	if (!height) height = BarChartDefaults.size;
	if (!width) width = BarChartDefaults.size;
	if (!placement) placement = BarChartDefaults.placement;

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
	if (!barWidth) {
		// barWidth = autoBarWidth(placement, width, height, dataPointsAmt);
		barWidth =
			placement === "top" || placement === "bottom"
				? autoBarWidth(width, dataPointsAmt)
				: autoBarWidth(height, dataPointsAmt);
	}

	if (!gap) {
		gap =
			placement === "top" || placement === "bottom"
				? autoGap(width, dataPointsAmt)
				: autoGap(height, dataPointsAmt);
	}
	// if (!gap) gap = autoGap(placement, width, height, dataPointsAmt, barWidth);

	const estTotalSize = barWidth * dataPointsAmt + (gap * dataPointsAmt - 1);
	const isVertical = placement === "top" || placement === "bottom";
	if (isVertical && estTotalSize > width)
		console.warn("NanoChart might exceed given size bounds");
	else if (!isVertical && estTotalSize > height)
		console.warn("NanoChart might exceed given size bounds");

	// Chart creation begin
	const parent = makeSVGParent(height, width);

	for (let i = 0; i < data.length; i++) {
		const label = labels[i];
		const datap = data[i];
		const color = colors ? colors[i % colors.length] : "#ffffff";
		const resultGroup: SVGElement | undefined = createBarChartGroup(
			i,
			placement,
			datap,
			label,
			gap,
			barWidth,
			color,
			{ width, height },
			{ groupClass, textClass, barClass },
		);
		// Probably a better way to do this while also type narrowing

		if (resultGroup) parent.appendChild(resultGroup);
	}
	if (parentClass) parent.classList.add(parentClass);

	return parent;
}

function barchartStacked({
	data,
	labels,
	height,
	width,
	gap,
	placement,
}: BarChartStackedOpts) {
	// if (!max) max = autoMaxStacked(data);
	// if (!min) min = BarChartDefaults.min;
	if (!height) height = BarChartDefaults.size;
	if (!width) width = BarChartDefaults.size;
	if (!gap) gap = BarChartDefaults.gap;
	if (!placement) placement = BarChartDefaults.placement;

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

	console.log("TODO");
	return null;
}

export function barchart(options: BarChartOptions): SVGElement | null {
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
		// type = "numerical";
		options.type = "numerical";
		if (!isNumericalOptions(options)) {
			console.warn("Bad options for numerical auto-type! Exiting...");
			return null;
		}
		return barchartNumerical(options);
	} else if (!type && Array.isArray(data[0])) {
		// type = "stacked";
		options.type = "numerical";
		if (!isStackedOptions(options)) {
			console.warn("Bad options for stacked auto-type! Exiting...");
			return null;
		}
		return barchartStacked(options);
	} else {
		console.log("nanocharts: Cannot determine data type, exiting...");
		return null;
	}
}
