import { createBarAndText } from "./creating/barchart.ts";
import { createSVGElement, makeSVGParent } from "./creating/common.ts";
import {
	createBarChartMask,
	createLinearGradient,
} from "./creating/gradients.ts";
import type { BarChartNumericalOpts } from "./types.ts";
import { BarChartDefaults } from "./utils/defaults.ts";
import { autoBarWidth, autoGap, autoMaxNumerical } from "./utils/maths.ts";
import { fillStrings, fillZeros } from "./utils/misc.ts";

export function barchart({
	data,
	labels = [],
	height,
	width,
	gap,
	max,
	placement,
	barWidth,
	groupClass,
	parentClass,
	barClass,
	textClass,
	barGroupClass,
	textGroupClass,
	colors,
	labelColors,
	gradientColors,
	gradientMode,
	gradientDirection,
}: BarChartNumericalOpts) {
	if (!max) max = autoMaxNumerical(data);
	// if (!min) min = BarChartDefaults.min;
	if (!height) height = BarChartDefaults.size;
	if (!width) width = BarChartDefaults.size;
	if (!placement) placement = BarChartDefaults.placement;
	// if (!labels) labels = []

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
	const evenWidth =
		placement === "top" || placement === "bottom"
			? autoBarWidth(width, dataPointsAmt)
			: autoBarWidth(height, dataPointsAmt);

	if (!barWidth) {
		// barWidth = autoBarWidth(placement, width, height, dataPointsAmt);
		barWidth = evenWidth;
	}

	if (!gap) {
		gap =
			placement === "top" || placement === "bottom"
				? autoGap(width, dataPointsAmt)
				: autoGap(height, dataPointsAmt);
	}

	// if (!gap) gap = autoGap(placement, width, height, dataPointsAmt, barWidth);

	// const estTotalSize = barWidth * dataPointsAmt + (gap * dataPointsAmt - 1);
	// const isVertical = placement === "top" || placement === "bottom";
	// if (isVertical && estTotalSize > width)
	// 	console.warn("toomanychart might exceed given size bounds");
	// else if (!isVertical && estTotalSize > height)
	// 	console.warn("toomanychart might exceed given size bounds");

	// Chart creation begin
	const parent = makeSVGParent(height, width);
	if (
		(placement === "top" || placement === "bottom") &&
		data.some((v) => v > width)
	) {
		parent.setAttribute("viewBox", `0 0 ${width} ${max}`);
	} else {
		if (data.some((v) => v > height))
			parent.setAttribute("viewBox", `0 0 ${max} ${height}`);
	}
	let isGradient = false;
	let gradientId: string | null = null;
	let gradientDef: SVGElement | null = null;
	let gradientBg: SVGElement | null = null;

	// If we're doing a gradient, build the defs
	// if it's continuous also append the background rect
	// the defs uses a copy of the chart, with the bars filled with #fff and a bg rect of #000
	// (check if we can do <use> ???)
	// then the bars are filled with transparent
	// if it's individual then the bars just get filled with a `url` call

	if (gradientColors) {
		isGradient = true;
		if (!gradientMode) gradientMode = "individual";

		const [gradDef, gradId, gradBg] = createLinearGradient(
			gradientColors,
			gradientDirection,
			gradientMode,
		);
		gradientId = gradId;
		gradientDef = gradDef;
		gradientBg = gradBg;
	}

	if (gradientDef) parent.appendChild(gradientDef);
	// if (gradientBg) parent.appendChild(gradientBg);

	const barGroup = createSVGElement("g");
	const textGroup = createSVGElement("g");

	if (groupClass) {
		barGroup.classList.add(groupClass);
		textGroup.classList.add(groupClass);
	}
	if (barGroupClass) barGroup.classList.add(barGroupClass);
	if (textGroupClass) textGroup.classList.add(textGroupClass);

	barGroup.classList.add("nc-bargroup");
	textGroup.classList.add("nc-textgroup");

	const bars = [];

	for (let i = 0; i < data.length; i++) {
		const label = labels[i];
		const datap = data[i];

		// The ternary below is pretty cursed but I don't feel like abstracting currently it so here's a doc comment:
		/*
		 * If we're doing a gradient & we have the `gradientId`
		 *  Then if it's a continuous one, fill is transparent
		 *  Else since it's not transparent, we'll fill with the gradient itself
		 * If we have a colors array
		 *  Grab the color at the current modulated (is that the right word?) index
		 *  Else fill with white
		 */
		const color =
			isGradient && gradientId
				? gradientMode === "continuous"
					? "transparent"
					: `url('#${gradientId}')`
				: colors && colors.length > 0
					? colors[i % colors.length]
					: "#ffffff";

		const labelColor =
			labelColors && labelColors.length > 0
				? labelColors[i % labelColors.length]
				: "#ffffff";
		const [bar, text] = createBarAndText(
			i,
			placement,
			datap,
			label,
			gap,
			barWidth,
			evenWidth,
			color,
			labelColor,
			{ width, height },
			{ textClass, barClass },
		);
		barGroup.appendChild(bar);
		textGroup.appendChild(text);

		// Setup for continuous gradient fill
		if (gradientMode === "continuous" && gradientId) bars.push(bar);

		// if (resultGroup) parent.appendChild(resultGroup);
	}

	if (
		isGradient &&
		gradientDef &&
		gradientBg &&
		gradientMode === "continuous"
	) {
		const [maskId, theMask] = createBarChartMask(bars);
		gradientDef.appendChild(theMask);

		gradientBg.setAttribute("mask", `url('#${maskId}')`);
		parent.appendChild(gradientBg);
	}

	parent.appendChild(barGroup);
	parent.appendChild(textGroup);

	if (parentClass) parent.classList.add(parentClass);

	return parent;
}

// export function barchart(options: BarChartOptions): SVGElement | null {
// 	let { data, labels = [], type } = options;
// 	if (data.length !== labels.length) {
// 		console.warn("toomanycharts: Not all datapoints have labels");
// 	}

// 	if (type === "numerical") {
// 		const goodNumericalData = isNumericalArray(data);
// 		if (!goodNumericalData) {
// 			console.error(
// 				'Data for "numerical" charts should be an array of numbers!',
// 			);
// 			return null;
// 		}

// 		const goodOpts = isNumericalOptions(options);
// 		if (!goodOpts) {
// 			// this shouldn't be possible, more just to satify ts
// 			return null;
// 		}

// 		return barchartNumerical(options);
// 	}
// 	if (type === "stacked") {
// 		const goodNumericalData = is2DNumericalArray(data);
// 		if (!goodNumericalData) {
// 			console.error(
// 				'Data for "stacked" charts should be a 2D-array of numbers!',
// 			);
// 			return null;
// 		}

// 		const goodOpts = isStackedOptions(options);
// 		if (!goodOpts) {
// 			// this shouldn't be possible, more just to satify ts
// 			return null;
// 		}

// 		return barchartStacked(options);
// 	}

// 	if (!type && typeof data[0] === "number") {
// 		// type = "numerical";
// 		options.type = "numerical";
// 		if (!isNumericalOptions(options)) {
// 			console.warn("Bad options for numerical auto-type! Exiting...");
// 			return null;
// 		}
// 		return barchartNumerical(options);
// 	} else if (!type && Array.isArray(data[0])) {
// 		// type = "stacked";
// 		options.type = "numerical";
// 		if (!isStackedOptions(options)) {
// 			console.warn("Bad options for stacked auto-type! Exiting...");
// 			return null;
// 		}
// 		return barchartStacked(options);
// 	} else {
// 		console.log("toomanycharts: Cannot determine data type, exiting...");
// 		return null;
// 	}
// }
