import { DeviceInfo as _DeviceInfo } from '@apps/lifesense-wxapp-sdk';
import { CommonErrorCode } from './error';
export declare namespace ReadDeviceInfo {
    type DeviceInfo = _DeviceInfo;
    interface Option {
        deviceId: string;
    }
    type Result = DeviceInfo;
    type ErrorCode = CommonErrorCode.Unknow;
    const Error: {
        new (message: string, code?: CommonErrorCode.Unknow | undefined, data?: any): {
            code: CommonErrorCode.Unknow;
            data?: any;
            name: string;
            message: string;
            stack?: string | undefined;
            cause?: unknown;
        };
        captureStackTrace(targetObject: object, constructorOpt?: Function | undefined): void;
        prepareStackTrace?: ((err: Error, stackTraces: NodeJS.CallSite[]) => any) | undefined;
        stackTraceLimit: number;
    };
}
/**
 * 读取设备信息
 *
 * 必须先连接设备
 */
export declare function readDeviceInfo({ deviceId }: ReadDeviceInfo.Option): Promise<ReadDeviceInfo.Result>;
