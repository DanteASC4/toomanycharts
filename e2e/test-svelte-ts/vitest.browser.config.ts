import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [svelte()],
	test: {
    setupFiles: ['vitest-browser-svelte'],
		browser: {
			enabled: true,
			provider: "playwright",
			// https://vitest.dev/guide/browser/playwright
			instances: [{ browser: "chromium" }],
		},
	},
});
