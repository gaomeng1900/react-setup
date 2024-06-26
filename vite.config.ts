import react from '@vitejs/plugin-react-swc'
import autoprefixer from 'autoprefixer'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			// strategies: 'generateSW', // default
			// registerType: 'prompt', // default
			// 仅使用 workbox，不生成 manifest
			manifest: false,
			minify: false,
			devOptions: {
				// 在 dev 环境中开启
				enabled: true,
			},
			workbox: {},
		}),
	],
	css: {
		postcss: { plugins: [autoprefixer({})] },
	},
})
