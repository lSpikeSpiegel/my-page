import { resolve } from "path";
import { PluginOption } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import { createHtmlPlugin } from "vite-plugin-html";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import viteCompression from "vite-plugin-compression";
import vueSetupExtend from "vite-plugin-vue-setup-extend";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";

/**
 * 创建 vite 插件
 * @param viteEnv
 */
export const createVitePlugins = (viteEnv: ViteEnv): (PluginOption | PluginOption[])[] => {
	const { VITE_GLOB_APP_TITLE, VITE_REPORT } = viteEnv;
	return [
		vue(),
		// vue 可以使用 jsx/tsx 语法
		vueJsx(),
		// esLint 报错信息显示在浏览器界面上
		// eslintPlugin(),
		// name 可以写在 script 标签上
		vueSetupExtend({}),
		// gzip压缩 生产环境生成 .gz 文件
		viteCompression({
			verbose: true,
			disable: false,
			threshold: 10240,
			algorithm: "gzip",
			ext: ".gz"
		}),
		// 自动按需导入组件
		Components({
			dirs: ["src/components"], // 自动导入自定义组件
			extensions: ["vue"],
			dts: "components.d.ts"
		}),
		// 自动按需导入hooks
		AutoImport({
			imports: ["vue", "vue-router", "vue-i18n"],
			// 可以选择auto-import.d.ts生成的位置
			dts: "auto-import.d.ts",
			eslintrc: {
				enabled: true
			}
		}),
		// 注入变量到 html 文件
		createHtmlPlugin({
			inject: {
				data: { title: VITE_GLOB_APP_TITLE }
			}
		}),
		// 使用 svg 图标
		createSvgIconsPlugin({
			iconDirs: [resolve(process.cwd(), "src/assets/icons")],
			symbolId: "icon-[dir]-[name]"
		}),
		// 是否生成包预览，分析依赖包大小做优化处理
		VITE_REPORT &&
			(visualizer({
				filename: "stats.html",
				gzipSize: true,
				brotliSize: true
			}) as PluginOption)
	];
};
