import { LogLevelNumbers, LogLevelDesc, LoggingMethod } from 'loglevel';
export type LoggerMethod = (option: {
    /** log的方法名，如: debug,info,warn,error */
    methodName: string;
    /**
     * DEBUG: 1;
     * INFO: 2;
     * WARN: 3;
     * ERROR: 4;
     */
    logLevel: LogLevelNumbers;
    loggerName: string | symbol;
    /** 原始输出方法 */
    loggingMethod: LoggingMethod;
}, ...msgs: any[]) => void;
/**
 * set logger method
 */
export declare function setLoggerMethod(loggerMethod: LoggerMethod): void;
export declare function setLoggerLevel(loggerLevel: LogLevelDesc): void;
export declare function getLogger(name: string): import("loglevel").Logger;
