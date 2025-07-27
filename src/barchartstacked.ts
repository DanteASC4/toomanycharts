import type { BarChartStackedOpts } from "./types.ts";
import { BarChartDefaults } from "./utils/defaults.ts";
import { fillEmptyArray, fillStrings } from "./utils/misc.ts";

export function barchartStacked({
	data,
	labels = [],
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
