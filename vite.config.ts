import react from '@vitejs/plugin-react-swc'
import autoprefixer from 'autoprefixer'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	css: {
		postcss: { plugins: [autoprefixer({})] },
	},
})
