import { DOMParser } from "@b-fuze/deno-dom";

const doc = new DOMParser().parseFromString("", "text/html");

export const createSVGElement = (ele: string) => {
	const cenv = Deno.env.get("MODE");
	if (cenv === "DEV") {
		return doc.createElement(ele) as unknown as SVGElement;
	}

	return document.createElementNS("http://www.w3.org/2000/svg", ele);
};

// export const createSVGElement = (ele: string) =>
// 	document.createElementNS("http://www.w3.org/2000/svg", ele);

export const makeSVGParent = (height: number, width: number) => {
	const svg = createSVGElement("svg");
	svg.setAttribute("width", `${width}`);
	svg.setAttribute("height", `${height}`);
	svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
	return svg;
};
