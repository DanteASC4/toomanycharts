import type { BarChartStackedOpts } from "../types.ts";
import { createSVGElement } from "./common.ts";

const textOffset = 15;

export const createStackedBarAndText = (
	gIdx: number,
	placement: BarChartStackedOpts["placement"],
	dataPoint: number[],
	numericalDataPoint: number,
	label: string,
	gap: number,
	barWidth: number,
	evenWidth: number,
	color: string | string[],
	labelColor: string,
	{ width, height }: { width: number; height: number },
	{
		barClass,
		labelClass,
	}: Pick<BarChartStackedOpts, "groupClass" | "barClass" | "labelClass">,
) => {
	// const group = createSVGElement("g");

	let barX = 0;
	let barY = 0;
	let trueBarHeight = numericalDataPoint;
	let trueBarWidth = evenWidth;

	let textX = 0;
	let textY = 0;

	const initial = evenWidth * 2 * gIdx;
	barX = initial + gap;

	if (placement === "left") {
		const tempS = trueBarWidth;
		trueBarWidth = trueBarHeight;
		trueBarHeight = tempS;

		const tempC = barX;
		barX = barY;
		barY = tempC;

		textX = trueBarWidth + textOffset;
		textY = barY + trueBarHeight * 0.5;
	} else if (placement === "top") {
		textX = barX + trueBarWidth * 0.25;
		textY = trueBarHeight + textOffset;
	} else if (placement === "right") {
		// Width -> height
		// Datapoint -> width
		// x = containerWidth - dataPoint
		// y = x
		const tempS = trueBarWidth;
		trueBarWidth = trueBarHeight;
		trueBarHeight = tempS;

		// const tempC = barY;
		barY = barX;
		barX = width - trueBarWidth;

		textX = barX - textOffset * 2;
		textY = barY + trueBarHeight * 0.5;
	} else if (placement === "bottom") {
		barY = height - trueBarHeight;

		textX = barX + trueBarWidth * 0.25;
		textY = barY - textOffset;
	}

	if (barWidth !== evenWidth) {
		if (placement === "top" || placement === "bottom") {
			trueBarWidth = barWidth;
			barX += Math.abs(evenWidth * 0.5 - barWidth);
		} else {
			trueBarHeight = barWidth;
			barY += Math.abs(evenWidth * 0.5 - barWidth);
		}
	}

	const bars: SVGElement[] = [];
	for (let i = 0; i < dataPoint.length; i++) {
		const current = dataPoint[i];
		const offset = dataPoint.slice(0, i).reduce((c, p) => c + p, 0);

		const bar = createSVGElement("rect");
		if (typeof color === "string") {
			bar.setAttribute("fill", color);
		} else {
			const chosen = color[i % color.length];
			bar.setAttribute("fill", chosen);
		}
		// bar.setAttribute("x", `${barX}`);
		// bar.setAttribute("y", `${barY+offset}`);
		// bar.setAttribute("width", `${trueBarWidth}`);
		// bar.setAttribute("height", `${trueBarHeight}`);

		if (placement === "top" || placement === "bottom") {
			bar.setAttribute("x", `${barX}`);
			bar.setAttribute("y", `${barY + offset}`);
			bar.setAttribute("width", `${trueBarWidth}`);
			bar.setAttribute("height", `${current}`);
		} else {
			bar.setAttribute("x", `${barX + offset}`);
			bar.setAttribute("y", `${barY}`);
			bar.setAttribute("width", `${current}`);
			bar.setAttribute("height", `${trueBarHeight}`);
		}

		// bar.setAttribute("title", `Bar value of ${dataPoint}`);
		if (barClass) bar.classList.add(barClass);

		bars.push(bar);
	}

	const text = createSVGElement("text");
	text.setAttribute("fill", labelColor);
	// if (typeof color === "string") {
	// 	text.setAttribute("fill", color);
	// } else {
	// 	text.setAttribute("fill", color[0]);
	// }
	text.setAttribute("x", `${textX}`);
	text.setAttribute("y", `${textY}`);
	text.setAttribute("title", `Bar label ${label}`);
	text.textContent = label;
	if (labelClass) text.classList.add(labelClass);

	// group.appendChild(bar);
	// group.appendChild(text);
	// if (groupClass) group.classList.add(groupClass);

	return [bars, text] as const;
};
