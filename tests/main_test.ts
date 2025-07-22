import { assertEquals } from "@std/assert";
import { barchart } from "../src/main.ts";

const saveIfReal = (result: SVGElement | null, name: string) => {
	if (result) {
		console.log(`%c${name}`, "color:magenta;");
		Deno.writeTextFileSync(`./temp/out/${name}.svg`, result.outerHTML);
	}
};

Deno.test(function barchartTests() {
	const tbc1 = barchart({
		data: [50, 100, 30],
		labels: ["aaa", "bbb", "ccc"],
	});

	const tbc2 = barchart({
		data: [50, 100, 30],
		labels: ["aaa", "bbb", "ccc"],
		placement: "top",
	});

	const tbc3 = barchart({
		data: [50, 100, 30],
		labels: ["aaa", "bbb", "ccc"],
		placement: "right",
	});

	const tbc4 = barchart({
		data: [50, 100, 30],
		labels: ["aaa", "bbb", "ccc"],
		placement: "bottom",
	});

	const tbc5 = barchart({
		data: [50, 100, 30],
		labels: ["aaa", "bbb", "ccc"],
		placement: "left",
		barWidth: 5,
	});

	const tbc6 = barchart({
		data: [50, 100, 30],
		labels: ["aaa", "bbb", "ccc"],
		placement: "top",
		height: 200,
		width: 500,
	});

	const tbc7 = barchart({
		data: [50, 100, 30],
		placement: "top",
		height: 200,
		width: 500,
	});

	saveIfReal(tbc1, "tbc1");
	saveIfReal(tbc2, "tbc2");
	saveIfReal(tbc3, "tbc3");
	saveIfReal(tbc4, "tbc4");
	saveIfReal(tbc5, "tbc5");
	saveIfReal(tbc6, "tbc6");
	saveIfReal(tbc7, "tbc7");

	assertEquals(1, 1);
});

Deno.test(function barChartsColored() {
	const tbc1 = barchart({
		data: [100, 100, 100],
		placement: "left",
		gradientColors: ["#ff00ff", "#00ffff"],
		gradientDirection: "left-to-right",
		width: 110,
		height: 110,
	});

	assertEquals(tbc1?.getAttribute("width"), "110");
	assertEquals(tbc1?.getAttribute("height"), "110");

	const tbc2 = barchart({
		data: [100, 50, 100],
		placement: "top",
		colors: ["#ff00ff", "#00ffff"],
	});

	assertEquals(tbc2?.getAttribute("width"), "300");
	assertEquals(tbc2?.getAttribute("height"), "300");

	const tbc3 = barchart({
		data: [100, 50, 100],
		placement: "top",
		gradientColors: [
			"oklch(0.7017 0.3225 328.36)",
			"oklch(0.9054 0.15455 194.769)",
		],
		gradientDirection: "top-to-bottom",
	});

	assertEquals(tbc3?.getAttribute("width"), "300");
	assertEquals(tbc3?.getAttribute("height"), "300");

	saveIfReal(tbc1, "tbc1_gradient");
	saveIfReal(tbc2, "tbc2_colors_lessthandata");
	saveIfReal(tbc3, "tbc3_gradient_oklch");
});
