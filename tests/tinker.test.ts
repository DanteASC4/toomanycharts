import { assertEquals } from "@std/assert";
import { afterAll } from "@std/testing/bdd";
import { barchart } from "../src/index.ts";
import { linechart } from "../src/linechart.ts";
import { buildGalleryPage, type SaveablePairs } from "./helpers.ts";

const pairs: SaveablePairs = [];

Deno.test(function miscTests() {
	const t0 = barchart({
		data: [50, 100, 30, 10],
	});
	assertEquals(typeof t0.outerHTML, "string");
	pairs.push([t0]);

	const t1 = linechart({
		data: [301, 100, 30, 10],
	});
	assertEquals(typeof t1.outerHTML, "string");
	pairs.push([t1]);

  const t2 = linechart({
		data: [100, 0, 0, -50, 0, 0, 100],
	});
	assertEquals(typeof t2.outerHTML, "string");
	pairs.push([t2]);

	const _t3 = barchart({
		data: [100, 50, 100],
		placement: "top",
		gradientColors: [
			"oklch(0.7017 0.3225 328.36)",
			"oklch(0.9054 0.15455 194.769)",
		],
		gradientDirection: "top-to-bottom",
	});
	// pairs.push([t0]);
});

afterAll(() => {
	buildGalleryPage("Tinker", pairs);
});
