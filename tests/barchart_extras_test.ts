import { assertEquals } from "@std/assert";
import { barchart } from "../src/index.ts";

const saveIfReal = (result: SVGElement | null, name: string) => {
	if (Deno.env.get("BUILD")) return;
	if (result) {
		console.log(`%c${name}`, "color:magenta;");
		Deno.writeTextFileSync(
			`./temp/out/barchart/${name}.svg`,
			result.outerHTML.toString(),
		);
	}
};

Deno.test(function barChartsBiggerData() {
	const tbc1 = barchart({
		data: [50, 1000, 100],
		placement: "left",
	});

	assertEquals(tbc1?.getAttribute("width"), "300");
	assertEquals(tbc1?.getAttribute("height"), "300");

	const tbc2 = barchart({
		data: [50, 1000, 100],
		placement: "top",
	});

	assertEquals(tbc2?.getAttribute("width"), "300");
	assertEquals(tbc2?.getAttribute("height"), "300");

	saveIfReal(tbc1, "tbc1_1k");
	saveIfReal(tbc2, "tbc2_1k");
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

	const tbc4 = barchart({
		data: [250, 50, 100, 150, 100],
		placement: "top",
		gradientColors: [
			"oklch(0.7017 0.3225 328.36)",
			"oklch(0.9054 0.15455 194.769)",
		],
		gradientDirection: "top-to-bottom",
		gradientMode: "continuous",
	});

	assertEquals(tbc4?.getAttribute("width"), "300");
	assertEquals(tbc4?.getAttribute("height"), "300");

	const tbc5 = barchart({
		data: [100, 97, 110, 116, 101], // There's a secret in here...
		height: 125,
		placement: "top",
		gradientColors: ["#00ffff", "#00ffff", "#dd0547", "#dd0547"],
		gradientDirection: "top-to-bottom",
		gradientMode: "continuous",
	});

	assertEquals(tbc5?.getAttribute("width"), "300");
	assertEquals(tbc5?.getAttribute("height"), "125");

	const tbc6 = barchart({
		data: [100, 97, 110, 116, 101], // There's a secret in here...
		height: 125,
		placement: "top",
	});

	assertEquals(tbc6?.getAttribute("width"), "300");
	assertEquals(tbc6?.getAttribute("height"), "125");

	saveIfReal(tbc1, "tbc1_gradient");
	saveIfReal(tbc2, "tbc2_colors_lessthandata");
	saveIfReal(tbc3, "tbc3_gradient_oklch");
	saveIfReal(tbc4, "tbc4_gradient_continuous");
	saveIfReal(tbc5, "tbc5_gradient_logobase");
	saveIfReal(tbc6, "tbc6_logobase");
});
