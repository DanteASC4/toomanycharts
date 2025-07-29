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

Deno.test(function barchartTests() {
	// Only the data
	const tbc0 = barchart({
		data: [50, 100, 30],
	});
	assertEquals(tbc0?.getAttribute("width"), "300");
	assertEquals(tbc0?.getAttribute("height"), "300");

	// Labels, auto-placed
	const tbc1 = barchart({
		data: [50, 100, 30],
		labels: ["1st", "2nd", "3rd"],
	});
	assertEquals(tbc1?.getAttribute("width"), "300");
	assertEquals(tbc1?.getAttribute("height"), "300");

	// Labels, placed on top
	const tbc2 = barchart({
		data: [50, 100, 30],
		labels: ["1st", "2nd", "3rd"],
		placement: "top",
	});
	assertEquals(tbc2?.getAttribute("width"), "300");
	assertEquals(tbc2?.getAttribute("height"), "300");

	// Labels, placed on right
	const tbc3 = barchart({
		data: [50, 100, 30],
		labels: ["aaa", "bbb", "ccc"],
		placement: "right",
	});
	assertEquals(tbc3?.getAttribute("width"), "300");
	assertEquals(tbc3?.getAttribute("height"), "300");

	// Labels, placed on bottom
	const tbc4 = barchart({
		data: [50, 100, 30],
		labels: ["aaa", "bbb", "ccc"],
		placement: "bottom",
	});
	assertEquals(tbc4?.getAttribute("width"), "300");
	assertEquals(tbc4?.getAttribute("height"), "300");

	// Custom bar width & placement
	const tbc5 = barchart({
		data: [50, 100, 30],
		labels: ["aaa", "bbb", "ccc"],
		placement: "left",
		barWidth: 5,
	});
	assertEquals(tbc5?.getAttribute("width"), "300");
	assertEquals(tbc5?.getAttribute("height"), "300");

	// Non-square with labels
	const tbc6 = barchart({
		data: [50, 100, 30],
		labels: ["aaa", "bbb", "ccc"],
		placement: "top",
		height: 200,
		width: 500,
	});
	assertEquals(tbc6?.getAttribute("width"), "500");
	assertEquals(tbc6?.getAttribute("height"), "200");

	// No labels, non-square, top
	const tbc7 = barchart({
		data: [50, 100, 30],
		placement: "top",
		height: 200,
		width: 500,
	});
	assertEquals(tbc7?.getAttribute("width"), "500");
	assertEquals(tbc7?.getAttribute("height"), "200");

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
	assertEquals(tbc8?.getAttribute("width"), "500");
	assertEquals(tbc8?.getAttribute("height"), "200");
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
	console.log(tbc9.outerHTML);
	assertEquals(tbc9?.getAttribute("width"), "300");
	assertEquals(tbc9?.getAttribute("height"), "300");
	assertEquals(tbc9?.querySelectorAll(".mybargroup").length, 1);
	assertEquals(tbc9?.querySelectorAll(".mylabelgroup").length, 1);
	assertEquals(tbc9?.querySelectorAll(".mygroups").length, 2);
	assertEquals(tbc9?.outerHTML.includes('class="myparent"'), true);

	saveIfReal(tbc0, "tbc0");
	saveIfReal(tbc1, "tbc1");
	saveIfReal(tbc2, "tbc2");
	saveIfReal(tbc3, "tbc3");
	saveIfReal(tbc4, "tbc4");
	saveIfReal(tbc5, "tbc5");
	saveIfReal(tbc6, "tbc6");
	saveIfReal(tbc7, "tbc7");
	saveIfReal(tbc8, "tbc8");
});
