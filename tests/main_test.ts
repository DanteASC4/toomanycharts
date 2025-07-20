import { assertEquals } from "@std/assert";
import { barchart } from "../src/main.ts";

Deno.test(function barchartTests() {
	const tbc1 = barchart({
		data: [50, 100, 30],
		labels: ["aaa", "bbb", "ccc"],
	});
	if (tbc1) {
		console.log("%cTBC1", "color:magenta;");
		Deno.writeTextFileSync("./temp/out/testbc1.svg", tbc1.outerHTML);
	}

	const tbc2 = barchart({
		data: [50, 100, 30],
		labels: ["aaa", "bbb", "ccc"],
		placement: "top",
	});
	if (tbc2) {
		console.log("%cTBC2", "color:magenta;");
		Deno.writeTextFileSync("./temp/out/testbc2.svg", tbc2.outerHTML);
	}

	const tbc3 = barchart({
		data: [50, 100, 30],
		labels: ["aaa", "bbb", "ccc"],
		placement: "right",
	});
	if (tbc3) {
		console.log("%cTBC3", "color:magenta;");
		Deno.writeTextFileSync("./temp/out/testbc3.svg", tbc3.outerHTML);
	}

	const tbc4 = barchart({
		data: [50, 100, 30],
		labels: ["aaa", "bbb", "ccc"],
		placement: "bottom",
	});
	if (tbc4) {
		console.log("%cTBC4", "color:magenta;");
		Deno.writeTextFileSync("./temp/out/testbc4.svg", tbc4.outerHTML);
	}

	const tbc5 = barchart({
		data: [50, 100, 30],
		labels: ["aaa", "bbb", "ccc"],
		placement: "left",
		barWidth: 5,
	});
	if (tbc5) {
		console.log("%cTBC5", "color:magenta;");
		Deno.writeTextFileSync("./temp/out/testbc5.svg", tbc5.outerHTML);
	}

	const tbc6 = barchart({
		data: [50, 100, 30],
		labels: ["aaa", "bbb", "ccc"],
		placement: "top",
		height: 200,
		width: 500,
	});
	if (tbc6) {
		console.log("%cTBC6", "color:magenta;");
		Deno.writeTextFileSync("./temp/out/testbc6.svg", tbc6.outerHTML);
	}

	const tbc7 = barchart({
		data: [50, 100, 30],
		placement: "top",
		height: 200,
		width: 500,
	});
	if (tbc7) {
		console.log("%cTBC7", "color:magenta;");
		Deno.writeTextFileSync("./temp/out/testbc7.svg", tbc7.outerHTML);
	}

	assertEquals(1, 1);
});
