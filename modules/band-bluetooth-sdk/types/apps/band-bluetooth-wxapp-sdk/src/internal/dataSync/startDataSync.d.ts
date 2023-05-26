import { FileHeader } from '@apps/lifesense-wxapp-sdk';
import { FileType, UserInfo } from '../dataHelper';
export declare namespace StartDataSync {
    interface FileData {
        /** 文件名称 */
        fileName: string;
        /** 文件类型 */
        fileType: FileType;
        /** 文件头，不一定有 */
        fileHeader?: FileHeader;
        /** 文件列表 */
        fileList: any[];
    }
    interface NormalData<Data = any> {
        /** 类别 id */
        categoryId: number;
        /** 命令 id */
        commandId: number;
        /** 数据 */
        data: Data;
        /** 是否请求 */
        isReq: boolean;
        /** 是否响应 */
        isRsp: boolean;
        /** 序号 */
        seq: number;
    }
    enum UploadDataType {
        Normal = "normal",
        File = "file"
    }
    /** 公共字段 */
    interface UploadCommonData {
        /** 时间戳 */
        ts: number;
    }
    interface UploadNormalData<Data = any> extends UploadCommonData, NormalData<Data> {
        type: UploadDataType.Normal;
    }
    interface UploadFileData extends UploadCommonData, FileData {
        type: UploadDataType.File;
    }
    type UploadData = UploadNormalData | UploadFileData;
    interface Options {
        mac: string;
        userInfo?: UserInfo;
    }
}
export interface DataReportData<PbInfo = object> {
    /** 类别 id */
    categoryId: number;
    /** 命令 id */
    commandId: number;
    /** 是否请求 */
    isReq: boolean;
    /** 是否响应 */
    isRsp: boolean;
    /** arrayBuffer */
    pbArrayBuffer: ArrayBuffer;
    /** 解析后的数据 */
    pbInfo?: PbInfo;
    /** 序号 */
    seq: number;
}
export declare function startDataSyncObservable({ mac, userInfo }: StartDataSync.Options): import("rxjs").Observable<import("@apps/lifesense-wxapp-sdk/types/bean/Response").default>;
/**
 * 开启同步数据
 */
export declare function startDataSync({ mac, userInfo }: StartDataSync.Options): Promise<import("@apps/lifesense-wxapp-sdk/types/bean/Response").default>;
export default startDataSync;
