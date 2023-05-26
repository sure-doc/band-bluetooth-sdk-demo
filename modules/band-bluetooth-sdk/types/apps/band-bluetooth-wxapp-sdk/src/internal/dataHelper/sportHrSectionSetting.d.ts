import { sportHrSectionCfg_t } from './types';
export interface GetSetSportHrSectionSetting {
    /**
     * 指令操作类型
     * false：获取
     * true：设置
     */
    isSet: boolean;
    /** 心率区间设置 */
    hrSections?: HrSection[];
}
export interface HrSection {
    /** 区间最小心率 */
    min: number;
    /** 区间最大心率 */
    max: number;
}
export declare function formatSportHrSectionCfg(sportHrSectionCfg_t: sportHrSectionCfg_t): GetSetSportHrSectionSetting;
export declare function parseSportHrSectionSetting(sportHrSectionSetting: GetSetSportHrSectionSetting): GetSetSportHrSectionSetting;
