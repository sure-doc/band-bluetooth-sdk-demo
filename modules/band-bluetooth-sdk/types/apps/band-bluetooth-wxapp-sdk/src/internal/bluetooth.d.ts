export declare function getBluetooth(): {
    startBluetoothDevicesDiscovery: (options: WechatMiniprogram.StartBluetoothDevicesDiscoveryOption) => any;
    stopBluetoothDevicesDiscovery: (options: WechatMiniprogram.StopBluetoothDevicesDiscoveryOption | undefined) => any;
    openBluetoothAdapter: (option: Parameters<typeof wx.openBluetoothAdapter>[0]) => any;
    closeBluetoothAdapter: (option: Parameters<typeof wx.closeBluetoothAdapter>[0]) => any;
    writeBLECharacteristicValue: <T extends WechatMiniprogram.WriteBLECharacteristicValueOption = WechatMiniprogram.WriteBLECharacteristicValueOption>(option: T) => WechatMiniprogram.PromisifySuccessResult<T, WechatMiniprogram.WriteBLECharacteristicValueOption>;
    onBluetoothAdapterStateChange: (listener: WechatMiniprogram.OnBluetoothAdapterStateChangeCallback) => void;
    offBluetoothAdapterStateChange: (listener?: WechatMiniprogram.OffBluetoothAdapterStateChangeCallback | undefined) => void;
    onBLECharacteristicValueChange: (listener: WechatMiniprogram.OnBLECharacteristicValueChangeCallback) => void;
    offBLECharacteristicValueChange: (listener?: WechatMiniprogram.OffBLECharacteristicValueChangeCallback | undefined) => void;
    onBluetoothDeviceFound: (listener: WechatMiniprogram.OnBluetoothDeviceFoundCallback) => void;
    offBluetoothDeviceFound: (listener?: WechatMiniprogram.OffBluetoothDeviceFoundCallback | undefined) => void;
    onBLEConnectionStateChange: (listener: WechatMiniprogram.OnBLEConnectionStateChangeCallback) => void;
    offBLEConnectionStateChange: (listener?: WechatMiniprogram.OffBLEConnectionStateChangeCallback | undefined) => void;
    createBLEConnection: <T_1 extends WechatMiniprogram.CreateBLEConnectionOption = WechatMiniprogram.CreateBLEConnectionOption>(option: T_1) => WechatMiniprogram.PromisifySuccessResult<T_1, WechatMiniprogram.CreateBLEConnectionOption>;
    closeBLEConnection: <T_2 extends WechatMiniprogram.CloseBLEConnectionOption = WechatMiniprogram.CloseBLEConnectionOption>(option: T_2) => WechatMiniprogram.PromisifySuccessResult<T_2, WechatMiniprogram.CloseBLEConnectionOption>;
    getBluetoothAdapterState: (option?: WechatMiniprogram.GetBluetoothAdapterStateOption | undefined) => void;
    getConnectedBluetoothDevices: (option: WechatMiniprogram.GetConnectedBluetoothDevicesOption) => void;
    getBLEDeviceCharacteristics: (option: WechatMiniprogram.GetBLEDeviceCharacteristicsOption) => void;
    getBLEDeviceServices: (option: WechatMiniprogram.GetBLEDeviceServicesOption) => void;
    notifyBLECharacteristicValueChange: (option: WechatMiniprogram.NotifyBLECharacteristicValueChangeOption) => void;
    readBLECharacteristicValue: (option: WechatMiniprogram.ReadBLECharacteristicValueOption) => void;
    setBLEMTU: (option: WechatMiniprogram.SetBLEMTUOption) => void;
    getSystemInfoSync: () => WechatMiniprogram.SystemInfo;
    getStorage: <T_3 = any, U extends WechatMiniprogram.GetStorageOption<T_3> = WechatMiniprogram.GetStorageOption<T_3>>(option: U) => WechatMiniprogram.PromisifySuccessResult<U, WechatMiniprogram.GetStorageOption<T_3>>;
    setStorage: <T_4 = any, U_1 extends WechatMiniprogram.SetStorageOption<T_4> = WechatMiniprogram.SetStorageOption<T_4>>(option: U_1) => WechatMiniprogram.PromisifySuccessResult<U_1, WechatMiniprogram.SetStorageOption<T_4>>;
    removeStorage: <T_5 extends WechatMiniprogram.RemoveStorageOption = WechatMiniprogram.RemoveStorageOption>(option: T_5) => WechatMiniprogram.PromisifySuccessResult<T_5, WechatMiniprogram.RemoveStorageOption>;
};
