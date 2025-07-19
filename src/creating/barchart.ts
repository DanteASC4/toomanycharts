import type { BarChartNumericalOpts } from "../types.ts";
import { createSVGElement } from "./common.ts";

export const createNumericalVerticalGroup = (
	gIdx: number,
	placement: "top" | "bottom",
	dataPoint: number,
	label: string,
	gap: number,
	barWidth: number,
	color: string,
	{
		groupClass,
		barClass,
		textClass,
	}: Pick<BarChartNumericalOpts, "groupClass" | "barClass" | "textClass">,
) => {
	const group = createSVGElement("g");
	const text = createSVGElement("text");
	const bar = createSVGElement("rect");

	const barX = 0;

	let barY = 0;
	if (placement === "bottom") {
		const offY = gIdx * gap + gap * 0.5;
		barY = gIdx * barWidth + offY;
	} else {
		const offY = gIdx * gap + gap * 0.5;
		barY = gIdx * barWidth - offY;
	}

	const trueBarHeight = barWidth;
	const trueBarWidth = dataPoint;

	bar.setAttribute("fill", color);
	bar.setAttribute("x", `${barX}`);
	bar.setAttribute("y", `${barY}`);
	bar.setAttribute("width", `${trueBarWidth}`);
	bar.setAttribute("height", `${trueBarHeight}`);
	bar.setAttribute("title", `Bar value of ${trueBarWidth}`);
	if (barClass) bar.classList.add(barClass);

	const textX = trueBarWidth + 10;

	let textY = 0;

	if (placement === "bottom") textY = barY + trueBarHeight / 2;
	else textY = barY - trueBarHeight / 2;

	text.setAttribute("fill", color);
	text.setAttribute("x", `${textX}`);
	text.setAttribute("y", `${textY}`);
	text.setAttribute("title", `Bar label ${label}`);
	text.textContent = label;
	if (textClass) text.classList.add(textClass);

	group.appendChild(bar);
	group.appendChild(text);
	if (groupClass) group.classList.add(groupClass);

	return group;
};

export const createNumericalHorizontalGroup = (
	gIdx: number,
	placement: "left" | "right",
	dataPoint: number,
	label: string,
	gap: number,
	barWidth: number,
	color: string,
	height: number,
	{
		groupClass,
		barClass,
		textClass,
	}: Pick<BarChartNumericalOpts, "groupClass" | "barClass" | "textClass">,
) => {
	const group = createSVGElement("g");
	const text = createSVGElement("text");
	const bar = createSVGElement("rect");

	const offX = gIdx * gap + gap * 0.5;

	let barX = 0;
	if (placement === "left") {
		barX = gIdx * barWidth + offX;
	} else {
		barX = gIdx * barWidth - offX;
	}
	const barY = height - dataPoint;

	const trueBarHeight = dataPoint;
	const trueBarWidth = barWidth;

	bar.setAttribute("fill", color);
	bar.setAttribute("x", `${barX}`);
	bar.setAttribute("y", `${barY}`);
	bar.setAttribute("width", `${trueBarWidth}`);
	bar.setAttribute("height", `${trueBarHeight}`);
	bar.setAttribute("title", `Bar value of ${trueBarHeight}`);
	if (barClass) bar.classList.add(barClass);

	const textX = barX + trueBarWidth / 2;
	const textY = barY - 10;

	text.setAttribute("fill", color);
	text.setAttribute("x", `${textX}`);
	text.setAttribute("y", `${textY}`);
	text.setAttribute("title", `Bar label ${label}`);
	text.textContent = label;
	if (textClass) text.classList.add(textClass);

	group.appendChild(bar);
	group.appendChild(text);
	if (groupClass) group.classList.add(groupClass);

	return group;
};
