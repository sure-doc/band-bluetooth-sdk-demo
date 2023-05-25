import log, { LogLevelDesc, LogLevelNumbers } from 'loglevel';
/** 获取 level 的数值 */
export declare function getLevelNumber(level: string | number): LogLevelNumbers;
/**
 * 按特定过滤条件，循环调用 logger.setLevel
 */
export declare function setLoggersLevel(level: LogLevelDesc, { filter }?: {
    filter?: (loggerName: string, index: number, array: string[]) => any;
}): void;
/**
 * 转换消息格式
 */
export declare function formatMsgs({ methodName, loggerName, }: {
    methodName: string;
    loggerName: string | symbol;
}, ...msgs: any[]): any[];
/**
 * 自定义 getLogger
 *
 * 修改打印内容 (formatMsgs)
 */
export declare function getLogger(name: string): log.Logger;
export default log;
