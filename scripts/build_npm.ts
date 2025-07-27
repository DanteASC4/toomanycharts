import { build, emptyDir } from "@deno/dnt";

await emptyDir("npm");
await build({
	entryPoints: ["./src/index.ts"],
	outDir: "./npm",
	shims: {
		deno: true,
	},
	package: {
		name: "justcharts",
		version: Deno.args[0],
		description:
			"A small, client-side, 0-dependency package for quickly generating simple SVG-based charts.",
		license: "MIT",
		repository: {
			type: "git",
			url: "git+https://github.com/danteasc4/justcharts.git",
		},
		bugs: {
			url: "https://github.com/danteasc4/justcharts/issues",
		},
	},
	compilerOptions: {
		lib: ["ESNext", "DOM"],
	},
	rootTestDir: "./tests",
	postBuild() {
		Deno.copyFileSync("LICENSE", "npm/LICENSE");
		Deno.copyFileSync("README.md", "npm/README.md");
	},
});
