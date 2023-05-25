import { StartDataSync } from '../dataSync/startDataSync';
import { RequestType } from './config';
import { RequestDevice } from './requestDevice';
/**
 * 请求设备获取文件
 */
export declare function requestDeviceGetFile<Type extends RequestType>(options: RequestDevice.RequestDeviceOptions<Type>): Promise<StartDataSync.UploadFileData>;
