import { TodayActiveGoalGet_t } from './types';
export declare enum TodayActiveGoalType {
    /** 无效 */
    Invalid = 0,
    /** 步数，（步） */
    Steps = 1,
    /** 卡路里，（0.1kcal） */
    Calorie = 2,
    /** 距离，（米） */
    Distance = 3,
    /** 站立时长（小时） */
    StandingDuration = 4,
    /** 周活动时长（分钟）默认150 */
    WeeklyActivityDuration = 5,
    /** 其他 */
    Other = 6
}
export interface TodayActiveGoalSettingItem {
    type: TodayActiveGoalType;
    switch: boolean;
    value: number;
}
/**
 * 活动目标相关设置
 */
export interface TodayActiveGoalSetting {
    /** 今日活动总开关状态 */
    switch: boolean;
    /** 具体的目标条目内容 */
    items: TodayActiveGoalSettingItem[];
}
export declare function parseTodayActiveGoalGet(todayActiveGoalSetting: TodayActiveGoalSetting): TodayActiveGoalGet_t;
export declare function formatTodayActiveGoalGet(TodayActiveGoalGet_t: TodayActiveGoalGet_t): TodayActiveGoalSetting;
