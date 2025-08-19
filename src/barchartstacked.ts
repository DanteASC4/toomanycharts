import { createStackedBarAndText } from "./creating/barchartstacked.ts";
import { createSVGElement, makeSVGParent } from "./creating/common.ts";
import {
	createBarChartMask,
	createLinearGradient,
} from "./creating/gradients.ts";
import { autoBarWidth } from "./math/barcharts.ts";
import { autoGap } from "./math/common.ts";
import type { BarChartStackedOpts } from "./types.ts";
import { BarChartDefaults } from "./utils/defaults.ts";
import {
	autoMaxNumerical,
	stackedToSummed,
} from "./utils/general-operations.ts";
import { fillEmptyArray, fillStrings } from "./utils/misc.ts";

export function barchartStacked({
	data,
	labels = [],
	height = BarChartDefaults.size,
	width = BarChartDefaults.size,
	vWidth,
	vHeight,
	gap,
	max,
	placement,
	barWidth,
	groupClass,
	parentClass,
	barClass,
	labelClass,
	barGroupClass,
	labelGroupClass,
	colors,
	labelColors,
	gradientColors,
	gradientMode,
	gradientDirection,
}: BarChartStackedOpts) {
	const asNumerical = stackedToSummed(data);
	let userMax = false;
	if (max) userMax = true;
	const largest = autoMaxNumerical(asNumerical);
	// if (!max) max = autoMaxNumerical(asNumerical);
	// if (!min) min = BarChartDefaults.min;
	// if (!height) height = BarChartDefaults.size;
	// if (!width) width = BarChartDefaults.size;
	// if (!gap) gap = BarChartDefaults.gap;
	if (!vWidth) vWidth = width;
	if (!vHeight) vHeight = height;
	if (!placement) placement = BarChartDefaults.placement;

	const padLabels = labels.length < data.length;
	if (padLabels) {
		const diff = Math.abs(labels.length - data.length);
		fillStrings(labels, diff);
	}
	// this might need to be adjusted, as the logic behind this for stacked feels a bit different
	const padData = data.length < labels.length;
	if (padData) {
		const diff = Math.abs(labels.length - data.length);
		fillEmptyArray(data, diff);
	}

	const dataPointsAmt = asNumerical.length;
	const evenWidth =
		placement === "top" || placement === "bottom"
			? autoBarWidth(width, dataPointsAmt)
			: autoBarWidth(height, dataPointsAmt);

	if (!barWidth) {
		barWidth = evenWidth;
	}

	if (!gap) {
		gap =
			placement === "top" || placement === "bottom"
				? autoGap(width, dataPointsAmt)
				: autoGap(height, dataPointsAmt);
	}

	const topOrBot = placement === "top" || placement === "bottom";
	const parent = topOrBot
		? makeSVGParent(
				vWidth,
				userMax && typeof max === "number" ? max : vHeight,
				width,
				height,
			)
		: makeSVGParent(
				userMax && typeof max === "number" ? max : vWidth,
				vHeight,
				width,
				height,
			);

	const exceedsWidth = asNumerical.some((v) => v > vWidth);
	const exceedsHeight = asNumerical.some((v) => v > vHeight);

	if (topOrBot) {
		if (exceedsHeight) {
			parent.setAttribute(
				"viewBox",
				`0 0 ${vWidth} ${userMax ? max : largest}`,
			);
		} else {
			parent.setAttribute("viewBox", `0 0 ${vWidth} ${vHeight}`);
		}
	} else {
		if (exceedsWidth) {
			parent.setAttribute(
				"viewBox",
				`0 0 ${userMax ? max : largest} ${vHeight}`,
			);
		} else {
			parent.setAttribute("viewBox", `0 0 ${vWidth} ${vHeight}`);
		}
	}

	let isGradient = false;
	let gradientId: string | null = null;
	let gradientDef: SVGElement | null = null;
	let gradientBg: SVGElement | null = null;

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
	if (labelGroupClass) textGroup.classList.add(labelGroupClass);

	barGroup.classList.add("nc-bargroup");
	textGroup.classList.add("nc-textgroup");

	const bars = [];

	for (let i = 0; i < data.length; i++) {
		const label = labels[i];
		const datap = data[i];
		const datapNumerical = asNumerical[i];

		let color: string | string[] = ["#ffffff", "#aaaaaa"];

		if (isGradient && gradientId) {
			if (gradientMode === "continuous") color = "transparent";
			else color = `url('#${gradientId}')`;
		} else if (colors && colors.length > 0) {
			color = colors;
			// color = colors[asNumerical.indexOf(dat) % colors.length];
		}

		const labelColor =
			labelColors && labelColors.length > 0
				? labelColors[i % labelColors.length]
				: "#ffffff";
		const [stackedbars, text] = createStackedBarAndText(
			i,
			placement,
			datap,
			datapNumerical,
			label,
			gap,
			barWidth,
			evenWidth,
			color,
			labelColor,
			{ width: vWidth, height: vHeight },
			{ labelClass, barClass },
		);

		stackedbars.map((bar) => barGroup.appendChild(bar));
		textGroup.appendChild(text);

		// Setup for continuous gradient fill
		if (gradientMode === "continuous" && gradientId) bars.push(...stackedbars);

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
