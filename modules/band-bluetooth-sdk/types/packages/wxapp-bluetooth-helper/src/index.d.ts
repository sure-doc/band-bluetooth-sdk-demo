export { initBluetoothHelper, destroyBluetoothHelper } from './internal/initBluetoothHelper';
export { InitBluetoothHelper } from './internal/initBluetoothHelper';
export { mockWxBluetoothApi } from './internal/mockWxApi';
export { openBluetoothAdapter, closeBluetoothAdapter, checkBluetoothAdapterOpenedState, onBluetoothAdapterOpenStateChange, onBluetoothAdapterOpenedChange, onBluetoothAdapterOpenedChangeObservable, getBluetoothAdapterOpenState, } from './internal/bluetoothAdapter';
export { getBluetoothAdapterState, onBluetoothAdapterStateChange, getBluetoothAdapterAvailable, onBluetoothAdapterAvailableChange, } from './internal/adapterState';
export type { GetBluetoothAdapterState, GetBluetoothAdapterAvailable, OnBluetoothAdapterStateChange, OnBluetoothAdapterAvailableChange, } from './internal/adapterState';
export type { AdapterState } from './internal/adapterState';
export { scanDevices, scanDevicesObservable } from './internal/scan';
export type { ScanDevices, ScanDevicesObservable } from './internal/scan';
export type { DeviceConnection, DeviceConnectionState } from './internal/connection';
export { connectDevice, disconnectDevice, getConnectionState, getConnectedDevices, getLatestConnectedDevices, onConnectionStateChange, onConnectionStateChangeObservable, onConnectionConnectedChange, onConnectionConnectedChangeObservable, } from './internal/connection';
export type { ConnectDevice, DisconnectDevice, GetConnectionState, GetConnectedDevices, GetLatestConnectedDevices, OnConnectionStateChange, OnConnectionConnectedChange, } from './internal/connection';
export { onBLECharacteristicValueChange, offBLECharacteristicValueChange, onBLEConnectionStateChange, offBLEConnectionStateChange, } from './internal/bluetooth';
export type { BluetoothApis } from './internal/bluetooth/apis';
export { getServicesObservable, getCharacteristicsObservable, notifyCharacteristicValueChangeObservable, writeCharacteristicValue, onBLECharacteristicValueChangeObservable, } from './internal/services';
export type { WriteCharacteristicValue } from './internal/services';
export * from './internal/error';
export { checkBluetooth } from './internal/checkBluetooth';
export type { CheckBluetoothResult } from './internal/checkBluetooth';
