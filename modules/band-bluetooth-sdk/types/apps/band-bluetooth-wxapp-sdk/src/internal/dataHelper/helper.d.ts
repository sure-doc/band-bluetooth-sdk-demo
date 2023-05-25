/**
 * 十进制数 转 { hour, minute }
 * 0~23点59分，
 * 高字节表示小时（24小时制）
 * 低字节表示分钟
 * 如 0x10 1E 表示16点30
 */
export declare function numberToHoursMinutes(time: number): {
    hour: number;
    minute: number;
} | undefined;
/**
 * { hour, minute } 转 十进制数字
 * 0~23点59分，
 * 高字节表示小时（24小时制）
 * 低字节表示分钟
 * 如 0x10 1E 表示16点30
 */
export declare function hoursMinutesToNumber(value?: {
    hour: number;
    minute: number;
}): number;
