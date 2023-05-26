import { Context, ScanResult } from '@apps/lifesense-wxapp-sdk';
import { UserInfo } from '../dataHelper';
export interface LanguageConfig {
    /**
     * 地区信息，使用ISO 3166编码的2位字母编码
     * 比如："US" (美国), "FR" (法国)  "CN"(中国)
     */
    local: string;
    /**
     * 语种信息，使用ISO 639-1编码的2位字母编码
     * 比如："en" (英文), "ja" (日文) "zh"(中文)
     */
    language: string;
}
declare function getContext({ scanResult, bindUserId, userInfo, ...rest }: Partial<Omit<Context, 'userInfo'>> & {
    /** 绑定用户id，协议上的 account */
    bindUserId?: string;
    /** 用户信息 */
    userInfo?: UserInfo;
    scanResult?: ScanResult;
}): Context;
export default getContext;
