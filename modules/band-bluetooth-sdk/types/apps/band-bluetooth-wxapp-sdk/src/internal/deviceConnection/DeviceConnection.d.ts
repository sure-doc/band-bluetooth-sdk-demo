import { Observable } from 'rxjs';
import { ConnectionState } from './types';
export declare class DeviceConnection {
    mac: string;
    private state$;
    private connectRequest$;
    private connectError$;
    private connectSuccess$;
    private destroy$;
    private disconnectRequest$;
    private bleDisconnected$;
    private onStateChange$;
    constructor({ mac }: {
        mac: string;
    });
    /** 连接设备 Observable */
    connectObservable({ timeout: _timeout }: {
        timeout?: number;
    }): Observable<void>;
    /** 断开连接 */
    disconnect(): Promise<import("@apps/lifesense-wxapp-sdk/types/bean/Response").default>;
    /** 获取状态 */
    getState(): ConnectionState;
    /** 监听连接状态 */
    onStateChangeObservable(): Observable<{
        prevState: ConnectionState;
        state: ConnectionState;
    }>;
    destroy(): void;
}
export declare function getInitConnectionState(): ConnectionState;
