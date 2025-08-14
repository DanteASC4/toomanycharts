import { createSVGElement, makeSVGParent } from "./creating/common.ts";
import { createLinearGradient, createLinesMask } from "./creating/gradients.ts";
import {
	createLineLabels,
	drawLineSmooth,
	drawLineStraight,
} from "./creating/linechart.ts";
import { roundUpTo100 } from "./math/common.ts";
import {
	autoOffset,
	genCoordsStraight,
	genSingleControlPoint,
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
	lineType = ["straight"],
	fullWidthLine = false,
	cap = ["round"],
	thickness,
	lineClass,
	lineGroupClass,
	parentClass,
	labelClass,
	labelGroupClass,
	colors,
	labelColors,
	gradientColors,
	gradientMode,
	gradientDirection,
}: LineChartOptions) {
	// Arrays, arrays everywhere!
	if (data.every((item) => typeof item === "number")) data = [data];
	if (labels.every((l) => typeof l === "string")) labels = [labels];
	if (typeof colors === "string") colors = [colors];
	if (typeof labelColors === "string") labelColors = [labelColors];
	if (typeof thickness === "number") thickness = [thickness];
	if (typeof lineType === "string") lineType = [lineType];
	if (typeof cap === "string") cap = [cap];
	const asNumerical = data.flat();
	if (!max) max = autoMaxNumerical(asNumerical);
	if (!height) height = max + 10;
	if (!width) width = roundUpTo100(max > height ? max : height) + 100;

	// Might skip padding entirely here, significantly more overhead in padding here.
	const toPad: number[] = [];
	const padLabels = labels.some((labelset, i) => {
		// I think this will need some addtl logic to make sure we're not checking against undefined or something
		const needsPadding = labelset.length < data[i].length;
		if (needsPadding) toPad.push(i);
		return needsPadding;
	});
	if (padLabels) {
		for (const padTarget of toPad) {
			const diff = Math.abs(labels[padTarget].length - data[padTarget].length);
			fillStrings(labels[padTarget], diff);
		}
	}
	const hasLabels = labels.flat().filter((l) => l !== "").length > 0;
	const parent = makeSVGParent(height, width);

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
		else lineColor = `url('#${gradientId}')`;
	}
	//  else if (color) {
	// 	lineColor = color;
	// }

	const lineGroup = createSVGElement("g");
	const lines = [];

	const labelGroups = [];

	for (let i = 0; i < data.length; i++) {
		const lineData = data[i];
		const thick = thickness ? thickness[i % thickness.length] : 3;
		const dataPointsAmt = lineData.length;
		const offset = autoOffset(width, dataPointsAmt - (fullWidthLine ? 1 : 0));
		const nonGradientLineColor =
			colors && !isGradient ? colors[i % colors.length] : "#ffffff";
		const lineCap = cap[i % cap.length];

		// Straight line coordinates
		const coords = genCoordsStraight(lineData, offset, height);
		// Ended up only needing a first control point thanks to reflection
		// const controls = genControlPoints(coords);
		const controlPoint = genSingleControlPoint(coords[0], coords[1]);
		const currentLineType = lineType[i % lineType.length];
		let line: SVGPathElement;
		if (currentLineType === "straight") {
			line = drawLineStraight(
				coords,
				isGradient ? lineColor : nonGradientLineColor,
				thick,
				lineCap,
			);
		} else {
			line = drawLineSmooth(
				coords,
				controlPoint,
				isGradient ? lineColor : nonGradientLineColor,
				thick,
				lineCap,
			);
		}

		let linelabelGroup: SVGElement | null = null;
		if (hasLabels) {
			const theLabelColor = labelColors
				? labelColors[i % labelColors.length]
				: "#ffffff";
			// const theLabelColor = labelColors ?? "#ffffff";
			linelabelGroup = createLineLabels(
				coords,
				labels[i],
				theLabelColor,
				labelClass,
			);
		}
		if (linelabelGroup) {
			labelGroups.push(linelabelGroup);
			if (labelGroupClass) linelabelGroup.classList.add(labelGroupClass);
		}
		if (lineClass) line.classList.add(lineClass);
		lineGroup.appendChild(line);
		lines.push(line);
	}

	if (parentClass) parent.classList.add(parentClass);
	if (lineGroupClass) lineGroup.classList.add(lineGroupClass);

	if (
		isGradient &&
		gradientDef &&
		gradientBg &&
		gradientMode === "continuous"
	) {
		const [maskId, theMask] = createLinesMask(lines);
		gradientDef.appendChild(theMask);

		gradientBg.setAttribute("mask", `url('#${maskId}')`);
		parent.appendChild(gradientBg);
	}

	if (hasLabels && labelGroups.length > 0)
		labelGroups.forEach((lg) => parent.appendChild(lg));
	parent.appendChild(lineGroup);

	return parent;
}
