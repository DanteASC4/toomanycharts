import { assertEquals } from "@std/assert";
import { afterAll } from "@std/testing/bdd";
import { barchartStacked } from "../src/barchartstacked.ts";
import {
	buildGalleryPage,
	randomStackedDataArray,
	randShortString,
	type SaveablePairs,
} from "./helpers.ts";

const pairs: SaveablePairs = [];

/*
 * rsd = random stacked data
 * tbcs = test bar chart stacked
 */
Deno.test(function barchartStackedTests() {
	const tbcs0 = barchartStacked({
		data: [
			[50, 100, 30],
			[30, 100, 50],
			[30, 50, 100],
		],
	});
	assertEquals(tbcs0.getAttribute("width"), "300");
	assertEquals(tbcs0.getAttribute("height"), "300");

	// With labels
	const rsd1 = randomStackedDataArray();
	const tbcs1 = barchartStacked({
		data: rsd1.dataArray,
		labels: new Array(rsd1.dataArray.length).fill(randShortString()),
	});
	assertEquals(tbcs1.querySelectorAll("rect").length, rsd1.totalDatapoints);
	assertEquals(tbcs1.getAttribute("width"), "300");
	assertEquals(tbcs1.getAttribute("height"), "300");

	// With labels & placement,
	const rsd2 = randomStackedDataArray();
	const tbcs2 = barchartStacked({
		data: rsd2.dataArray,
		labels: new Array(rsd2.dataArray.length).fill(randShortString()),
		placement: "top",
	});
	assertEquals(tbcs2.querySelectorAll("rect").length, rsd2.totalDatapoints);
	assertEquals(tbcs2.getAttribute("width"), "300");
	assertEquals(tbcs2.getAttribute("height"), "300");

	const rsd3 = randomStackedDataArray();
	const tbcs3 = barchartStacked({
		data: rsd3.dataArray,
		labels: new Array(rsd3.dataArray.length).fill(randShortString()),
		placement: "left",
	});
	assertEquals(tbcs3.querySelectorAll("rect").length, rsd3.totalDatapoints);
	assertEquals(tbcs3.getAttribute("width"), "300");
	assertEquals(tbcs3.getAttribute("height"), "300");

	const rsd4 = randomStackedDataArray();
	const tbcs4 = barchartStacked({
		data: rsd4.dataArray,
		labels: new Array(rsd4.dataArray.length).fill(randShortString()),
		placement: "right",
	});
	assertEquals(tbcs4.querySelectorAll("rect").length, rsd4.totalDatapoints);
	assertEquals(tbcs4.getAttribute("width"), "300");
	assertEquals(tbcs4.getAttribute("height"), "300");

	// Test for data padding
	const tbcs5 = barchartStacked({
		data: [
			[50, 100, 30],
			[30, 100, 50],
		],
		labels: ["a", "b", "c"],
		placement: "top",
	});
	assertEquals(tbcs5.querySelectorAll("rect").length, 6);
	assertEquals(tbcs5.getAttribute("width"), "300");
	assertEquals(tbcs5.getAttribute("height"), "300");

	// Test gap
	const rsd6 = randomStackedDataArray();
	const tbcs6 = barchartStacked({
		data: rsd6.dataArray,
		labels: new Array(rsd6.dataArray.length).fill(randShortString()),
		placement: "top",
		gap: 3,
	});
	assertEquals(tbcs6.querySelectorAll("rect").length, rsd6.totalDatapoints);
	assertEquals(tbcs6.getAttribute("width"), "300");
	assertEquals(tbcs6.getAttribute("height"), "300");

	// Test gradient + label colors & non-square
	const rsd7 = randomStackedDataArray();
	const tbcs7 = barchartStacked({
		data: rsd7.dataArray,
		labels: new Array(rsd7.dataArray.length).fill(randShortString()),
		placement: "top",
		height: 350,
		width: 500,
		gradientColors: ["#ff00ff", "#00ffff"],
		labelColors: ["#ff00ff", "#00ffff"],
	});
	assertEquals(tbcs7.querySelectorAll("rect").length, rsd7.totalDatapoints);
	assertEquals(tbcs7.getAttribute("width"), "500");
	assertEquals(tbcs7.getAttribute("height"), "350");

	// Test gradient continuous, gradientdir, & non-square
	const rsd8 = randomStackedDataArray();
	const tbcs8 = barchartStacked({
		data: rsd8.dataArray,
		labels: new Array(rsd8.dataArray.length).fill(randShortString()),
		placement: "top",
		height: 350,
		width: 500,
		gradientColors: ["#ff00ff", "#00ffff"],
		gradientDirection: "right-to-left",
		gradientMode: "continuous",
	});
	// This has double the rects + 2 due to the masking
	assertEquals(
		tbcs8.querySelectorAll("rect").length,
		rsd8.totalDatapoints * 2 + 2,
	);
	assertEquals(tbcs8.getAttribute("width"), "500");
	assertEquals(tbcs8.getAttribute("height"), "350");

	// Test all classes & normal coloring
	const rsd9 = randomStackedDataArray();
	const tbcs9 = barchartStacked({
		data: rsd9.dataArray,
		labels: new Array(rsd9.dataArray.length).fill(randShortString()),
		placement: "top",
		barClass: "mybars",
		barGroupClass: "mybargroup",
		labelClass: "mylabels",
		labelGroupClass: "mylabelgroup",
		groupClass: "mygroup",
		parentClass: "myparent",
		colors: ["#ff00ff", "#00ffff"],
	});
	assertEquals(tbcs9.getAttribute("width"), "300");
	assertEquals(tbcs9.getAttribute("height"), "300");
	assertEquals(tbcs9.querySelectorAll(".mybars").length, rsd9.totalDatapoints);
	assertEquals(tbcs9.querySelectorAll(".mybargroup").length, 1);
	assertEquals(
		tbcs9.querySelectorAll(".mylabels").length,
		rsd9.dataArray.length,
	);
	assertEquals(tbcs9.querySelectorAll(".mylabelgroup").length, 1);
	assertEquals(tbcs9.querySelectorAll(".mygroup").length, 2);
	// Since the parent class gets added to the outerHTML querySelectorAll doesn't pick it up as it only targets descendents.
	// assertEquals(tbcs9.querySelectorAll(".myparent").length, 1);
	assertEquals(tbcs9.outerHTML.includes('class="myparent"'), true);

	// Bar width & top placement
	const rsd10 = randomStackedDataArray();
	const tbcs10 = barchartStacked({
		data: rsd10.dataArray,
		labels: new Array(rsd10.dataArray.length).fill(randShortString()),
		barWidth: 2,
		placement: "top",
	});
	assertEquals(tbcs10.querySelectorAll("rect").length, rsd10.totalDatapoints);
	assertEquals(tbcs10.getAttribute("width"), "300");
	assertEquals(tbcs10.getAttribute("height"), "300");

	const rsd11 = randomStackedDataArray();
	const tbcs11 = barchartStacked({
		data: rsd11.dataArray,
		labels: new Array(rsd11.dataArray.length).fill(randShortString()),
		barWidth: 2,
		placement: "left",
	});
	assertEquals(tbcs11.querySelectorAll("rect").length, rsd11.totalDatapoints);
	assertEquals(tbcs11.getAttribute("width"), "300");
	assertEquals(tbcs11.getAttribute("height"), "300");

	pairs.push(
		[tbcs0, "basic"],
		[tbcs1, "labels"],
		[tbcs2, "labels on top"],
		[tbcs3, "labels on left"],
		[tbcs4, "labels on right"],
		[tbcs5, "data padding"],
		[tbcs6, "gap"],
		[tbcs7, "gradient rectangle area"],
	);
});

afterAll(() => {
	buildGalleryPage("Bar Chart Stacked", pairs);
});
