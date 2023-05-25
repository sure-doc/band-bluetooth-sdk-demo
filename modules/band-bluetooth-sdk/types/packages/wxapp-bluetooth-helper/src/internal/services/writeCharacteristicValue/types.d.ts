/// <reference types="node" />
import { CommonErrorCode, ServicesErrorCode } from '../../error';
export declare namespace WriteCharacteristicValue {
    type ErrorCode = CommonErrorCode.Unknow | ServicesErrorCode.WriteError;
    const Error: {
        new (message: string, code?: ErrorCode | undefined, data?: any): {
            code: ErrorCode;
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
    interface Option {
        /** 蓝牙设备 id */
        deviceId: string;
        /** 蓝牙特征值对应服务的 uuid */
        serviceId: string;
        /** 蓝牙特征值的 uuid */
        characteristicId: string;
        /** 蓝牙设备特征值对应的二进制值 **/
        value: ArrayBuffer;
        /** 超时，默认重试 2 次（共调用 3 次） */
        retry?: number;
    }
}
