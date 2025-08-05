import { assertEquals } from "@std/assert";
import { linechart } from "../src/linechart.ts";
import { saveIfReal } from "./helpers.ts";

Deno.test(function lineChartExtras() {
	const tlc0 = linechart({
		data: [50, 100, 30],
	});
	// const offset = autoOffset(3);
	// const values = [50, 100, 30];
	// const result = genCoordsStraight(values, offset, 300);
	// console.group("Test");
	// console.log(offset);
	// console.log(values);
	// console.log(result);
	// console.groupEnd();
	assertEquals(1, 1);

	saveIfReal(tlc0, "linechart_extras", "tlc0");
});
