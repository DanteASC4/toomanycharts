import { createSVGElement } from "./common.ts";

export const createNumericalVerticalGroup = (
	gIdx: number,
	dataPoint: number,
	label: string,
	gap: number,
	barWidth: number,
	color: string,
) => {
	const group = createSVGElement("g");
	const text = createSVGElement("text");
	const bar = createSVGElement("rect");

	const barX = 0;
	const barY = gIdx * barWidth + gap;

	const trueBarHeight = barWidth;
	const trueBarWidth = dataPoint;

	bar.setAttribute("fill", color);
	bar.setAttribute("x", `${barX}`);
	bar.setAttribute("y", `${barY}`);
	bar.setAttribute("width", `${trueBarWidth}`);
	bar.setAttribute("height", `${trueBarHeight}`);

	const textX = trueBarWidth + 10;
	const textY = barY + trueBarHeight / 2;

	text.setAttribute("fill", color);
	text.setAttribute("x", `${textX}`);
	text.setAttribute("y", `${textY}`);
	text.textContent = label;

	group.appendChild(bar);
	group.appendChild(text);

	return group;
};
