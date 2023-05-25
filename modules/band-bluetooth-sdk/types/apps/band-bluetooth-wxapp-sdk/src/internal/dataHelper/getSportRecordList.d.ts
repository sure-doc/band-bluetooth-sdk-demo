import { SportDescription_t } from './types';
export interface GetSportRecordListParam {
    /** 开始时间戳 ms */
    startTime: number;
    /** 结束时间戳 ms */
    endTime: number;
}
export interface GetSportRecordListResult {
    /**
     * 运动记录的id列表，每个id代表一条运动记录的唯一标识，可通过改id获取这条运动记录的详情数据
     * 运动记录id为string类型，长度32
     */
    sportIds: string[];
}
export declare function parseGetSportRecordList(param: GetSportRecordListParam): SportDescription_t;
export declare function formatGetSportRecordList(result: SportDescription_t): GetSportRecordListResult;
