import { defineConfig, loadEnv, UserConfig } from "vite";
import { createVitePlugins } from "./build/plugins";
import { wrapperEnv } from "./build/getEnv";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }): UserConfig => {
	const env = loadEnv(mode, process.cwd());
	const viteEnv = wrapperEnv(env);

	return {
		base: "./", //打包路径
		plugins: createVitePlugins(viteEnv),
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "src")
			}
		},
		server: {
			host: "0.0.0.0",
			port: Number(env.VITE_PORT),
			open: true,
			cors: true,
			https: false,
			proxy: {
				"/api": {
					target: "https://test.eventec.shop/api",
					changeOrigin: true,
					rewrite: path => path.replace(/^\/api/, "")
				},
				"/oss": {
					target: "https://dev.eventec.shop/oss",
					changeOrigin: true,
					rewrite: path => path.replace(/^\/oss/, "")
				}
			}
		},
		esbuild: {
			pure: env.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : []
		},
		build: {
			minify: "esbuild",
			outDir: "dist",
			rollupOptions: {
				output: {
					// Static resource classification and packaging
					chunkFileNames: "assets/js/[name]-[hash].js",
					entryFileNames: "assets/js/[name]-[hash].js",
					assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
				}
			}
		}
	};
});
