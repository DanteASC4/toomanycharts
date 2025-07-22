import type { LinearGradientDirection, LinearGradientType } from "../types.ts";
import { randId } from "../utils/misc.ts";
import { createSVGElement } from "./common.ts";

// const cont = createSVGElement("svg");
// cont.setAttribute("xmlns", "http://www.w3.org/2000/svg");
// cont.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
//  if(addHidingStyles) {
//    cont.setAttribute('style','position:absolute;opacity:0;z-index')
//  }

export const createLinearGradient = (
	colors: string[],
	gDir: LinearGradientDirection = "left-to-right",
	gMode: LinearGradientType,
) => {
	const defs = createSVGElement("defs");
	const lg = createSVGElement("linearGradient");
	const gid = randId();
	lg.id = gid;

	const dist = 1 / (colors.length - 1);

	for (let i = 0; i < colors.length; i++) {
		const stop = createSVGElement("stop");
		const cdist = i * dist * 100;
		stop.setAttribute("offset", `${cdist}%`);
		stop.setAttribute("stop-color", colors[i % colors.length]);
		lg.appendChild(stop);
	}

	defs.appendChild(lg);

	if (gDir === "left-to-right")
		lg.setAttribute("gradientTransform", "rotate(180,0.5,0.5)");
	else if (gDir === "right-to-left")
		lg.setAttribute("gradientTransform", "rotate(180,0.5,0.5)");
	else if (gDir === "top-to-bottom")
		lg.setAttribute("gradientTransform", "rotate(90,0.5,0.5)");
	else if (gDir === "bottom-to-top")
		lg.setAttribute("gradientTransform", "rotate(270,0.5,0.5)");
	else lg.setAttribute("gradientTransform", `rotate(${gDir},0.5,0.5)`);

	if (gMode === "individual") {
		return [defs, gid, null] as const;
	} else {
		const bg = createSVGElement("rect");
		bg.setAttribute("x", "0");
		bg.setAttribute("y", "0");
		bg.setAttribute("width", "100%");
		bg.setAttribute("height", "100%");
		bg.setAttribute("fill", `url('#${gid}')`);
		return [defs, gid, bg] as const;
	}
};

export const createBarChartMask = (bars: SVGElement[]) => {
	const maskId = randId();
	const mask = createSVGElement("mask");
	mask.id = maskId;

	const bg = createSVGElement("rect");
	bg.setAttribute("x", "0");
	bg.setAttribute("y", "0");
	bg.setAttribute("width", "100%");
	bg.setAttribute("height", "100%");
	bg.setAttribute("fill", "#000000");

	mask.appendChild(bg);

	for (const bar of bars) {
		// Shouldn't have children, and asserting since it should only ever be rects
		const maskBar = bar.cloneNode() as unknown as (typeof bars)[number];
		maskBar.setAttribute("fill", "#ffffff");
		mask.appendChild(maskBar);

		// Cuts down on end payload size
		if (maskBar.getAttribute("title")) maskBar.removeAttribute("title");
	}

	return [maskId, mask] as const;
};
