import { assertEquals } from "@std/assert";
import { barchartStacked } from "../src/barchartstacked.ts";
import { saveIfReal } from "./helpers.ts";

/*
 * Mostly just for examples & tinkering
 */
Deno.test(function barchartStackedExtraTests() {
	const tbcs0 = barchartStacked({
		data: [
			[50, 100, 30],
			[10, 10, 10],
			[100, 150, 50],
		],
	});
	assertEquals(tbcs0?.getAttribute("width"), "300");
	assertEquals(tbcs0?.getAttribute("height"), "300");

	const tbcs1 = barchartStacked({
		data: [[50, 100, 30], [100], [100, 150, 50]],
	});
	assertEquals(tbcs1?.getAttribute("width"), "300");
	assertEquals(tbcs1?.getAttribute("height"), "300");

	const tbcs2 = barchartStacked({
		data: [
			[50, 100, 30],
			[100, 15, 30],
			[100, 50, 50],
		],
		labels: ["foo", "bar", "baz"],
	});
	assertEquals(tbcs2?.getAttribute("width"), "300");
	assertEquals(tbcs2?.getAttribute("height"), "300");

	const tbcs3 = barchartStacked({
		data: [
			[50, 100, 30],
			[100, 15, 30],
			[100, 50, 50],
		],
		colors: ["#ff00ff", "#00ffff", "#dd0547"],
	});
	assertEquals(tbcs3?.getAttribute("width"), "300");
	assertEquals(tbcs3?.getAttribute("height"), "300");

	const tbcs4 = barchartStacked({
		data: [
			[50, 100, 130],
			[100, 100, 50],
			[100, 50, 100],
		],
		gradientColors: ["#ff00ff", "#00ffff", "#dd0547"],
		gradientDirection: "top-to-bottom",
	});
	assertEquals(tbcs4?.getAttribute("width"), "300");
	assertEquals(tbcs4?.getAttribute("height"), "300");

	const tbcs5 = barchartStacked({
		data: [
			[50, 100, 130],
			[100, 100, 50],
			[100, 50, 100],
		],
		gradientColors: ["#ff00ff", "#00ffff", "#dd0547"],
		gradientDirection: "top-to-bottom",
		gradientMode: "continuous",
		barClass: "mybars",
	});
	assertEquals(tbcs5?.getAttribute("width"), "300");
	assertEquals(tbcs5?.getAttribute("height"), "300");

	saveIfReal(tbcs0, "barchartstacked_extras", "ex_tbcs0");
	saveIfReal(tbcs1, "barchartstacked_extras", "ex_tbcs1_different_groupsizes");
	saveIfReal(tbcs2, "barchartstacked_extras", "ex_tbcs2_withlabels");
	saveIfReal(tbcs3, "barchartstacked_extras", "ex_tbcs3_withcolors");
	saveIfReal(tbcs4, "barchartstacked_extras", "ex_tbcs4_gradient");
	saveIfReal(tbcs5, "barchartstacked_extras", "ex_tbcs5_continuousgradient");
});
