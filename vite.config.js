import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:5174',
				changeOrigin: true,
				secure: false, // Disable SSL verification
				ws: true, // Proxy websockets
				configure: (proxy, options) => {
					// Proxy event handling
					proxy.on('error', (err, req, res) => {
						console.log('proxy error', err);
					});
					proxy.on('proxyReq', (proxyReq, req, res) => {
						console.log('Sending Request to the Target:', req.url);
					});
				},
			},
		},
	},

	// server: {
	// 	proxy: {
	// 		'/api': {
	// 			target: 'http://localhost:5174',
	// 			changeOrigin: true,
	// 			rewrite: (path) => path.replace(/^\/api/, ''),
	// 		},
	// 	},
	// },
});
