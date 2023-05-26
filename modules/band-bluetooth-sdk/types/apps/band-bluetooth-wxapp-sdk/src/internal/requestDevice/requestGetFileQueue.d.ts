import { TaskExecuter } from '@my/queue';
import { fileChunkSendRequest, fileSendCancel_t, fileSendComplete_t, FileSendRequest_t } from '../dataHelper/types';
import { StartDataSync } from '../dataSync/startDataSync';
export declare function receiveFile(info: {
    mac: string;
    data: StartDataSync.UploadData;
}): void;
export declare enum ReceiveFileStatus {
    Request = "request",
    SendChunk = "sendChunk",
    SendComplete = "sendComplete",
    Complete = "complete",
    Cancel = "cancel",
    Timeout = "timeout"
}
export type ReceiveFileInfo = {
    status: ReceiveFileStatus.Request;
    data: FileSendRequest_t;
} | {
    status: ReceiveFileStatus.SendChunk;
    data: fileChunkSendRequest;
} | {
    status: ReceiveFileStatus.SendComplete;
    data: fileSendComplete_t;
} | {
    status: ReceiveFileStatus.Complete;
    data: StartDataSync.UploadFileData;
} | {
    status: ReceiveFileStatus.Cancel;
    data: fileSendCancel_t;
} | {
    status: ReceiveFileStatus.Timeout;
};
export declare function requestGetFileInQueue<Result>({ mac, requestDevice, onReceiveFile, }: {
    mac: string;
    requestDevice: TaskExecuter<Result>;
    onReceiveFile?: (info: ReceiveFileInfo) => void;
}): Promise<any>;
