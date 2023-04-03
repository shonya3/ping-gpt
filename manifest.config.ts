import { defineManifest, ManifestV3Export } from '@crxjs/vite-plugin';
import { CHAT_URL } from './src/consts';

const manifest = {
	name: 'PingGPT',
	version: '0.1.0',
	manifest_version: 3,
	permissions: ['storage', 'tabs', 'alarms'],
	description: 'dont let gpt go to sleep',
	action: {
		default_title: 'ping',
	},
	icons: {},
	background: {
		service_worker: 'src/background.ts',
		type: 'module',
	},
	content_scripts: [
		{
			js: ['src/content-scripts/main.ts'],
			matches: [CHAT_URL],
		},
	],
} satisfies ManifestV3Export;
export default defineManifest(manifest);
