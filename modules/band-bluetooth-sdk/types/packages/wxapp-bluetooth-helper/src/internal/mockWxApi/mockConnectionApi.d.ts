export declare function mockConnectionApi(): {
    onBLEConnectionStateChange: (listener: WechatMiniprogram.OnBLEConnectionStateChangeCallback) => void;
    offBLEConnectionStateChange: (listener?: WechatMiniprogram.OffBLEConnectionStateChangeCallback | undefined) => void;
    createBLEConnection: <T extends WechatMiniprogram.CreateBLEConnectionOption = WechatMiniprogram.CreateBLEConnectionOption>(option: T) => WechatMiniprogram.PromisifySuccessResult<T, WechatMiniprogram.CreateBLEConnectionOption>;
    closeBLEConnection: <T_1 extends WechatMiniprogram.CloseBLEConnectionOption = WechatMiniprogram.CloseBLEConnectionOption>(option: T_1) => WechatMiniprogram.PromisifySuccessResult<T_1, WechatMiniprogram.CloseBLEConnectionOption>;
};
