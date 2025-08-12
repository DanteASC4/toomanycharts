import { makeSVGParent } from "./creating/common.ts";
import { createLinearGradient } from "./creating/gradients.ts";
import {
	createLineLabels,
	drawLineSmooth,
	drawLineStraight,
} from "./creating/linechart.ts";
import { roundUpTo100 } from "./math/common.ts";
import {
	autoOffset,
	genControlPoints,
	genCoordsStraight,
} from "./math/linecharts.ts";
import type { LineChartOptions } from "./types.ts";
import { LineChartDefaults } from "./utils/defaults.ts";
import { autoMaxNumerical } from "./utils/general-operations.ts";
import { fillStrings } from "./utils/misc.ts";

export function linechart({
	data,
	labels = [],
	height,
	width,
	max,
	lineType = "straight",
	fullWidthLine = false,
	cap = "round",
	thickness,
	lineClass,
	parentClass,
	labelClass,
	labelGroupClass,
	color,
	labelColor,
	gradientColors,
	gradientMode,
	gradientDirection,
}: LineChartOptions) {
	if (!max) max = autoMaxNumerical(data);
	if (!height) height = max + 10;
	if (!width) width = roundUpTo100(max > height ? max : height) + 100;
	if (!lineType) lineType = LineChartDefaults.lineType;

	// Line chart data won't be padded, labels will be for consistency mainly.
	const padLabels = labels.length < data.length;
	if (padLabels) {
		const diff = Math.abs(labels.length - data.length);
		fillStrings(labels, diff);
	}
	const hasLabels = labels.filter((l) => l !== "").length > 0;

	const dataPointsAmt = data.length;
	const parent = makeSVGParent(height, width);

	const offset = autoOffset(width, dataPointsAmt - (fullWidthLine ? 1 : 0));
	// const lineColor = color ?? "#ffffff";
	const thick = thickness ?? 3;

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

	let lineColor: string = "#ffffff";
	if (isGradient && gradientId) {
		if (gradientMode === "continuous") lineColor = "transparent";
		else `url('#${gradientId}')`;
	} else if (color) {
		lineColor = color;
	}

	// Straight line coordinates
	const coords = genCoordsStraight(data, offset, height);
	const controls = genControlPoints(coords);
	const line =
		lineType === "straight"
			? drawLineStraight(coords, lineColor, thick, cap)
			: drawLineSmooth(coords, controls, lineColor, thick, cap);

	let linelabelGroup: SVGElement | null = null;
	if (hasLabels) {
		const theLabelColor = labelColor ?? "#ffffff";
		linelabelGroup = createLineLabels(
			coords,
			labels,
			theLabelColor,
			labelClass,
		);
	}

	if (labelGroupClass && linelabelGroup)
		linelabelGroup.classList.add(labelGroupClass);
	if (parentClass) parent.classList.add(parentClass);
	if (lineClass) line.classList.add(lineClass);

	if (hasLabels && linelabelGroup) parent.appendChild(linelabelGroup);
	parent.appendChild(line);

	// Logging
	// console.log("---Linechart---");
	// console.log("WxH", width, height);
	// console.log("max", max);
	// console.log("offset", offset);
	// console.log("coords");
	// console.log(coords);

	return parent;
}
