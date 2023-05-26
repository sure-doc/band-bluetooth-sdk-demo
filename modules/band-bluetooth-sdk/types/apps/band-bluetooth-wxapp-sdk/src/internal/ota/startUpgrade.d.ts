import { Observable } from 'rxjs';
import { CommonErrorCode, OtaErrorCode } from '../error';
import { ReceiveData } from './receive';
export declare namespace StartUpgrade {
    enum State {
        /** 开始升级 */
        Start = "start",
        /** 发送文件开始 */
        DownLoadFileStart = "downLoadFileStart",
        /** 发送文件完成 */
        DownLoadFileComplete = "downLoadFileComplete",
        /** 升级流程完毕 */
        Complete = "complete"
    }
    interface Option {
        mac: string;
        otaFile: ArrayBuffer;
        /** 是否低版本兼容 */
        isCompatible?: boolean;
        onStateChange?: (state: State) => void;
        onUploadFilePercent?: (percent: number) => void;
        canceler?: (cancel: () => void) => void;
    }
    type ErrorCode = CommonErrorCode.Unknow | OtaErrorCode.NotFoundDevice | OtaErrorCode.Timeout;
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
export declare function startUpgrade(options: StartUpgrade.Option): Promise<ReceiveData<any>>;
export declare function startUpgradeObservalbe({ mac, otaFile }: Omit<StartUpgrade.Option, 'onStateChange'>): {
    mainProcess: Observable<ReceiveData<any>>;
    state: Observable<StartUpgrade.State>;
    uploadFilePercent: Observable<number>;
};
