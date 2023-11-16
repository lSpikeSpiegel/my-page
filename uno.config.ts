// @filename uno.config.ts
import { defineConfig, presetUno, presetAttributify } from "unocss";

export default defineConfig({
	presets: [
		presetUno(),
		presetAttributify()
		// ...
	],
	shortcuts: [
		[
			/^btn-(.*)$/,
			([, c]) =>
				`bg-[var(--color-${c})] text-[var(--color-light)] rounded-8px hover:bg-[var(--color-${c}-light)]`
		]
	]
});
