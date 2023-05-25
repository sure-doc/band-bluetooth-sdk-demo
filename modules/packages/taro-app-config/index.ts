import * as fs from 'fs';
import * as path from 'path';

/**
 * generate taro app.config.ts
 */
export async function generateAppConfig(config: {
  basePath: string;
  appConfigPath: string;
  generatorPath: string;
  watch?: boolean;
}) {
  const { basePath, appConfigPath, generatorPath, watch } = config;
  const appConfigAbsolutePath = path.resolve(basePath, appConfigPath);
  const generatorAbsolutePath = path.resolve(basePath, generatorPath);

  async function write() {
    const appConfig = await getAppConfig(generatorAbsolutePath);

    return writeAppConfig(appConfigAbsolutePath, generatorPath, appConfig);
  }

  if (!watch) {
    await write();
  } else {
    console.info(`[taro-app-config] generate ${appConfigPath} by '${generatorPath}' success, watching...`);

    watchGenerator(generatorPath, async () => {
      console.info(`[taro-app-config] '${generatorPath}' changed, regenerate...`);
      await write();
      console.info(`[taro-app-config] generate '${appConfigPath}' by '${generatorPath}' success`);
    });
  }
}

// keep watch app.config.generator.ts file change
function watchGenerator(generatorPath: string, callback: () => void) {
  fs.watchFile(generatorPath, { interval: 1000 }, async () => {
    callback();
  });
}

/**
 * get taro-app-config content
 */
async function getAppConfig(generatorPath: string) {
  // delete import cache
  delete require.cache[generatorPath];
  const { default: appConfig } = await import(generatorPath);

  return appConfig;
}

/**
 * generage taro-app-config content
 */
function generateAppConfigContent(relativePath: string, appConfig: any) {
  return `// ==================================================
// 不要修改这个文件！！！
// 这个文件由 ${relativePath} 生成。
// ==================================================
/* eslint-disable */
export default ${JSON.stringify(appConfig, null, 2)};`;
}

/**
 * write taro-app-config
 */
function writeAppConfig(appConfigPath: string, generatorPath: string, appConfig: any) {
  return new Promise<void>((resolve, reject) => {
    fs.writeFile(appConfigPath, generateAppConfigContent(generatorPath, appConfig), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
