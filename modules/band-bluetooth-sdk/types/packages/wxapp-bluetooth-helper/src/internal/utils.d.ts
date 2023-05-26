export declare enum SystemPlatform {
    Ios = "ios",
    Android = "android"
}
export declare function getMethod<T, Method extends keyof T>(getObj: () => T, method: Method): T[Method];
export declare function getPlatform(): SystemPlatform;
export declare function isIos(): boolean;
export declare function isAndroid(): boolean;
