import { createSVGElement } from "./common.ts";

export const drawLineStraight = (coords: [number, number][]) => {
	const path = createSVGElement("path");

	let drawString = "M 0,0";
	drawString += "\n  L";

	for (let i = 0; i < coords.length; i++) {
		const coord = coords[i];
		drawString += `  ${coord[0]},${coord[1]}`;
		if (i !== coords.length - 1) drawString += "\n";
	}

	path.setAttribute("d", drawString);
	path.setAttribute("fill", "none");
	path.setAttribute("stroke", "white");
	return path;
};
