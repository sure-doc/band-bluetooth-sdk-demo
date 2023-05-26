import { pressureStatusReport_t, pressureStatusReq_t } from './types';
/**
 * 所处状态
 */
export declare enum PressureStatusType {
    /**
     *
     * 睡前
     */
    BeforeSleep = 1
}
export interface GetPressureStatusRequest {
    status: PressureStatusType;
}
export interface PressureStatus {
    /** 时间戳，单位：秒，unix时间戳 */
    timestamp: number;
    /** 压力值 */
    pressure: number;
}
export interface GetPressureStatusResponse {
    status: PressureStatusType;
    pressureList: PressureStatus[];
}
export declare function parseGetPressureStatus(req: GetPressureStatusRequest): pressureStatusReq_t;
export declare function formatGetPressureStatus(req: pressureStatusReport_t): GetPressureStatusResponse;
