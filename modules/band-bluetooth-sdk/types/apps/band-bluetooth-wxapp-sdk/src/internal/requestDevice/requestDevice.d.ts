import { RequestByAliceRequestOptions } from './requestByAliceRequest';
import { GetRequestData, RequestType, AllRequestType, GetResponseData } from './config';
import { ReceiveFileInfo } from './requestGetFileQueue';
export declare namespace RequestDevice {
    /**
     * requestDevice options
     */
    interface RequestDeviceOptions<Type extends RequestType> {
        mac: string;
        requestType: Type;
        data?: GetRequestData<AllRequestType[Type]>;
        /** 是否响应 */
        isRsp?: boolean;
        /** isRsp 为 true 时，必填 */
        seq?: number;
        onReceiveFile?: (receiveFileInfo: ReceiveFileInfo) => void;
    }
    /**
     * requestDevice result
     */
    type RequestDeviceResult<Type extends RequestType> = GetResponseData<AllRequestType[Type]>;
    /**
     * requestDeviceNative optins
     */
    type RequestDeviceNativeOptions = Omit<RequestByAliceRequestOptions, 'deviceId'> & {
        mac: string;
    };
}
export type RequestDevice = typeof requestDevice;
/**
 * requestDevice
 */
export declare function requestDevice<Type extends RequestType>({ mac, requestType, data, isRsp, seq, onReceiveFile, }: RequestDevice.RequestDeviceOptions<Type>): Promise<RequestDevice.RequestDeviceResult<Type>>;
