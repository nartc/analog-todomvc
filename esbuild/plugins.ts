import analog from '@analogjs/vite-plugin-angular';
import type { Plugin, PluginBuild } from 'esbuild';

const analogPlugin: Plugin = {
	name: 'analog-esbuild-plugin',
	async setup(build: PluginBuild) {
		const analogPlugins: any = analog({
			experimental: { supportAnalogFormat: true },
		});

		const analogPlugin = analogPlugins[0];
		await analogPlugin.config({ root: '.' }, { command: 'build' });
		await analogPlugin.buildStart?.({
			plugins: [
				{
					name: 'vite:css',
					transform(code: string) {
						return { code };
					},
				},
			],
		});

		build.onLoad({ filter: /.analog$/ }, async (args) => {
			console.log('args', args.path);
			await analogPlugin.handleHotUpdate?.({ file: args.path, modules: [] });
			const result = await analogPlugin.transform?.('', args.path);
			console.log('result', result?.code);
			return { loader: 'js', contents: result?.code };
		});
	},
};

export default [analogPlugin];
