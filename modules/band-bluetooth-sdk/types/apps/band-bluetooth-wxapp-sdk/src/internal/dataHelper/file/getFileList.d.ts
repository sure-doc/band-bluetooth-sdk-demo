import { getFlieListReqRsp_t } from '../types';
import { FileType } from './types';
/** 获取文件列表 */
export interface GetFileListRequest {
    fileType: FileType;
}
/** 获取文件列表 返回值 */
export interface GetFileListResponse {
    /**
     * 获取文件类型，枚举值，详见8.7 文件类型定义
     */
    fileType: FileType;
    /** 请求log文件列表 */
    fileList: string[];
    /** 错误码，出现错误时设置 */
    errorCode: number;
}
export declare function parseGetFileList(getFileListRequest: GetFileListRequest): getFlieListReqRsp_t;
export declare function formatGetFileList(getFlieListReqRsp_t: getFlieListReqRsp_t): GetFileListResponse;
