import { ConnectDevice, ConnectionState, DisconnectDevice, OnConnectionConnectedChange, OnConnectionStateChange } from './types';
export declare class DeviceConnectionManager {
    private deviceConnectionMap;
    private connectionStateChange$;
    /** 连接设备 Observable */
    connectDeviceObservable({ mac, ...rest }: ConnectDevice.Option): import("rxjs").Observable<void>;
    /** 连接设备 */
    connectDevice(option: ConnectDevice.Option): Promise<void>;
    /** 断开连接 */
    disconnectDevice({ mac }: DisconnectDevice.Option): Promise<import("@apps/lifesense-wxapp-sdk/types/bean/Response").default>;
    /** 获取连接状态 */
    getConnectionState({ mac }: {
        mac: string;
    }): ConnectionState;
    /** 监听连接状态变更 Observable */
    onConnectionStateChangeObservable({ mac }: Omit<OnConnectionStateChange.Option, 'onChange'>): import("rxjs").Observable<{
        mac: string;
        state: ConnectionState;
        prevState: ConnectionState;
    }>;
    /** 监听连接状态变更 */
    onConnectionStateChange(option: OnConnectionStateChange.Option): () => void;
    /** 监听是否已连接状态变更 Observable */
    onConnectionConnectedChangeObservalbe(option: Omit<OnConnectionConnectedChange.Option, 'onChange'>): import("rxjs").Observable<{
        mac: string;
        connected: boolean;
    }>;
    /** 监听是否已连接状态变更 Observable */
    onConnectionConnectedChange({ onChange, ...rest }: OnConnectionConnectedChange.Option): () => void;
    /** 获取处于已连接状态的设备 */
    getConnectedDevices(): string[];
    private getDeviceConnection;
    private getAndInitDeviceConnection;
}
