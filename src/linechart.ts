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
	lineClass,
	lineGroupClass,
	parentClass,
	labelClass,
	labelGroupClass,
	colors,
	gradientColors,
	gradientMode,
	gradientDirection,
}: LineChartOptions) {
	if (!max) max = autoMaxNumerical(data);
	if (!width) width = roundUpTo100(max) + 100;
	if (!height) height = LineChartDefaults.height;
	if (!lineType) lineType = LineChartDefaults.lineType;

	// Line chart data won't be padded, labels will be for consistency mainly.
	const padLabels = labels.length < data.length;
	if (padLabels) {
		const diff = Math.abs(labels.length - data.length);
		fillStrings(labels, diff);
	}

	const dataPointsAmt = data.length;
	// const _evenWidth =
	// 	placement === "top" || placement === "bottom"
	// 		? autoBarWidth(width, dataPointsAmt)
	// 		: autoBarWidth(height, dataPointsAmt);

	const parent = makeSVGParent(height, width);
	const offset = autoOffset(dataPointsAmt);
	const coords = genCoordsStraight(data, offset, height, width);

	const line = drawLineStraight(coords);
	parent.appendChild(line);

	return parent;
}
