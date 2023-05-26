/// <reference types="miniprogram-api-typings" />
import { ConnectDevice, DeviceConnectionState, DisconnectDevice, OnConnectionConnectedChange, OnConnectionStateChange, GetLatestConnectedDevices, GetConnectionState } from './types';
export declare class DeviceConnectionMananger {
    private deviceConnectionMap;
    private connectionStateChange$;
    constructor();
    /**
     * 连接设备
     *
     * Example:
     * ```ts
     * await connectDevice({ deviceId: '' })
     * ```
     */
    connectDevice({ deviceId, timeout }: ConnectDevice.Option): Promise<undefined>;
    /**
     * 断开连接设备
     *
     * Example:
     * ```ts
     * await disconnectDevice({ deviceId: '' })
     * ```
     */
    disconnectDevice({ deviceId }: DisconnectDevice.Option): Promise<void>;
    /**
     * 获取设备连接状态
     *
     * Example:
     * ```ts
     * const { connected, connectedUpdatedTs } = getConnectionState({ deviceId: '' })
     * ```
     */
    getConnectionState({ deviceId }: GetConnectionState.Option): {
        connected: boolean;
        connecting: boolean;
    };
    /**
     * 监听连接状态变更, 包括连接中(connecting)状态
     *
     * Example:
     * ```ts
     * onConnectionStateChange({
     *   deviceId: '', // 指定监听的 deviceId，不传则监听所有设备
     *   onStateChange: (state, prevState) => {
     *     // do something
     *     const { deviceId, connected, connecting } = current;
     *   }
     * })
     * ```
     */
    onConnectionStateChange({ deviceId, onStateChange }: OnConnectionStateChange.Option): () => void;
    onConnectionConnectedChangeObservable({ deviceId }?: {
        deviceId?: string;
    }): import("rxjs").Observable<{
        deviceId: string;
        connected: boolean;
    }>;
    /**
     *
     * 监听连接状态变更
     *
     * Example:
     * ```ts
     * onConnectionStateChange({
     *   deviceId: '', // 指定监听的 deviceId，不传则监听所有设备
     *   onStateChange: ({ deviceId, connected }) => {
     *     // do something
     *   }
     * })
     * ```
     */
    onConnectionConnectedChange({ deviceId, onConnectedChange }: OnConnectionConnectedChange.Option): () => void;
    /**
     * 获取当前已连接设备
     */
    getConnectedDevices(): {
        deviceId: string;
    }[];
    /**
     * 获取最新已连接设备
     *
     * 调用 getConnectedBluetoothDevices 更新
     */
    getLatestConnectedDevices({ services }: GetLatestConnectedDevices.Option): Promise<WechatMiniprogram.BluetoothDeviceInfo[]>;
    onConnectionStateChangeObservable({ deviceId }?: {
        deviceId?: string;
    }): import("rxjs").Observable<{
        deviceId: string;
        state: DeviceConnectionState;
        prevState: DeviceConnectionState;
    }>;
}
