import { CommonErrorCode } from './error';
import { BluetoothApis } from './bluetooth/apis';
export declare namespace InitBluetoothHelper {
    interface Options {
        disabledScanner?: boolean;
        apis?: BluetoothApis;
    }
    /** 初始化错误 */
    type ErrorCode = CommonErrorCode.Unknow | CommonErrorCode.OpenBluetoothAdapterError;
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
}
/**
 * 初始化
 */
export declare function initBluetoothHelper(options?: InitBluetoothHelper.Options): void;
