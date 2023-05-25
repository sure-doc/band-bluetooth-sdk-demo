import { StartDataSync } from './startDataSync';
export declare namespace OnUploadData {
    interface Result {
        data: StartDataSync.UploadData;
        mac: string;
    }
}
export declare function emitUploadData({ data, deviceId }: {
    data: StartDataSync.UploadData;
    deviceId: string;
}): void;
export declare function onUploadData({ onUpload }: {
    onUpload: (result: OnUploadData.Result) => void;
}): () => void;
