export const createSVGElement = (ele: string) =>
	document.createElementNS("http://www.w3.org/2000/svg", ele);

export const makeSVGParent = (height: number, width: number) => {
	const svg = createSVGElement("svg");
	svg.setAttribute("width", `${width}`);
	svg.setAttribute("height", `${height}`);
	svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
	return svg;
};
