import { assertEquals } from "@std/assert";
import { afterAll } from "@std/testing/bdd";
import { linechart } from "../src/linechart.ts";
import { buildGalleryPage, type SaveablePairs } from "./helpers.ts";
import { genControlPoints } from "../src/math/linecharts.ts";

const pairs: SaveablePairs = [];

Deno.test(function miscTest() {
	const getControlPoints = genControlPoints([
		[5, 5],
		[10, 10],
		[12, 12],
	]);
	assertEquals(getControlPoints, [
		[4.5, 4.5],
		[14, 14],
	]);
});

Deno.test(function lineChartBasics() {
	const tlc0 = linechart({
		data: [50, 100, 30],
	});
	assertEquals(tlc0.getAttribute("width"), "300");
	assertEquals(tlc0.getAttribute("height"), "110");

	const tlc1 = linechart({
		data: [10, 20, 10, 20, 10, 20, 50, 100],
	});
	assertEquals(tlc1.getAttribute("width"), "300");
	assertEquals(tlc1.getAttribute("height"), "110");

	const tlc2 = linechart({
		data: [10, 20, 10, 20, 10, 20, 50, 100],
		fullWidthLine: true,
	});
	assertEquals(tlc2.getAttribute("width"), "300");
	assertEquals(tlc2.getAttribute("height"), "110");

	const tlc3 = linechart({
		data: [50, 100, 30],
		colors: "red",
	});
	assertEquals(tlc3.getAttribute("width"), "300");
	assertEquals(tlc3.getAttribute("height"), "110");

	const tlc4 = linechart({
		data: [50, 100, 30],
		colors: "red",
		thickness: 5,
	});
	assertEquals(tlc4.getAttribute("width"), "300");
	assertEquals(tlc4.getAttribute("height"), "110");

	const tlc5 = linechart({
		data: [50, 100, 30],
		labels: ["50", "100", "30"],
		colors: "red",
		thickness: 5,
	});
	assertEquals(tlc5.getAttribute("width"), "300");
	assertEquals(tlc5.getAttribute("height"), "110");

	const tlc6 = linechart({
		data: [50, 100, 30],
		labels: ["50", "100", "30"],
		colors: "red",
		thickness: 5,
		lineType: "smooth",
	});
	assertEquals(tlc6.getAttribute("width"), "300");
	assertEquals(tlc6.getAttribute("height"), "110");

	pairs.push(
		[tlc0, "basic"],
		[tlc1, "bunch of points"],
		[tlc2, "fullwidth line"],
		[tlc3, "colored line"],
		[tlc4, "thicker colored line"],
		[tlc5, "with labels"],
		[tlc6, "smooth"],
	);
});

Deno.test(function lineChartExamples() {
	const ex1 = linechart({
		data: [50, 100, 30],
		colors: "red",
		thickness: 10,
		// lineType: "smooth",
	});
	assertEquals(ex1.getAttribute("width"), "300");

	const ex2 = linechart({
		data: [50, 100, 30],
		colors: "red",
		thickness: 10,
		lineType: "smooth",
	});
	assertEquals(ex2.getAttribute("width"), "300");

	const ex3 = linechart({
		data: [50, 100, 30],
		thickness: 10,
		lineType: "smooth",
		gradientColors: ["#ff00ff", "#00ffff"],
	});
	assertEquals(ex3.getAttribute("width"), "300");

	const ex4 = linechart({
		data: [50, 100, 30],
		thickness: 10,
		lineType: "smooth",
		gradientColors: ["#ff00ff", "#00ffff"],
		gradientDirection: "top-to-bottom",
	});
	assertEquals(ex4.getAttribute("width"), "300");

	pairs.push([ex1], [ex2], [ex3], [ex4]);
});

afterAll(() => {
	buildGalleryPage("Line Chart", pairs);
});
