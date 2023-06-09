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
	content_scripts: [
		{
			js: ['src/content-scripts/main.ts', 'node_modules/@webcomponents/custom-elements/custom-elements.min.js'],
			matches: [CHAT_URL],
		},
	],
} satisfies ManifestV3Export;
export default defineManifest(manifest);
