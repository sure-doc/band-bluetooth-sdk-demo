/// <reference types="miniprogram-api-typings" />
import { PromisifyResult } from '@my/wxapp-api-promise';
import { Subject } from 'rxjs';
import { WriteCharacteristicValue } from './types';
export declare class Writer {
    write$: Subject<{
        seq: number;
        option: WriteCharacteristicValue.Option;
    }>;
    writeComplete$: Subject<{
        seq: number;
        apiResult: PromisifyResult<WechatMiniprogram.BluetoothError>;
    }>;
    seq: number;
    constructor();
    /** 向低功耗蓝牙设备特征值中写入二进制数据 */
    writeCharacteristicValue(option: WriteCharacteristicValue.Option): Promise<WechatMiniprogram.BluetoothError | undefined>;
}
