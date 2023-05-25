export declare function mockBluetoothDevicesDiscovery(): {
    startBluetoothDevicesDiscovery: (options: WechatMiniprogram.StartBluetoothDevicesDiscoveryOption) => any;
    stopBluetoothDevicesDiscovery: (options: WechatMiniprogram.StopBluetoothDevicesDiscoveryOption | undefined) => any;
    onBluetoothDeviceFound: (listener: WechatMiniprogram.OnBluetoothDeviceFoundCallback) => void;
    offBluetoothDeviceFound: (listener?: WechatMiniprogram.OffBluetoothDeviceFoundCallback | undefined) => void;
};
