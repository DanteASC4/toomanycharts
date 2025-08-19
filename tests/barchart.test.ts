import { assertEquals } from "@std/assert";
import { afterAll } from "@std/testing/bdd";
import { barchart } from "../src/index.ts";
import { buildGalleryPage, type SaveablePairs } from "./helpers.ts";

const pairs: SaveablePairs = [];

Deno.test(function barchartTests() {
	// Only the data
	const tbc0 = barchart({
		data: [50, 100, 30],
	});
	assertEquals(tbc0.getAttribute("width"), "300");
	assertEquals(tbc0.getAttribute("height"), "300");

	// Labels, auto-placed
	const tbc1 = barchart({
		data: [50, 100, 30],
		labels: ["1st", "2nd", "3rd"],
	});
	assertEquals(tbc1.getAttribute("width"), "300");
	assertEquals(tbc1.getAttribute("height"), "300");

	// Labels, placed on top
	const tbc2 = barchart({
		data: [50, 100, 30],
		labels: ["1st", "2nd", "3rd"],
		placement: "top",
	});
	assertEquals(tbc2.getAttribute("width"), "300");
	assertEquals(tbc2.getAttribute("height"), "300");

	// Labels, placed on right
	const tbc3 = barchart({
		data: [50, 100, 30],
		labels: ["aaa", "bbb", "ccc"],
		placement: "right",
	});
	assertEquals(tbc3.getAttribute("width"), "300");
	assertEquals(tbc3.getAttribute("height"), "300");

	// Labels, placed on bottom
	const tbc4 = barchart({
		data: [50, 100, 30],
		labels: ["aaa", "bbb", "ccc"],
		placement: "bottom",
	});
	assertEquals(tbc4.getAttribute("width"), "300");
	assertEquals(tbc4.getAttribute("height"), "300");

	// Custom bar width & placement
	const tbc5 = barchart({
		data: [50, 100, 30],
		labels: ["aaa", "bbb", "ccc"],
		placement: "left",
		barWidth: 5,
	});
	assertEquals(tbc5.getAttribute("width"), "300");
	assertEquals(tbc5.getAttribute("height"), "300");

	// Non-square with labels
	const tbc6 = barchart({
		data: [50, 100, 30],
		labels: ["aaa", "bbb", "ccc"],
		placement: "top",
		height: 200,
		width: 500,
	});
	assertEquals(tbc6.getAttribute("width"), "500");
	assertEquals(tbc6.getAttribute("height"), "200");

	// No labels, non-square, top
	const tbc7 = barchart({
		data: [50, 100, 30],
		placement: "top",
		height: 200,
		width: 500,
	});
	assertEquals(tbc7.getAttribute("width"), "500");
	assertEquals(tbc7.getAttribute("height"), "200");

	// Non-square /w custom bar width, bar class & label class,
	const tbc8 = barchart({
		data: [50, 100, 30],
		placement: "top",
		height: 200,
		width: 500,
		barClass: "mybars",
		labelClass: "mytext",
		barWidth: 10,
	});
	assertEquals(tbc8.getAttribute("width"), "500");
	assertEquals(tbc8.getAttribute("height"), "200");
	assertEquals(
		tbc8?.querySelectorAll("rect")[0].classList.contains("mybars"),
		true,
	);
	assertEquals(
		tbc8?.querySelectorAll("text")[0].classList.contains("mytext"),
		true,
	);

	// Data padding, label colors, & group classe
	const tbc9 = barchart({
		data: [50, 100],
		labels: ["a", "b", "c"],
		labelColors: ["#00ffff", "#ff00ff"],
		labelGroupClass: "mylabelgroup",
		barGroupClass: "mybargroup",
		groupClass: "mygroups",
		parentClass: "myparent",
	});
	assertEquals(tbc9.getAttribute("width"), "300");
	assertEquals(tbc9.getAttribute("height"), "300");
	assertEquals(tbc9?.querySelectorAll(".mybargroup").length, 1);
	assertEquals(tbc9?.querySelectorAll(".mylabelgroup").length, 1);
	assertEquals(tbc9?.querySelectorAll(".mygroups").length, 2);
	assertEquals(tbc9?.outerHTML.includes('class="myparent"'), true);

	pairs.push(
		[tbc0, "simplest possible"],
		[tbc1, "labels"],
		[tbc2, "on top"],
		[tbc3, "on right"],
		[tbc4, "on bottom"],
		[tbc5, "custom bar width"],
		[tbc6, "rectangular area"],
		[tbc7, "rectangular on top"],
		[tbc8, "bar & label class + more"],
		[tbc9, "label colors & data padding"],
	);
});

afterAll(() => {
	buildGalleryPage("Bar Chart", pairs);
});
