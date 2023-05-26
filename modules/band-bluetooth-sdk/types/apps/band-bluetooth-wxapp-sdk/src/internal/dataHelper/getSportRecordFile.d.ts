import { SportDetail_t } from './types';
export interface GetSportRecordFileParam {
    /** 运动记录 id */
    sportId: string;
}
export declare function parseGetSportRecordFile(param: GetSportRecordFileParam): SportDetail_t;
