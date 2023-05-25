import { PEClassGet_t } from './types';
export interface GetSetPEClassSetting {
    isSet?: boolean;
    /** false：退出体育课 true：开启体育课 */
    PEState?: boolean;
    /** 体育课时长（单位：分钟） */
    PEDuration?: number;
}
export declare function formatPEClassSetting(PEClassGet_t: PEClassGet_t): GetSetPEClassSetting;
export declare function parsePEClassSetting(PEClassSetting: GetSetPEClassSetting): GetSetPEClassSetting;
