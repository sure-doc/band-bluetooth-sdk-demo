import { LogLevelDesc } from 'loglevel';
import { BluetoothApis } from '@my/wxapp-bluetooth-helper';
import { LoggerMethod } from '../lib/logs';
import { CommonErrorCode, InitErrorCode } from './error';
export declare namespace Init {
  interface Option {
    /**
     * 自定义日志输出
     * ```ts
     * logger: {
     *   level: config.BAND_SDK_LOG_LEVEL.logLevel,
     *   method: ({ methodName, loggerName, logLevel, loggingMethod }, ...msgs) => {
     *     loggingMethod(`${methodName}-${loggerName}-${logLevel}`, ...msgs)
     *   },
     * },
     * ```
     */
    logger?: {
      method?: LoggerMethod;
      level?: LogLevelDesc;
    };
    apis?: BluetoothApis;
  }
  /** 初始化错误 */
  type ErrorCode =
    | CommonErrorCode.Unknow
    | InitErrorCode.Initializing
    | InitErrorCode.Initialized
    | InitErrorCode.InitBluetoothError;
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
/** 初始化 */
export declare function init(options?: Init.Option): Promise<void>;
/**
 * 监听初始化完成
 *
 * 如果已初始化则立即执行
 */
export declare function onInitialized(callback: () => void): () => void;
