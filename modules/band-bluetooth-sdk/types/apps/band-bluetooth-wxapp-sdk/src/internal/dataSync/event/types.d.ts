import { EventDisc_t } from '../../dataHelper/types';
export declare namespace Event {
    type OriginEvent = EventDisc_t;
    /**
     * ```
     * 事件类型
     * 0：无效
     * 1：入睡
     * 2：醒来
     * 3：开始运动，带运动ID参数
     * 4：结束运动，带运动ID参数
     * 5: 文件状态更新
     * ```
     */
    enum EventType {
        /** 0: 无效 */
        Invalid = 0,
        /** 1: 入睡 */
        Sleep = 1,
        /** 2: 醒来 */
        WakeUp = 2,
        /** 3: 开始运动 */
        StartSport = 3,
        /** 4: 结束运动 */
        EndSport = 4,
        /** 5: 文件更新 */
        FileUpdate = 5
    }
    interface BaseEvent<Type extends EventType> {
        type: Type;
        time: number;
        originEvent: OriginEvent;
    }
    interface DataEvent<Type extends EventType, Data> extends BaseEvent<Type> {
        data: Data;
    }
    type InvalidEvent = BaseEvent<EventType.Invalid>;
    type SleepEvent = BaseEvent<EventType.Sleep>;
    type WakeUpEvent = BaseEvent<EventType.WakeUp>;
    type StartSportEvent = DataEvent<EventType.StartSport, {
        sportId: string;
    }>;
    type EndSportEvent = DataEvent<EventType.EndSport, {
        sportId: string;
    }>;
    /**
     * ```
     * 0	日常心率记录文件更新
     * 1	日常血氧记录文件更新
     * 2	日常睡眠记录文件更新
     * 3	日常活动(分钟活动记录) 文件更新
     * 4	日常活动及状态(小时活动记录)文件更新
     * 5	压力文件更新
     * 6	日常活动汇总文件更新
     * 7	点测血氧文件更新
     * 8	运动记录文件更新
     * 9	当前活动数值文件更新
     * 10	静息心率文件更新
     * 31	让小程序全部遍历查询
     * ```
     */
    enum FileUpdateType {
        /** 0: 日常心率记录文件更新 */
        HeartRate = 0,
        /** 1: 日常血氧记录文件更新 */
        BloodOxygen = 1,
        /** 2: 日常睡眠记录文件更新 */
        Sleep = 2,
        /** 3: 日常活动(分钟活动记录) 文件更新 */
        DailyActivities = 3,
        /** 4: 日常活动及状态(小时活动记录)文件更新 */
        DailyActivitiesStatus = 4,
        /** 5: 压力文件更新 */
        Pressure = 5,
        /** 6: 日常活动汇总文件更新 */
        DailyActivitiesSummary = 6,
        /** 7: 点测血氧文件更新 */
        PointBloodOxygen = 7,
        /** 8: 运动记录文件更新 */
        SportRecord = 8,
        /** 9: 当前活动数值文件更新 */
        TodayActivities = 9,
        /** 10: 静息心率文件更新 */
        RestingHeartRate = 10,
        /** 31: 让小程序全部遍历查询 */
        All = 31
    }
    type FileUpdateEvent = DataEvent<EventType.FileUpdate, {
        fileTypes: FileUpdateType[];
    }>;
}
export type Event = Event.InvalidEvent | Event.SleepEvent | Event.WakeUpEvent | Event.StartSportEvent | Event.EndSportEvent | Event.FileUpdateEvent;
