/**
 * 参考：https://github.com/baranwang/tarojs-plugin-platform-miniprogram
 */
import { resolve } from 'path';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { IPluginContext } from '@tarojs/service';

export interface Options {
  prefix?: string;
  suffix?: string;
  include?: Array<string | RegExp>;
  exclude?: Array<string | RegExp>;
}

export default (ctx: IPluginContext, options: Options) => {
  ctx.onBuildFinish(({ stats }) => {
    stats?.compilation?.entries?.forEach((entry) => {
      if (entry.miniType === undefined) {
        // eslint-disable-next-line no-param-reassign
        entry = entry.dependencies?.[0] || {};
      }

      if (entry.miniType !== 'PAGE') return;

      if (options?.include && !options.include.some((pattern) => entry.name.match(pattern))) {
        return;
      }
      if (options?.exclude && options.exclude.some((pattern) => entry.name.match(pattern))) {
        return;
      }

      const WxmlFilePath = resolve(ctx?.paths?.outputPath ?? 'dist', `${entry.name}.wxml`);
      if (!existsSync(WxmlFilePath)) return;
      const WxmlFileContent = readFileSync(WxmlFilePath, 'utf-8');
      let prefix: string | undefined;
      let suffix: string | undefined;
      if (options?.prefix) {
        if (existsSync(options.prefix)) {
          prefix = readFileSync(options.prefix, 'utf-8');
        } else {
          prefix = options.prefix;
        }
      }
      if (options?.suffix) {
        if (existsSync(options.suffix)) {
          suffix = readFileSync(options.suffix, 'utf-8');
        } else {
          suffix = options.suffix;
        }
      }
      writeFileSync(WxmlFilePath, `${prefix ?? ''}${WxmlFileContent}${suffix ?? ''}`);
    });
  });
};
