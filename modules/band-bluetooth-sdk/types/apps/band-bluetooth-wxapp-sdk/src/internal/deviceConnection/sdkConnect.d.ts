import { Observable } from 'rxjs';
export declare function sdkConnectDeviceObservable({ deviceId, timeout: _timeout }: {
    deviceId: string;
    timeout?: number;
}): Observable<void>;
export declare function sdkDisconnectDevice(deviceId: string): Promise<import("@apps/lifesense-wxapp-sdk/types/bean/Response").default>;
