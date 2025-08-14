import { assertEquals } from "@std/assert";
import {
	autoMaxStacked,
	lgDistTest,
	stackedToNumerical,
	sum2DArrayInPlace,
} from "../src/utils/general-operations.ts";
import { fillEmptyArray, fillStrings, fillZeros } from "../src/utils/misc.ts";

Deno.test(function sum2DTest() {
	assertEquals(
		sum2DArrayInPlace([
			[1, 2],
			[2, 3],
		]),
		[3, 5],
	);
	assertEquals(
		sum2DArrayInPlace([
			[0, 0],
			[0, 0],
		]),
		[0, 0],
	);
});

Deno.test(function fillStringHelper() {
	const inital: string[] = [];
	fillStrings(inital, 3);
	assertEquals(inital, ["", "", ""]);
});

Deno.test(function fillEmptyArrayHelper() {
	const inital: [][] = [];
	fillEmptyArray(inital, 3);
	assertEquals(inital, [[], [], []]);
});

Deno.test(function fillZeroHelper() {
	const inital: number[] = [];
	fillZeros(inital, 3);
	assertEquals(inital, [0, 0, 0]);
});

Deno.test(function linearGradientStops() {
	const test1 = 3;
	assertEquals(lgDistTest(test1), [0, 50, 100]);
});

Deno.test(function stackedArrToNumericalArr() {
	const testA1 = [
		[1, 2, 3],
		[3, 2, 1],
		[1, 2, 3],
	];
	const toNum1 = stackedToNumerical(testA1);
	assertEquals(toNum1, [6, 6, 6]);
});

Deno.test(function autoMaxStackedTest() {
	const t = [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9],
	];
	const autoMax = autoMaxStacked(t);
	assertEquals(autoMax, 20);
});
