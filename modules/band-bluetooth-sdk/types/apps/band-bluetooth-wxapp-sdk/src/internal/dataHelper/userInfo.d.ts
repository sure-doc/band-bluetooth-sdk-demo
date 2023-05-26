import { UserInfo_t } from './types';
/** 性别 */
export declare enum Gender {
    Male = 1,
    Female = 0
}
export interface UserInfo {
    /** 体重 */
    weight?: number;
    /** 身高 */
    height?: number;
    /** 出生日期(时间戳 ms)，可选 */
    birthday?: number;
    /** 年龄；不传时，如果传入出生日期，则根据出生日期计算 */
    age?: number;
    /** 性别, 男=1，女=0 */
    gender?: Gender;
    /** 用户昵称 */
    nickName?: string;
}
export declare function parseUserInfo(userInfo: UserInfo): UserInfo_t;
export declare function formatUserInfo(UserInfo_t?: UserInfo_t): UserInfo | undefined;
export declare function getAge(birthday?: number): number | undefined;
