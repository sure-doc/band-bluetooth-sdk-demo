import 'miniprogram-api-typings';
export interface CheckBluetoothResult {
    /**
     * 是否打开蓝牙, undefined 时为不确定
     */
    bluetoothEnabled?: boolean;
    /**
     * 是否打开定位, undefined 时为不确定
     */
    locationEnabled?: boolean;
    /**
     * 允许微信使用蓝牙的开关（仅 iOS 有效）, undefined 时为不确定
     *
     * https://developers.weixin.qq.com/miniprogram/dev/api/base/system/wx.getAppAuthorizeSetting.html
     */
    bluetoothAuthorized?: boolean;
    /**
     * 允许微信使用定位的开关, undefined 时为不确定
     */
    locationAuthorized?: boolean;
    /**
     * 小程序设置 蓝牙, undefined 时为不确定
     */
    bluetoothSetting?: boolean;
}
export declare function checkBluetooth(): Promise<CheckBluetoothResult>;
