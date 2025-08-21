import { barchartStacked } from "../src/barchartstacked.ts";
import { barchart } from "../src/index.ts";
import { linechart } from "../src/linechart.ts";
import { randomDataArray, randomStackedDataArray } from "./helpers.ts";

Deno.bench(function test1kRandomBarCharts() {
	for (let i = 0; i < 1_000; i++) {
		const rd = randomDataArray();
		barchart({
			data: rd,
		});
	}
});

Deno.bench(function test1kRandomStackedBarCharts() {
	for (let i = 0; i < 1_000; i++) {
		const rd = randomStackedDataArray();
		barchartStacked({
			data: rd.dataArray,
		});
	}
});

Deno.bench(function test1kRandomSingleLineCharts() {
	for (let i = 0; i < 1_000; i++) {
		const rd = randomDataArray();
		linechart({
			data: rd,
		});
	}
});

Deno.bench(function test1kRandomMultiLineCharts() {
	for (let i = 0; i < 1_000; i++) {
		const rd = randomStackedDataArray();
		linechart({
			data: rd.dataArray,
		});
	}
});
