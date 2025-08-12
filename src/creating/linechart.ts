import { createSVGElement } from "./common.ts";
import { chunk } from "@std/collections/chunk";

export const drawLineStraight = (
	coords: [number, number][],
	color: string,
	thickness: number,
	linecap: string,
) => {
	const path = createSVGElement("path");

	let drawString = `M 0,${coords[0][1]}`;
	// let drawString = "M 0,0";
	// let drawString = `M 0, ${fullWidth ? coords[0][1] : 0}`;
	drawString += "\n  L";

	for (let i = 0; i < coords.length; i++) {
		const coord = coords[i];
		drawString += `  ${coord[0]},${coord[1]}`;
		if (i !== coords.length - 1) drawString += "\n";
	}

	path.setAttribute("d", drawString);
	path.setAttribute("fill", "none");
	path.setAttribute("stroke", color);
	// NOTE React doesn't like two-word attributes
	path.setAttribute("stroke-width", `${thickness}`);
	path.setAttribute("stroke-linecap", linecap);
	return path;
};

export const drawLineSmooth = (
	coords: [number, number][],
	controls: [number, number][],
	color: string,
	thickness: number,
	linecap: string,
) => {
	const path = createSVGElement("path");

	let drawString = ``;

	const pairs = chunk(coords, 2);
	drawString += `M 0,${coords[0][1]} `;

	let hasQ = false;

	for (let i = 0; i < coords.length; i++) {
		const [x, y] = coords[i];
		if (!hasQ) {
			drawString += `Q ${x},${y} ${controls[0][0]},${controls[0][1]} \nt `;
			hasQ = true;
		} else {
			drawString += `${x},${y} `;
		}
	}
	// let i =0;
	// for(const pair of pairs){
	//   const control = controls[i];
	//
	//
	//   i++;
	// }

	path.setAttribute("d", drawString);
	path.setAttribute("fill", "none");
	path.setAttribute("stroke", color);
	// NOTE React doesn't like two-word attributes
	path.setAttribute("stroke-width", `${thickness}`);
	path.setAttribute("stroke-linecap", linecap);
	return path;
};

export const createLineLabels = (
	coords: [number, number][],
	labels: string[],
	labelColor: string,
	labelClass?: string,
) => {
	const lg = createSVGElement("g");

	console.log(labels);

	for (let i = 0; i < labels.length; i++) {
		const coord = coords[i];
		const label = labels[i];
		const text = createSVGElement("text");
		const [x, y] = coord;

		console.log("label", label);
		console.log("x", x, "y", y);

		text.setAttribute("fill", labelColor);
		text.setAttribute("x", `${x - label.length}`);
		text.setAttribute("y", `${y - 10}`);
		text.setAttribute("title", `Bar label ${label}`);
		text.textContent = label;
		if (labelClass) text.classList.add(labelClass);
		lg.appendChild(text);
	}

	return lg;
};
