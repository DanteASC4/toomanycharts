import { assertEquals } from "@std/assert";
import { barchart } from "../src/index.ts";

const saveIfReal = (result: SVGElement | null, name: string) => {
	if (Deno.env.get("BUILD")) return;
	if (result) {
		console.log(`%c${name}`, "color:magenta;");
		Deno.writeTextFileSync(
			`./temp/out/${name}.svg`,
			result.outerHTML.toString(),
		);
	}
};

Deno.test(function barchartTests() {
	const tbc0 = barchart({
		data: [50, 100, 30],
	});
	assertEquals(tbc0?.getAttribute("width"), "300");
	assertEquals(tbc0?.getAttribute("height"), "300");

	const tbc1 = barchart({
		data: [50, 100, 30],
		labels: ["1st", "2nd", "3rd"],
	});
	assertEquals(tbc1?.getAttribute("width"), "300");
	assertEquals(tbc1?.getAttribute("height"), "300");

	const tbc2 = barchart({
		data: [50, 100, 30],
		labels: ["1st", "2nd", "3rd"],
		placement: "top",
	});
	assertEquals(tbc2?.getAttribute("width"), "300");
	assertEquals(tbc2?.getAttribute("height"), "300");

	const tbc3 = barchart({
		data: [50, 100, 30],
		labels: ["aaa", "bbb", "ccc"],
		placement: "right",
	});
	assertEquals(tbc3?.getAttribute("width"), "300");
	assertEquals(tbc3?.getAttribute("height"), "300");

	const tbc4 = barchart({
		data: [50, 100, 30],
		labels: ["aaa", "bbb", "ccc"],
		placement: "bottom",
	});
	assertEquals(tbc4?.getAttribute("width"), "300");
	assertEquals(tbc4?.getAttribute("height"), "300");

	const tbc5 = barchart({
		data: [50, 100, 30],
		labels: ["aaa", "bbb", "ccc"],
		placement: "left",
		barWidth: 5,
	});
	assertEquals(tbc5?.getAttribute("width"), "300");
	assertEquals(tbc5?.getAttribute("height"), "300");

	const tbc6 = barchart({
		data: [50, 100, 30],
		labels: ["aaa", "bbb", "ccc"],
		placement: "top",
		height: 200,
		width: 500,
	});
	assertEquals(tbc6?.getAttribute("width"), "500");
	assertEquals(tbc6?.getAttribute("height"), "200");

	const tbc7 = barchart({
		data: [50, 100, 30],
		placement: "top",
		height: 200,
		width: 500,
	});
	assertEquals(tbc7?.getAttribute("width"), "500");
	assertEquals(tbc7?.getAttribute("height"), "200");

	saveIfReal(tbc0, "tbc0");
	saveIfReal(tbc1, "tbc1");
	saveIfReal(tbc2, "tbc2");
	saveIfReal(tbc3, "tbc3");
	saveIfReal(tbc4, "tbc4");
	saveIfReal(tbc5, "tbc5");
	saveIfReal(tbc6, "tbc6");
	saveIfReal(tbc7, "tbc7");
});
