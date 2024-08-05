import autoprefixer from 'autoprefixer'
import crypto from 'crypto'
import postcssNesting from 'postcss-nesting'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

import react from '@vitejs/plugin-react-swc'

// import { tmpdir } from 'os'
// import basicSsl from '@vitejs/plugin-basic-ssl'
// import { visualizer } from 'rollup-plugin-visualizer'

console.log(process.env.NODE_ENV)

// https://vitejs.dev/config/
export default defineConfig({
	base: './',
	build: {
		rollupOptions: {
			// 覆盖默认的 .html 入口
			input: 'src/app/index.tsx',
			output: {
				entryFileNames: `assets/[name].js`,
				assetFileNames: `assets/[name].[ext]`,
			},
		},
		manifest: true,
	},
	server: {
		port: 2444,
		cors: true,
		open: true,
	},
	define: {
		// 生成符合 css class 规范的随机字符串，作为水印的 class
		WATERMARK_CLASS: JSON.stringify(`${randomString(6)}`),
	},
	plugins: [
		react(),
		VitePWA({
			disable: true,
			// strategies: 'generateSW', // default
			// registerType: 'prompt', // default
			/* workbox only */
			manifest: false,
			minify: false,
			/* 在 dev 环境中开启 */
			devOptions: { enabled: true },
			workbox: {
				skipWaiting: true,
				clientsClaim: true,
				cleanupOutdatedCaches: true,
			},
		}),
		// basicSsl(),
		// visualizer({
		// 	open: true,
		// 	filename: tmpdir() + '/stats.html',
		// }),
	],
	css: {
		postcss: { plugins: [autoprefixer({}), postcssNesting] },
		modules: {
			// generateScopedName: '[name]_[local]_[hash:base64:5]',
			generateScopedName:
				process.env.NODE_ENV === 'production'
					? undefined
					: (name, filename, css) => {
							// show more information in dev mode
							const folderName = filename.split('/').slice(-2, -1)[0]
							const file = filename.split('/').slice(-1)[0]
							const fileAsModule = file.split('.module')[0]
							const moduleName = fileAsModule === 'index' ? folderName : fileAsModule

							const hashStr = hash(filename).slice(0, 5)

							return `${moduleName}_${name}_${hashStr}`
						},
		},
	},
	resolve: {
		alias: { '@': '/src' },
	},
})

function hash(str: string) {
	return crypto.createHash('sha256').update(str).digest('hex')
}

function randomString(length: number) {
	const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
	let result = ''
	for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
	return result
}
