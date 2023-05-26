import { Observable } from 'rxjs';
import { ReceiveData } from '../receive';
export declare function sendOtaFile({ deviceId, otaFile, DataConfig, receiveData$, }: {
    deviceId: string;
    otaFile: ArrayBuffer;
    DataConfig: ReceiveData;
    /** 已发送的数据长度 */
    allSendDataLength?: number;
    /** 下次发送的偏移量 */
    offsetNext?: number;
    receiveData$: Observable<ReceiveData<any>>;
}): Observable<ReceiveData<any>>;
