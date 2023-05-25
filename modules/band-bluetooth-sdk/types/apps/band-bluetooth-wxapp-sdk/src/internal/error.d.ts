export declare enum CommonErrorCode {
    Unknow = 10001,
    BadParams = 10002,
    OpenBluetoothAdapterError = 10003
}
export declare enum InitErrorCode {
    /** 初始化中 */
    Initializing = 20002,
    /** 初始化蓝牙模块异常 */
    InitBluetoothError = 20003,
    /** 已经初始化 */
    Initialized = 20004
}
export declare enum ConnectionErrorCode {
    Timeout = 30002,
    AlreadyConnecting = 30003,
    AlreadyConnected = 30004,
    NotConnected = 30005,
    NotFoundDevice = 30006
}
export declare enum BindDeviceErrorCode {
    /** 找不到设备 */
    NotFoundDevice = 40002,
    /** 设备未连接 */
    NotConnected = 40003,
    /** 用户拒绝 */
    UserDeny = 40004,
    /** 设备拒绝绑定，正在充电中 */
    DeviceCharging = 40005,
    /** 设备拒绝绑定，已被其他用户绑定 */
    DeviceAlreadyBind = 40006,
    /** onConfirmBind 发生异常 */
    OnConfirmBindError = 40007,
    /** onConfirmBind 函数返回结果中 success 不为 true */
    OnConfirmBindResultNotSuccess = 40008
}
export declare enum OtaErrorCode {
    /** 找不到设备 */
    NotFoundDevice = 50001,
    /** 操作成功，可进行下一步操作 */
    Success = 0,
    /** 校验失败 */
    ErrVerify = 50011,
    /** 版本错误/不支持的升级文件 */
    ErrVersion = 50002,
    /** 设备端存储数据出错，致命硬件错误 */
    ErrStorage = 50003,
    /** 设备端无法分配足够内存继续OTA流程 */
    ErrNoMem = 50004,
    /** 设备端解压流程状态出错 */
    ErrDecompress = 50005,
    /** 电量不足进行下一步操作 */
    ErrBattery = 50006,
    /** 设备端状态错误/流程错误 */
    ErrStatus = 50007,
    /** 下发0x02失败 */
    Send0x02Fail = 50008,
    /** 下发OTA文件数据包出错 */
    SendA703Fail = 50009,
    Timeout = 50010
}
