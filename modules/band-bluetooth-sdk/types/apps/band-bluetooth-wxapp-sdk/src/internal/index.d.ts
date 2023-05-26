export { SERVICES } from './constant';
export * from './error';
export { init, onInitialized, Init } from './init';
export { parseQrcode } from './parseQrcode';
export * as dataHelper from './dataHelper';
export { getDeviceMacInfo, getDeviceMacInfoList } from './deviceMac';
export type { DeviceMac } from './deviceMac';
export { getAllDeviceStorage } from './deviceStorage/getAllDeviceStorage';
export { clearDeviceStorage } from './deviceStorage/clearDeviceStorage';
export type { DeviceStorage } from './deviceStorage/deviceStorage';
export { bindDevice, bindDeviceObservable, BindDevice } from './bindDevice';
export { connectAndBindDevice, ConnectAndBindDevice } from './bindDevice';
export { unbindDevice } from './bindDevice';
export { connectDevice } from './deviceConnection';
export { disconnectDevice } from './deviceConnection';
export { getConnectionState } from './deviceConnection';
export {
  onConnectionStateChange,
  onConnectionStateChangeObservable,
  onConnectionConnectedChange,
  onConnectionConnectedChangeObservalbe,
  getConnectedDevices,
} from './deviceConnection';
export type { OnConnectionStateChange, OnConnectionConnectedChange } from './deviceConnection';
export { getMobileDeviceMac } from './deviceConnection';
export { scanDevice, scanDeviceObservable, getScanDevices } from './scanDevice';
export type { ScanDevice } from './scanDevice';
export { startDataSync } from './dataSync/startDataSync';
export { StartDataSync } from './dataSync/startDataSync';
export { onUploadData } from './dataSync/onUploadData';
export type { OnUploadData } from './dataSync/onUploadData';
export { onEvent, onEventObservable } from './dataSync/event';
export { Event } from './dataSync/event';
export { requestDevice, requestDeviceGetFile } from './requestDevice';
export type { RequestDevice } from './requestDevice';
export type { GpsInfo, LogcationInfo } from './gps';
export { onGpsStartRequest, onGpsStopRequest, updateLocationInfo, updateGpsStatus, GpsStatus } from './gps';
export { startUpgrade } from './ota';
export type { StartUpgrade } from './ota';
export { parseAdvertisData } from '@apps/lifesense-wxapp-sdk';
export { isSupportFileUpdateEvent } from './utils/isSupportFileUpdateEvent';
