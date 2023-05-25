import { AllTypes } from '../dataHelper/types';
import * as dataHelper from '../dataHelper';
/** 请求类型 */
export declare const AllRequestType: {
    /** 0,3 查询设备绑定状态 */
    GetBindInfo: GenerateOptions<0, 3, undefined, GenerateOptionsResponse<"bindInfo_t", unknown>>;
    /** 0,7 解除绑定 */
    Unbind: GenerateOptions<0, 7, GenerateOptionsRequest<"unbindReq_t", unknown>, GenerateOptionsResponse<"ErrorCode_t", dataHelper.ErrorCode_t>>;
    /** 1,1 获取设备时间信息 */
    GetDeviceTime: GenerateOptions<1, 1, undefined, GenerateOptionsResponse<"time_t", dataHelper.DeviceTime>>;
    /** 1,2 设置设备时间信息 */
    SetDeviceTime: GenerateOptions<1, 2, GenerateOptionsRequest<"time_t", dataHelper.DeviceTime>, GenerateOptionsResponse<"ErrorCode_t", dataHelper.ErrorCode_t>>;
    /** 1,3 获取设备版本信息 */
    GetDeviceInfo: GenerateOptions<1, 3, undefined, GenerateOptionsResponse<"device_info_t", dataHelper.DeviceInfo>>;
    /** 1,4 获取设备电池电量信息 */
    GetBatteryInfo: GenerateOptions<1, 4, undefined, GenerateOptionsResponse<"battery_info_t", dataHelper.BatteryInfo>>;
    /** 1,13 设置语言 */
    SetLanguage: GenerateOptions<1, 13, GenerateOptionsRequest<"DeviceLanguageSet_t", import("../dataHelper/types").DeviceLanguageSet_t>, GenerateOptionsResponse<"ErrorCode_t", dataHelper.ErrorCode_t>>;
    /** 2,1 获取心率相关设置 */
    GetHrSetting: GenerateOptions<2, 1, undefined, GenerateOptionsResponse<"HrSwitch_t", dataHelper.HrSetting>>;
    /** 2,2 设置心率相关设置 */
    SetHrSetting: GenerateOptions<2, 2, GenerateOptionsRequest<"HrSwitch_t", dataHelper.HrSetting>, GenerateOptionsResponse<"ErrorCode_t", dataHelper.ErrorCode_t>>;
    /** 2,3 获取血氧相关设置 */
    GetBloodOxygenSetting: GenerateOptions<2, 3, undefined, GenerateOptionsResponse<"Spo2Switch_t", dataHelper.BloodOxygenSetting>>;
    /** 2,4 设置血氧相关设置 */
    SetBloodOxygenSetting: GenerateOptions<2, 4, GenerateOptionsRequest<"Spo2Switch_t", dataHelper.BloodOxygenSetting>, GenerateOptionsResponse<"ErrorCode_t", dataHelper.ErrorCode_t>>;
    /** 2,5 获取睡眠相关配置 */
    GetSleepSetting: GenerateOptions<2, 5, undefined, GenerateOptionsResponse<"SleepSwitch_t", dataHelper.SleepSetting>>;
    /** 2,6 设置睡眠相关配置 */
    SetSleepSetting: GenerateOptions<2, 6, GenerateOptionsRequest<"SleepSwitch_t", dataHelper.SleepSetting>, GenerateOptionsResponse<"ErrorCode_t", dataHelper.ErrorCode_t>>;
    /** 2,7 获取用户信息 */
    GetUserInfo: GenerateOptions<2, 7, undefined, GenerateOptionsResponse<"UserInfo_t", dataHelper.UserInfo | undefined>>;
    /** 2,8 设置用户信息 */
    SetUserInfo: GenerateOptions<2, 8, GenerateOptionsRequest<"UserInfo_t", dataHelper.UserInfo>, GenerateOptionsResponse<"ErrorCode_t", dataHelper.ErrorCode_t>>;
    /** 2.9 获取久坐提醒相关配置 */
    GetSedentaryReminder: GenerateOptions<2, 9, undefined, GenerateOptionsResponse<"SedentaryReminder_t", dataHelper.SedentaryReminder>>;
    /** 2.10 设置久坐提醒相关配置 */
    SetSedentaryReminder: GenerateOptions<2, 10, GenerateOptionsRequest<"SedentaryReminder_t", dataHelper.SedentaryReminder>, GenerateOptionsResponse<"ErrorCode_t", dataHelper.ErrorCode_t>>;
    /** 2,11 获取日常数据记录 */
    GetDailyRecordData: GenerateOptions<2, 11, GenerateOptionsRequest<"RecordData_t", dataHelper.GetDailyRecordData>, GenerateOptionsResponse<"ErrorCode_t", dataHelper.ErrorCode_t>>;
    /** 2,12 获取睡眠报告 */
    GetSleepReport: GenerateOptions<2, 12, undefined, GenerateOptionsResponse<"sleepReport_t", dataHelper.SleepReport | undefined>>;
    /** 2,18 读取压力值 */
    GetPressureStatus: GenerateOptions<2, 18, GenerateOptionsRequest<"pressureStatusReq_t", dataHelper.GetPressureStatusRequest>, GenerateOptionsResponse<"pressureStatusReport_t", dataHelper.GetPressureStatusResponse>>;
    /** 3,1 获取活动目标相关设置 */
    GetActivaGoalSetting: GenerateOptions<3, 1, undefined, GenerateOptionsResponse<"TodayActiveGoalGet_t", dataHelper.TodayActiveGoalSetting>>;
    /** 3,2 设置活动目标相关设置 */
    SetActivaGoalSetting: GenerateOptions<3, 2, GenerateOptionsRequest<"TodayActiveGoalGet_t", dataHelper.TodayActiveGoalSetting>, GenerateOptionsResponse<"ErrorCode_t", dataHelper.ErrorCode_t>>;
    /** 3,7 获取当前日常活动数值 */
    GetTodayActivityData: GenerateOptions<3, 7, undefined, GenerateOptionsResponse<"TodayActiveTotalGet_t", unknown>>;
    /** 3,8 获取运动记录集合 */
    GetSportRecordList: GenerateOptions<3, 8, GenerateOptionsRequest<"SportDescription_t", dataHelper.GetSportRecordListParam>, GenerateOptionsResponse<"SportDescription_t", dataHelper.GetSportRecordListResult>>;
    /** 3,9 获取运动记录文件 */
    GetSportRecordFile: GenerateOptions<3, 9, GenerateOptionsRequest<"SportDetail_t", dataHelper.GetSportRecordFileParam>, GenerateOptionsResponse<"ErrorCode_t", dataHelper.ErrorCode_t>>;
    /** 3,10 每日活动数据 */
    GetDailyRecordSummaryFile: GenerateOptions<3, 10, undefined, GenerateOptionsResponse<"ErrorCode_t", dataHelper.ErrorCode_t>>;
    /** 3,13 下发手机定位 */
    SendGpsLocation: GenerateOptions<3, 13, GenerateOptionsRequest<"GpsLocation_t", dataHelper.GpsLocation>, GenerateOptionsResponse<"ErrorCode_t", dataHelper.ErrorCode_t>>;
    /** 3,14 获取活动强度详情 */
    GetActivityStrength: GenerateOptions<3, 14, undefined, GenerateOptionsResponse<"activityStrengthDetail_t", dataHelper.ActivityStrengthDetail>>;
    /** 3,15 设置/获取运动心率区间 */
    GetSetSportHrSectionSetting: GenerateOptions<3, 15, GenerateOptionsRequest<"sportHrSectionCfg_t", dataHelper.GetSetSportHrSectionSetting>, GenerateOptionsResponse<"sportHrSectionCfg_t", dataHelper.GetSetSportHrSectionSetting>>;
    /** 3,16 设置/获取体育课参数 */
    GetSetPEClassSetting: GenerateOptions<3, 16, GenerateOptionsRequest<"PEClassGet_t", dataHelper.GetSetPEClassSetting>, GenerateOptionsResponse<"PEClassGet_t", dataHelper.GetSetPEClassSetting>>;
    /** 8,1 获取文件列表 */
    GetFileList: GenerateOptions<8, 1, GenerateOptionsRequest<"getFlieListReqRsp_t", dataHelper.GetFileListRequest>, GenerateOptionsResponse<"getFlieListReqRsp_t", dataHelper.GetFileListResponse>>;
    /** 8,2 获取文件 */
    GetFile: GenerateOptions<8, 2, GenerateOptionsRequest<"getFlieRequest_t", dataHelper.GetFileRequest>, GenerateOptionsResponse<"ErrorCode_t", dataHelper.ErrorCode_t>>;
};
/** --------------- types ---------------- */
export type AllRequestType = typeof AllRequestType;
export type RequestType = keyof AllRequestType;
/** generate: options */
export interface GenerateOptions<CategoryId, CommandId, RequestData extends GenerateOptionsRequest<any, any> | undefined, ResponseData extends GenerateOptionsResponse<any, any>> {
    categoryId: CategoryId;
    commandId: CommandId;
    request?: RequestData;
    response?: ResponseData;
    isGetFile?: boolean;
}
/** get request.rawData */
export type GetRequestRawData<Options extends GenerateOptions<any, any, any, any>> = AllTypes[NonNullable<Options['request']>['lookup']];
/** get request.data */
export type GetRequestData<Options extends GenerateOptions<any, any, any, any>> = GetParseFirstParam<Options> extends object ? GetParseFirstParam<Options> : GetRequestRawData<Options>;
/** get response.rawData */
export type GetResponseRawData<Options extends GenerateOptions<any, any, any, any>> = AllTypes[NonNullable<Options['response']>['lookup']];
/** get response.data */
export type GetResponseData<Options extends GenerateOptions<any, any, any, any>> = GetFormatReturnType<Options> extends object | undefined ? GetFormatReturnType<Options> : GetResponseRawData<Options>;
/** generate: options.request */
interface GenerateOptionsRequest<RequestLookup extends keyof AllTypes, RequestData = AllTypes[RequestLookup]> {
    root: any;
    lookup: RequestLookup;
    parse?: (requestData: RequestData) => AllTypes[RequestLookup];
}
/** generate: options.response */
interface GenerateOptionsResponse<ResponseLookup extends keyof AllTypes, ResponseData = AllTypes[ResponseLookup]> {
    root: any;
    lookup: ResponseLookup;
    format?: (data: AllTypes[ResponseLookup]) => ResponseData;
}
/** get with nonNullable */
type GetWithNonNullable<T, K extends keyof T> = T[K] extends null | undefined ? never : NonNullable<T[K]>;
/** get request parse */
type GetParse<Options extends GenerateOptions<any, any, any, any>> = GetWithNonNullable<GetWithNonNullable<Options, 'request'>, 'parse'>;
/** get request parse first param  */
type GetParseFirstParam<Options extends GenerateOptions<any, any, any, any>> = Parameters<GetParse<Options>>[0];
/** get response format */
type GetFormat<Options extends GenerateOptions<any, any, any, any>> = GetWithNonNullable<GetWithNonNullable<Options, 'response'>, 'format'>;
/** get response format return type */
type GetFormatReturnType<Options extends GenerateOptions<any, any, any, any>> = ReturnType<GetFormat<Options>>;
export {};
/** 调试用的 */
/** 调试用的 */
