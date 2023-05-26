import { CommonErrorCode, ConnectionErrorCode } from '../error';
/** state */
export interface DeviceConnectionState {
    connected: boolean;
    connecting: boolean;
}
export interface DeviceConnection {
    deviceId: string;
    state: DeviceConnectionState;
}
export declare namespace ConnectDevice {
    interface Option {
        deviceId: string;
        /** 超时时间，单位ms，不填表示不会超时 */
        timeout?: number;
    }
    type ErrorCode = CommonErrorCode.Unknow | ConnectionErrorCode.AlreadyConnected | ConnectionErrorCode.AlreadyConnecting | ConnectionErrorCode.ConnectError | ConnectionErrorCode.Timeout | ConnectionErrorCode.CancelConnect;
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
        deviceId: string;
    }
    type ErrorCode = CommonErrorCode.Unknow | ConnectionErrorCode.NotConnected | ConnectionErrorCode.DisconnectError;
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
    interface Option {
        deviceId?: string;
        onStateChange: (result: OnStateChangeResult, prev: OnStateChangeResult) => void;
    }
    interface OnStateChangeResult {
        deviceId: string;
        connecting: boolean;
        connected: boolean;
    }
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
export declare namespace OnConnectionConnectedChange {
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
    interface OnConnectedChangeResult {
        deviceId: string;
        connected: boolean;
    }
    interface Option {
        deviceId?: string;
        onConnectedChange: (result: OnConnectedChangeResult) => void;
    }
}
export declare namespace GetConnectionState {
    interface Option {
        deviceId: string;
    }
    type Result = DeviceConnectionState;
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
export declare namespace GetConnectedDevices {
    type Result = DeviceConnection[];
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
export declare namespace GetLatestConnectedDevices {
    interface Option {
        services: string[];
    }
    type Result = DeviceConnection[];
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
