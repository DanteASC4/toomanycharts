import { makeSVGParent } from "./creating/common.ts";
import { drawLineStraight } from "./creating/linechart.ts";
import { roundUpTo100 } from "./math/common.ts";
import { autoOffset, genCoordsStraight } from "./math/linecharts.ts";
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
	lineType,
	fullWidthLine = false,
	cap = "round",
	lineClass,
	parentClass,
	thickness,
	labelClass,
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

	const dataPointsAmt = data.length;
	const parent = makeSVGParent(height, width);
	const offset = autoOffset(width, dataPointsAmt - (fullWidthLine ? 1 : 0));
	// const offset = autoOffset(dataPointsAmt);
	const coords = genCoordsStraight(data, offset, height);

	const lineColor = color ?? "#ffffff";
	const thick = thickness ?? 3;
	const line = drawLineStraight(coords, lineColor, thick, cap);
	parent.appendChild(line);

	// Logging
	console.log("---Linechart---");
	console.log("WxH", width, height);
	console.log("max", max);
	console.log("offset", offset);
	console.log("coords");
	console.log(coords);

	return parent;
}
