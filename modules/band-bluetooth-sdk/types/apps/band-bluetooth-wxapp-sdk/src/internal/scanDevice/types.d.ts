import { CommonErrorCode } from '../error';
export declare namespace ScanDevice {
    interface ScanResult {
        /**
         * 蓝牙设备名称，某些设备可能没有
         */
        name: string;
        /**
         * 当前蓝牙设备的广播数据段中的 LocalName 数据段
         */
        localName: string;
        /**
         * 用于区分设备的id，安卓为mac地址，IOS为系统分配的唯一ID
         */
        deviceId: string;
        /**
         * 当前蓝牙设备的广播数据段中的 advertisData 数据段
         */
        advertisData: ArrayBuffer;
        /**
         * 当前蓝牙设备的广播数据段中的 ServiceUUIDs 数据段
         */
        serviceUUIDs: Array<string>;
        /**
         * 当前蓝牙设备的信号强度
         */
        RSSI: number;
        /**
         * 当前蓝牙设备的广播数据段中的 ServiceData 数据段
         */
        serviceData: object;
        /**
         * 设备mac地址
         */
        mac: string;
        /**
         * 扫描到的时间
         */
        timestamp: Date;
    }
    type OnDeviceFound = (result: ScanResult) => void;
    interface Option {
        /** 要搜索的蓝牙设备主 service 的 uuid 列表。某些蓝牙设备会广播自己的主 service 的 uuid。如果设置此参数，则只搜索广播包有对应 uuid 的主服务的蓝牙设备。建议主要通过该参数过滤掉周边不需要处理的其他蓝牙设备。 */
        services?: string[];
        /** 是否允许重复上报同一设备。如果允许重复上报，则 wx.onBlueToothDeviceFound 方法会多次上报同一设备，但是 RSSI 值会有不同。 默认为true */
        allowDuplicatesKey?: boolean;
        /** 搜索指定 mac，默认空，扫描所有设备 */
        mac?: string;
        /** 是否扫描到首个设备则停止扫描，默认 false */
        first?: boolean;
        /** 超时时间 ms, 默认不超时 */
        timeout?: number;
        /** 需要扫描蓝牙设备名称 */
        deviceName?: string;
        /** 扫描到设备回调 */
        onDeviceFound: OnDeviceFound;
    }
    type ErrorCode = CommonErrorCode.BadParams;
    const Error: {
        new (message: string, code?: CommonErrorCode.BadParams | undefined, data?: any): {
            code: CommonErrorCode.BadParams;
            data?: any;
            name: string;
            message: string;
            stack?: string | undefined;
            cause?: unknown;
        };
        captureStackTrace(targetObject: object, constructorOpt?: Function | undefined): void;
        prepareStackTrace?: ((err: Error, stackTraces: NodeJS.CallSite[]) => any) | undefined;
        stackTraceLimit: number;
    };
}
