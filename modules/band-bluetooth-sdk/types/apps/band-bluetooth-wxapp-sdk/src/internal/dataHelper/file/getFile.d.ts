import { getFlieRequest_t } from '../types';
/** 获取文件 */
export interface GetFileRequest {
    fileName: string;
    fileType: number;
}
export declare function parseGetFileRequest(getFileRequest: GetFileRequest): getFlieRequest_t;
