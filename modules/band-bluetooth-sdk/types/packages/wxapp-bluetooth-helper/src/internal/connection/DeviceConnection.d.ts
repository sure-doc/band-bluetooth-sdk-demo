import { Observable } from 'rxjs';
export declare class DeviceConnection {
    deviceId: string;
    private state$;
    private expectConnected$;
    private connectRequest$;
    private connectError$;
    private connectSuccess$;
    private createConnectionStart$;
    private currentRequestId$;
    private disconnectRequest$;
    private disconnected$;
    private changeState$;
    private onStateChange$;
    private destroy$;
    constructor({ deviceId }: {
        deviceId: string;
    });
    /** 获取当前状态 */
    getState(): {
        connected: boolean;
        connecting: boolean;
    };
    /**
     * 连接设备
     *
     * Example:
     * ```ts
     * await connectDeviceObservable({ deviceId: '' })
     * ```
     */
    connectDeviceObservable({ timeout: _timeout }: {
        timeout?: number;
    }): Observable<undefined>;
    /**
     * 断开连接设备
     *
     * Example:
     * ```ts
     * await disconnectDevice({ deviceId: '' })
     * ```
     */
    disconnectDevice(): Promise<{
        success: WechatMiniprogram.BluetoothError;
        error: undefined;
    }>;
    onStateChangeObservable(): Observable<{
        state: {
            connected: boolean;
            connecting: boolean;
        };
        prevState: {
            connected: boolean;
            connecting: boolean;
        };
    }>;
    changeState({ connected }: {
        connected: boolean;
    }): void;
    destroy(): void;
}
