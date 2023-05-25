/**
 * 蓝牙 api
 *
 * 原生小程序 api 不支持多次监听
 *
 * 以下调整为可支持多次监听
 */
export declare const getBluetoothAdapterState: <T extends WechatMiniprogram.GetBluetoothAdapterStateOption = WechatMiniprogram.GetBluetoothAdapterStateOption>(option?: T | undefined) => WechatMiniprogram.PromisifySuccessResult<T, WechatMiniprogram.GetBluetoothAdapterStateOption>;
export declare const openBluetoothAdapter: <T extends WechatMiniprogram.OpenBluetoothAdapterOption = WechatMiniprogram.OpenBluetoothAdapterOption>(option?: T | undefined) => WechatMiniprogram.PromisifySuccessResult<T, WechatMiniprogram.OpenBluetoothAdapterOption>;
export declare const closeBluetoothAdapter: <T extends WechatMiniprogram.CloseBluetoothAdapterOption = WechatMiniprogram.CloseBluetoothAdapterOption>(option?: T | undefined) => WechatMiniprogram.PromisifySuccessResult<T, WechatMiniprogram.CloseBluetoothAdapterOption>;
export declare const createBLEConnection: <T extends WechatMiniprogram.CreateBLEConnectionOption = WechatMiniprogram.CreateBLEConnectionOption>(option: T) => WechatMiniprogram.PromisifySuccessResult<T, WechatMiniprogram.CreateBLEConnectionOption>;
export declare const closeBLEConnection: <T extends WechatMiniprogram.CloseBLEConnectionOption = WechatMiniprogram.CloseBLEConnectionOption>(option: T) => WechatMiniprogram.PromisifySuccessResult<T, WechatMiniprogram.CloseBLEConnectionOption>;
export declare const getConnectedBluetoothDevices: <T extends WechatMiniprogram.GetConnectedBluetoothDevicesOption = WechatMiniprogram.GetConnectedBluetoothDevicesOption>(option: T) => WechatMiniprogram.PromisifySuccessResult<T, WechatMiniprogram.GetConnectedBluetoothDevicesOption>;
export declare const startBluetoothDevicesDiscovery: <T extends WechatMiniprogram.StartBluetoothDevicesDiscoveryOption = WechatMiniprogram.StartBluetoothDevicesDiscoveryOption>(option: T) => WechatMiniprogram.PromisifySuccessResult<T, WechatMiniprogram.StartBluetoothDevicesDiscoveryOption>;
export declare const stopBluetoothDevicesDiscovery: <T extends WechatMiniprogram.StopBluetoothDevicesDiscoveryOption = WechatMiniprogram.StopBluetoothDevicesDiscoveryOption>(option?: T | undefined) => WechatMiniprogram.PromisifySuccessResult<T, WechatMiniprogram.StopBluetoothDevicesDiscoveryOption>;
export declare const getBLEDeviceCharacteristics: <T extends WechatMiniprogram.GetBLEDeviceCharacteristicsOption = WechatMiniprogram.GetBLEDeviceCharacteristicsOption>(option: T) => WechatMiniprogram.PromisifySuccessResult<T, WechatMiniprogram.GetBLEDeviceCharacteristicsOption>;
export declare const getBLEDeviceServices: <T extends WechatMiniprogram.GetBLEDeviceServicesOption = WechatMiniprogram.GetBLEDeviceServicesOption>(option: T) => WechatMiniprogram.PromisifySuccessResult<T, WechatMiniprogram.GetBLEDeviceServicesOption>;
export declare const writeBLECharacteristicValue: <T extends WechatMiniprogram.WriteBLECharacteristicValueOption = WechatMiniprogram.WriteBLECharacteristicValueOption>(option: T) => WechatMiniprogram.PromisifySuccessResult<T, WechatMiniprogram.WriteBLECharacteristicValueOption>;
export declare const notifyBLECharacteristicValueChange: <T extends WechatMiniprogram.NotifyBLECharacteristicValueChangeOption = WechatMiniprogram.NotifyBLECharacteristicValueChangeOption>(option: T) => WechatMiniprogram.PromisifySuccessResult<T, WechatMiniprogram.NotifyBLECharacteristicValueChangeOption>;
export declare const readBLECharacteristicValue: <T extends WechatMiniprogram.ReadBLECharacteristicValueOption = WechatMiniprogram.ReadBLECharacteristicValueOption>(option: T) => WechatMiniprogram.PromisifySuccessResult<T, WechatMiniprogram.ReadBLECharacteristicValueOption>;
export declare const setBLEMTU: <T extends WechatMiniprogram.SetBLEMTUOption = WechatMiniprogram.SetBLEMTUOption>(option: T) => WechatMiniprogram.PromisifySuccessResult<T, WechatMiniprogram.SetBLEMTUOption>;
export declare const setStorage: <T = any, U extends WechatMiniprogram.SetStorageOption<T> = WechatMiniprogram.SetStorageOption<T>>(option: U) => WechatMiniprogram.PromisifySuccessResult<U, WechatMiniprogram.SetStorageOption<T>>;
export declare const getStorage: <T = any, U extends WechatMiniprogram.GetStorageOption<T> = WechatMiniprogram.GetStorageOption<T>>(option: U) => WechatMiniprogram.PromisifySuccessResult<U, WechatMiniprogram.GetStorageOption<T>>;
export declare const removeStorage: <T extends WechatMiniprogram.RemoveStorageOption = WechatMiniprogram.RemoveStorageOption>(option: T) => WechatMiniprogram.PromisifySuccessResult<T, WechatMiniprogram.RemoveStorageOption>;
export declare const getSystemInfoSync: () => WechatMiniprogram.SystemInfo;
/**
 * onBluetoothAdapterStateChange
 */
export declare const onBluetoothAdapterStateChange: (listener: WechatMiniprogram.OnBluetoothAdapterStateChangeCallback) => void;
export declare const offBluetoothAdapterStateChange: (listener?: WechatMiniprogram.OffBluetoothAdapterStateChangeCallback | undefined) => void;
/**
 * onBluetoothDeviceFound
 */
export declare const onBluetoothDeviceFound: (listener: WechatMiniprogram.OnBluetoothDeviceFoundCallback) => void;
export declare const offBluetoothDeviceFound: (listener: WechatMiniprogram.OnBluetoothDeviceFoundCallback) => void;
/**
 * onBLEConnectionStateChange
 */
export declare const onBLEConnectionStateChange: (listener: WechatMiniprogram.OnBLEConnectionStateChangeCallback) => void;
export declare const offBLEConnectionStateChange: (listener?: WechatMiniprogram.OffBLEConnectionStateChangeCallback | undefined) => void;
/**
 * onBLECharacteristicValueChange
 */
export declare const onBLECharacteristicValueChange: (listener: WechatMiniprogram.OnBLECharacteristicValueChangeCallback) => void;
export declare const offBLECharacteristicValueChange: (listener?: WechatMiniprogram.OffBLECharacteristicValueChangeCallback | undefined) => void;
