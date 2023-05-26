import { OnConfirmBindResult as _OnConfirmBindResult } from '@apps/lifesense-wxapp-sdk';
import { LanguageConfig as _LanguageConfig } from '../utils/getContext';
import { Canceler } from '../utils/lastValueFromWithCancel';
import { ConnectDevice } from '../deviceConnection';
import { BindDeviceErrorCode, CommonErrorCode } from '../error';
export declare namespace BindDevice {
    type LanguageConfig = _LanguageConfig;
    type OnConfirmBindResult = _OnConfirmBindResult;
    /** 绑定设备 */
    type OnConfirmBind = () => OnConfirmBindResult | Promise<OnConfirmBindResult>;
    type State = 'waitUserConfirm' | 'startConfirmBind' | 'success' | 'error';
    type OnStateChange = (res: {
        state: State;
    }) => void;
    interface Options {
        /**
         * 设备 mac
         */
        mac: string;
        userId: string;
        /**
         *
         * ```
         * {
         *   local: 'CN',
         *   language: 'zh'
         * }
         *
         * local:
         *   地区信息，使用ISO 3166编码的2位字母编码
         *   比如："US" (美国), "FR" (法国)  "CN"(中国)
         *
         * language:
         *   语种信息，使用ISO 639-1编码的2位字母编码;
         *   比如："en" (英文), "ja" (日文) "zh"(中文)
         * ```
         */
        language?: LanguageConfig;
        /**
         * 确认绑定
         * 不传则不需要再次确认
         *
         */
        onConfirmBind?: BindDevice.OnConfirmBind;
        /**
         * 状态变更ï
         */
        onStateChange?: BindDevice.OnStateChange;
        canceler?: Canceler;
    }
    type ErrorCode = CommonErrorCode.Unknow | BindDeviceErrorCode.NotFoundDevice | BindDeviceErrorCode.NotConnected | BindDeviceErrorCode.UserDeny | BindDeviceErrorCode.DeviceCharging | BindDeviceErrorCode.DeviceAlreadyBind | BindDeviceErrorCode.OnConfirmBindError | BindDeviceErrorCode.OnConfirmBindResultNotSuccess;
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
export declare namespace ConnectAndBindDevice {
    type OnConfirmBind = BindDevice.OnConfirmBind;
    type Options = Omit<BindDevice.Options, 'onStateChange'> & {
        onStateChange: (data: {
            state: ConnectAndBindDevice.State;
        }) => void;
    };
    type State = 'connectStart' | 'connectSuccess' | BindDevice.State;
    type ErrorCode = ConnectDevice.ErrorCode | BindDevice.ErrorCode;
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
