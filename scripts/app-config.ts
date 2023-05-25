import * as path from 'path';
import { generateAppConfig } from '@my/taro-app-config';

const basePath = path.resolve(__dirname, '../');
const appConfigPath = './src/app.config.ts';
const generatorPath = './src/app.config.generator.ts';

generateAppConfig({
  basePath,
  appConfigPath,
  generatorPath,
  watch: process.env.APP_CONFIG_WATCH === 'true',
});
