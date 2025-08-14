import { assertEquals } from "@std/assert";
import { asPercent, distP, roundTo } from "../src/math/common.ts";

Deno.test(function miscMathTests() {
	const asP0 = asPercent(50, 100);
	assertEquals(asP0, 50);

	const asP1 = asPercent(50, 200);
	assertEquals(asP1, 25);

	const distCheck = distP(2, 5, 9, 13);
	assertEquals(distCheck, 10.63014581273465);

	const roundDown = roundTo(51, 10, "down");
	assertEquals(roundDown, 50);
});
