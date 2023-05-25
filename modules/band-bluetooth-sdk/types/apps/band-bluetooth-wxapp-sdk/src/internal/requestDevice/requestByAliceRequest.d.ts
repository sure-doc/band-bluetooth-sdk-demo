export interface RequestByAliceRequestOptions {
    deviceId: string;
    timeout?: number;
    categoryId: number;
    commandId: number;
    request?: SendDeviceRequest;
    response?: {
        root: any;
        lookup: string;
    };
    /** 是否响应 */
    isRsp?: boolean;
    /** isRsp 为 true 时，必填 */
    seq?: number;
}
/** 发送请求 */
export declare function requestByAliceRequest(options: RequestByAliceRequestOptions): Promise<any>;
/** 获取请求 buffer */
declare function getRequestBuffer({ buffer, root, lookup, data }: {
    root?: any;
    lookup?: string;
    data?: any;
    buffer?: any;
}): any;
type SendDeviceRequest = Parameters<typeof getRequestBuffer>[0];
export {};
