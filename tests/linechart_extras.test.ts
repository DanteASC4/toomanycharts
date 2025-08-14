import { assertEquals } from "@std/assert";
import { afterAll } from "@std/testing/bdd";
import { linechart } from "../src/linechart.ts";
import { buildGalleryPage, type SaveablePairs } from "./helpers.ts";

const pairs: SaveablePairs = [];

Deno.test(function lineChartExtras() {
	const tlc0 = linechart({
		data: [50, 100, 30],
		labels: ["1", "2", "3"],
		gradientColors: ["#ff00ff", "#00ffff"],
		labelClass: "da-labels",
	});
	assertEquals(tlc0.getAttribute("width"), "300");
	assertEquals(tlc0.getAttribute("height"), "110");

	const tlc1 = linechart({
		data: [50, 100, 30],
		gradientColors: ["#ff00ff:30%", "#00ffff"],
	});
	assertEquals(tlc1.getAttribute("width"), "300");
	assertEquals(tlc1.getAttribute("height"), "110");

	const tlc2 = linechart({
		data: [50, 100, 30],
		gradientColors: ["#ff00ff:30%", "#00ffff"],
		gradientDirection: "bottom-to-top",
	});
	assertEquals(tlc2.getAttribute("width"), "300");
	assertEquals(tlc2.getAttribute("height"), "110");

	const tlc3 = linechart({
		data: [50, 100, 30],
		gradientColors: ["#ff00ff", "#00ffff"],
		gradientDirection: "bottom-to-top",
		gradientMode: "continuous",
	});
	assertEquals(tlc3.getAttribute("width"), "300");
	assertEquals(tlc3.getAttribute("height"), "110");

	const tlc4 = linechart({
		data: [50, 100, 30],
		gradientColors: ["#ff00ff", "#00ffff"],
		gradientDirection: "145",
		gradientMode: "continuous",
	});
	assertEquals(tlc4.getAttribute("width"), "300");
	assertEquals(tlc4.getAttribute("height"), "110");

	pairs.push(
		[tlc0, "basic gradient"],
		[tlc1, "gradient with stops"],
		[tlc2, "bottom to top gradient"],
		[tlc3, "continuous gradient"],
		[tlc4, "gradient custom angle"],
	);
});

Deno.test(function linechartCoverageTests() {
	// Coverage!
	const tlc0 = linechart({
		data: [50, 100, 30],
		labels: ["1", "2", "3"],
		labelColors: "red",
	});
	assertEquals(tlc0.getAttribute("width"), "300");
	assertEquals(tlc0.getAttribute("height"), "110");

	const tlc1 = linechart({
		data: [50, 500, 30],
		labels: ["1", "2", "3"],
		labelColors: ["red"],
		parentClass: "lineparent",
		lineGroupClass: "linegroup",
		lineClass: "line",
		labelGroupClass: "labels",
		cap: "butt",
		height: 300,
		lineType: "smooth",
		gradientColors: ["#ff00ff", "#00ffff"],
	});
	assertEquals(tlc1.getAttribute("width"), "600");
	assertEquals(tlc1.getAttribute("height"), "300");
});

afterAll(() => {
	buildGalleryPage("Line Chart Extras", pairs);
});
