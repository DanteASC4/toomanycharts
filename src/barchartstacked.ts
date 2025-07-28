import { createStackedBarAndText } from "./creating/barchartstacked.ts";
import { createSVGElement, makeSVGParent } from "./creating/common.ts";
import {
	createBarChartMask,
	createLinearGradient,
} from "./creating/gradients.ts";
import type { BarChartStackedOpts } from "./types.ts";
import { BarChartDefaults } from "./utils/defaults.ts";
import {
	autoBarWidth,
	autoGap,
	autoMaxNumerical,
	stackedToNumerical,
} from "./utils/maths.ts";
import { fillEmptyArray, fillStrings } from "./utils/misc.ts";

export function barchartStacked({
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
}: BarChartStackedOpts) {
	const asNumerical = stackedToNumerical(data);
	if (!max) max = autoMaxNumerical(asNumerical);
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

	// TODO better way then reducing each?
	const parent = makeSVGParent(height, width);
	if (
		(placement === "top" || placement === "bottom") &&
		asNumerical.some((v) => v > width)
	) {
		parent.setAttribute("viewBox", `0 0 ${width} ${max}`);
	} else {
		if (asNumerical.some((v) => v > height))
			parent.setAttribute("viewBox", `0 0 ${max} ${height}`);
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
	if (textGroupClass) textGroup.classList.add(textGroupClass);

	barGroup.classList.add("nc-bargroup");
	textGroup.classList.add("nc-textgroup");

	const bars = [];

	for (let i = 0; i < data.length; i++) {
		const label = labels[i];
		const datap = data[i];
		const datapNumerical = asNumerical[i];
		const color =
			isGradient && gradientId
				? gradientMode === "continuous"
					? "transparent"
					: `url('#${gradientId}')`
				: colors && colors.length > 0
					? colors[i % colors.length]
					: ["#ffffff", "#aaaaaa"];

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
			{ width, height },
			{ textClass, barClass },
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
