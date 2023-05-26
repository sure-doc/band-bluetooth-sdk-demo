import log from './log';
export interface CustomLogConfig {
    logLevel?: log.LogLevelNumbers;
    log?: (args: {
        methodName: string;
        logLevel: log.LogLevelNumbers;
        loggerName: string | symbol;
        /** 原来的打印日志方法 */
        originalMethod: (...msg: any[]) => void;
    }) => (...msgs: any[]) => void;
}
export declare function createCustomLog({ prefixName, defaultLogLevel, }: {
    prefixName: string;
    defaultLogLevel?: log.LogLevelDesc;
}): {
    setConfig: (configParam: CustomLogConfig) => void;
    getLogger: (name: string) => log.Logger;
};
