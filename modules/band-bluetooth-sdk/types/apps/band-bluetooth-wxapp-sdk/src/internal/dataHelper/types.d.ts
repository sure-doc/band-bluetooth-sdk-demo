export interface AllTypes {
    None: never;
    ErrorCode_t: ErrorCode_t;
    EventDisc_t: EventDisc_t;
    FileSendRequest_t: FileSendRequest_t;
    fileChunkSendRequest: fileChunkSendRequest;
    fileSendComplete_t: fileSendComplete_t;
    fileSendCancel_t: fileSendCancel_t;
    HrSwitch_t: HrSwitch_t;
    TodayActiveGoalGet_t: TodayActiveGoalGet_t;
    GoalContent_t: GoalContent_t;
    UserInfo_t: UserInfo_t;
    DeviceLanguageSet_t: DeviceLanguageSet_t;
    bindInfo_t: bindInfo_t;
    unbindReq_t: unbindReq_t;
    time_t: time_t;
    device_info_t: device_info_t;
    battery_info_t: battery_info_t;
    SedentaryReminder_t: SedentaryReminder_t;
    getFlieRequest_t: getFlieRequest_t;
    getFlieListReqRsp_t: getFlieListReqRsp_t;
    SleepSwitch_t: SleepSwitch_t;
    Spo2Switch_t: Spo2Switch_t;
    sportHrSectionCfg_t: sportHrSectionCfg_t;
    RecordData_t: RecordData_t;
    sleepReport_t: sleepReport_t;
    TodayActiveTotalGet_t: TodayActiveTotalGet_t;
    SportDescription_t: SportDescription_t;
    SportDetail_t: SportDetail_t;
    activityStrengthDetail_t: activityStrengthDetail_t;
    GpsLocation_t: GpsLocation_t;
    pressureStatusReq_t: pressureStatusReq_t;
    pressureStatusReport_t: pressureStatusReport_t;
    History7DayData_t: History7DayData_t;
    PEClassGet_t: PEClassGet_t;
}
export interface ErrorCode_t {
    ErrorCode: number;
}
export interface FileSendRequest_t {
    taskId: number;
    fileType: number;
    filename: string;
    fileSize: number;
    md5: ArrayBuffer;
}
export interface fileChunkSendRequest {
    taskId: number;
    index: number;
    content: ArrayBuffer;
}
export interface fileSendComplete_t {
    taskId: number;
    errorCode: number;
}
export interface fileSendCancel_t {
    taskId: number;
    errorCode: number;
}
/**
 * 心率相关设置
 */
export interface HrSwitch_t {
    HrSwitch: number;
    HrInterval: number;
    HrDailyWarnEn: number;
    HrDailyWarnVal: number;
    HrSportWarnEn: number;
    HrSportWarnVal: number;
}
export interface TodayActiveGoalGet_t {
    GoalSw: number;
    GoalItem: GoalContent_t[];
}
export interface GoalContent_t {
    SubType: number;
    SubSw: number;
    SubValue: number;
}
export interface UserInfo_t {
    Weight?: number;
    Height?: number;
    Birthday?: number;
    Age?: number;
    Gender?: number;
    NickName?: string;
}
export interface DeviceLanguageSet_t {
    local: string;
    language: string;
}
export interface bindInfo_t {
    isBond: boolean;
    timestamp: number;
    account: string;
    mac: number[];
    masterMac: number[];
}
export interface unbindReq_t {
    account: string;
}
export interface time_t {
    timestamp: number;
    timezone: number;
    timezoneCity: string;
    timeFormat: number;
    dateFormat: number;
}
export interface device_info_t {
    deviceType?: number;
    deviceHardVersion: string;
    deviceSoftVersion: string;
    deviceSn: string;
    deviceModel?: string;
    deviceName: string;
    sku: string;
}
export interface battery_info_t {
    battery_percent: number;
}
export interface SedentaryReminder_t {
    Enable: 0 | 1;
    ThresholdValue: ThresholdValue_t;
    TimeSets: TimeRange_t[];
}
export interface ThresholdValue_t {
    Duration: number;
    Step: number;
}
export interface TimeRange_t {
    StartTime: number;
    EndTime: number;
}
export interface getFlieRequest_t {
    filename: string;
    fileType: number;
}
export interface getFlieListReqRsp_t {
    fileType: number;
    fileList: string[];
    errorCode: number;
}
export interface FallAsleepRemindSet_t {
    /**
     * 睡眠报告推送开关
     * 0：无效值
     * 1：关
     * 2：开
     * 设备收到无效值将忽略，维持原有配置
     */
    RemindSwitch: number;
    RemindTime: number;
    RemindCycleMaskFlag: number;
}
export interface SleepSchedule_t {
    SleepDuration: number;
    SleepStartTime: number;
    SleepEndTime: number;
    FallAsleepRemindSet?: FallAsleepRemindSet_t;
    /**
     * 睡眠报告推送开关
     * 0：无效值
     * 1：关
     * 2：开
     * 设备收到无效值将忽略，维持原有配置
     */
    SleepReportSwitch?: number;
}
export interface SleepSwitch_t {
    SleepSwitch: 0 | 1;
    SleepScheduleEn: boolean;
    SleepSchedule: SleepSchedule_t;
}
export interface Spo2Switch_t {
    Spo2Type: number;
    /**
     * 手环血氧检测类型开关;
     * 0：关
     * 1：开
     **/
    Spo2Switch: 0 | 1;
    /** 手环血氧周期检测间隔（单位s） */
    Spo2Interval: number;
}
export interface sportHrSectionCfg_t {
    isSet: boolean;
    hrSections?: hrSection_t[];
}
export interface hrSection_t {
    min: number;
    max: number;
}
export interface RecordData_t {
    DataType: number;
    RecordType: number;
}
export interface sleepReport_t {
    vliad: boolean;
    fallSleep: number;
    sleepOut: number;
    REM: number;
    lightSleep: number;
    deepSleep: number;
    sleepScore: number;
    sleepGrade: number;
    fallSleepSpend: number;
    exceptionHrs: exceptionHr_t[];
    hour_apneas: apnea_t[];
    sleepDetail: ArrayBuffer;
}
export interface exceptionHr_t {
    timestamp: number;
    duration: number;
}
export interface apnea_t {
    hour: number;
    times: number;
}
export interface TodayActiveTotalGet_t {
    DayUtc: number;
    DayCalorie: number;
    DayStep: number;
    DayDistance: number;
    DayExercise: number;
    DayActivityCount: number;
    HighStrengthDuration: number;
    MiddleStrengthDuration: number;
    DayStandDetail: number;
    WakeupHr: number;
    DayWearDetail: number;
    WeekHighStrength: number;
    WeekMiddleStrength: number;
    HourActiveData: HourActiveData_t;
    DayExerciseTime: number;
}
export interface HourActiveData_t {
    Calorie: number;
    Step: number;
    Distance: number;
    ExerciseTime: number;
    HighStrengthDuration: number;
    MiddleStrengthDuration: number;
    StandState: boolean;
    WearState: boolean;
}
export interface SportDescription_t {
    StartTime: number;
    EndTime: number;
    SportIds?: string[];
}
export interface SportDetail_t {
    SportIds: string;
}
export interface activityStrength_t {
    sportType: number;
    midActivityTime: number;
    highActivityTime: number;
}
export interface activityStrengthDetail_t {
    activityStrengths: activityStrength_t[];
}
export interface GpsLocation_t {
    StateCode: number;
    TimesTamp: number;
    Speed: number;
    InvertSpeed: number;
    Altitude: number;
    Distance: number;
    Longitude: number;
    latitude: number;
    precision: number;
}
export interface pressureStatusReq_t {
    status: number;
}
export interface pressureStatus_t {
    timestamp: number;
    pressure: number;
}
export interface pressureStatusReport_t {
    status: number;
    pressureList: pressureStatus_t[];
}
export interface History7DayData_t {
    DayUtc: number;
    DayCalorie: number;
    DayStep: number;
    DayDistance: number;
    DayStandDetail: number;
    DayWakeupHr: number;
    DayExerciseTime: number;
}
export interface EventDisc_t {
    EventID: number;
    EventTime: number;
    EventParaStr: string;
    EventParaUint: number;
}
/** 2023-05-08新增  设置/获取体育课参数 */
export interface PEClassGet_t {
    isSet?: boolean;
    /** false：退出体育课 true：开启体育课 */
    PEState?: boolean;
    /** 体育课时长（单位：分钟） */
    PEDuration?: number;
}
