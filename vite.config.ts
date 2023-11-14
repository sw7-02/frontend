import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { config } from "dotenv";
config(); // Reads from .env

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
    server: {
        port: +(process.env["PORT"] || 5173),
    },
});
