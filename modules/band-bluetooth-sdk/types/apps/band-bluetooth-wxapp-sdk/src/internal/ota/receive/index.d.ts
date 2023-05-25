export interface ReceiveData<T = any> {
    deviceId: string;
    commandId: number;
    originData: ArrayBuffer;
    dataLength: number;
    data: T;
}
export declare function onReceiveData({ deviceId }: {
    deviceId: string;
}): import("rxjs").Observable<ReceiveData<any>>;
