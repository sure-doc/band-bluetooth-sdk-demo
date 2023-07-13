/// <reference types="miniprogram-api-typings" />
export { destroyDeviceConnectManager } from './getDeviceConnectionMananger';
export type { DeviceConnectionState, DeviceConnection, ConnectDevice, DisconnectDevice, OnConnectionConnectedChange, OnConnectionStateChange, GetConnectedDevices, GetConnectionState, GetLatestConnectedDevices, } from './types';
export declare const connectDevice: ({ deviceId, timeout }: import("./types").ConnectDevice.Option) => Promise<undefined>;
export declare const disconnectDevice: ({ deviceId }: import("./types").DisconnectDevice.Option) => Promise<void>;
export declare const getConnectionState: ({ deviceId }: import("./types").GetConnectionState.Option) => {
    connected: boolean;
    connecting: boolean;
};
export declare const onConnectionStateChange: ({ deviceId, onStateChange }: import("./types").OnConnectionStateChange.Option) => () => void;
export declare const onConnectionStateChangeObservable: ({ deviceId }?: {
    deviceId?: string | undefined;
}) => import("rxjs").Observable<{
    deviceId: string;
    state: import("./types").DeviceConnectionState;
    prevState: import("./types").DeviceConnectionState;
}>;
export declare const onConnectionConnectedChange: ({ deviceId, onConnectedChange }: import("./types").OnConnectionConnectedChange.Option) => () => void;
export declare const onConnectionConnectedChangeObservable: ({ deviceId }?: {
    deviceId?: string | undefined;
}) => import("rxjs").Observable<{
    deviceId: string;
    connected: boolean;
}>;
export declare const getConnectedDevices: () => {
    deviceId: string;
}[];
export declare const getLatestConnectedDevices: ({ services }: import("./types").GetLatestConnectedDevices.Option) => Promise<WechatMiniprogram.BluetoothDeviceInfo[]>;
