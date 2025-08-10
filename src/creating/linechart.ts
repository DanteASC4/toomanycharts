import { createSVGElement } from "./common.ts";

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
