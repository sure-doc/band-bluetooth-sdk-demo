/// <reference types="miniprogram-api-typings" />
import { WriteCharacteristicValue } from './types';
export type { WriteCharacteristicValue } from './types';
export declare function initWriteCharacteristicValue(): void;
export declare function writeCharacteristicValue(option: WriteCharacteristicValue.Option): Promise<WechatMiniprogram.BluetoothError | undefined>;
