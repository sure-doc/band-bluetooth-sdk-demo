export interface UpgradingState {
    isUpgrading: boolean;
}
/** 开始升级 */
export declare function setOtaUpgradeStart(mac: string): void;
/** 结束升级 */
export declare function setOtaUpgradeComplete(mac: string): void;
export declare function isOtaUpgrading(mac: string): boolean;
