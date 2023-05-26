import { CommonErrorCode, ConnectionErrorCode } from '../error';
export interface ConnectionState {
    connecting: boolean;
    connected: boolean;
}
export declare namespace ConnectDevice {
    interface Option {
        /** 设备 mac */
        mac: string;
        /** 超时时间 ms, 默认 10 秒 */
        timeout?: number;
    }
    type ErrorCode = CommonErrorCode.Unknow | ConnectionErrorCode.Timeout | ConnectionErrorCode.AlreadyConnecting | ConnectionErrorCode.AlreadyConnected | ConnectionErrorCode.NotFoundDevice;
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
export declare namespace DisconnectDevice {
    interface Option {
        mac: string;
    }
    type ErrorCode = CommonErrorCode.Unknow | ConnectionErrorCode.NotConnected;
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
export declare namespace OnConnectionStateChange {
    interface OptionOnChangeResult {
        /** 设备 mac */
        mac: string;
        /** 变更后 state */
        state: ConnectionState;
        /** 变更前 state */
        prevState: ConnectionState;
    }
    type OptionOnChange = (result: OptionOnChangeResult) => void;
    interface Option {
        /** 监听指定 mac 设备变更，可选 */
        mac?: string;
        /** 变更回调 */
        onChange: OptionOnChange;
    }
}
export declare namespace OnConnectionConnectedChange {
    interface OptionOnChangeResult {
        mac: string;
        connected: boolean;
    }
    type OptionOnChange = (result: OptionOnChangeResult) => void;
    interface Option {
        mac?: string;
        onChange: OptionOnChange;
    }
}
export declare namespace GetConnectedDevices {
    interface ConnectedDevice {
        mac: string;
    }
}
