import { sleepReport_t } from './types';
export type SleepReport = Omit<sleepReport_t, 'sleepDetail'> & {
    sleepDetail: number[];
};
/**
 * 解析 睡眠报告 SleepReport_t
 *
 * SleepReport_t.sleepDetail: bytes to uint8[]
 */
export declare function formatSleepReport(sleepReport?: sleepReport_t): SleepReport | undefined;
