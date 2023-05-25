import { activityStrengthDetail_t } from './types';
/** 活动强度详情 */
export interface ActivityStrengthDetail {
    activityStrengths: ActivityStrength[];
}
export interface ActivityStrength {
    /**
     * 运动类型，详见8.5运动类型定义
     * 0表示非运动情况下的活动
     */
    sportType: number;
    /**
     * 中度活动时长，单位分钟
     * 最大心率：207-0.7*年龄
     * 高强度：0.64~0.75最大心率
     * 中强度：0.76~0.96最大心率
     */
    midActivityTime: number;
    /**
     * 高强度活动时长，单位分钟
     */
    highActivityTime: number;
}
export declare function formatactivityStrengthDetail(activityStrengthDetail_t: activityStrengthDetail_t): ActivityStrengthDetail;
