export declare class ApiError<Code extends number = number, Data = any> extends Error {
    code: Code;
    data?: Data;
    constructor(message: string, code?: Code, data?: Data);
}
export declare function generateApiError<ErrorCode extends number, Data = any>(): {
    new (message: string, code?: ErrorCode, data?: Data): {
        code: ErrorCode;
        data?: Data | undefined;
        name: string;
        message: string;
        stack?: string | undefined;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function | undefined): void;
    prepareStackTrace?: ((err: Error, stackTraces: NodeJS.CallSite[]) => any) | undefined;
    stackTraceLimit: number;
};
