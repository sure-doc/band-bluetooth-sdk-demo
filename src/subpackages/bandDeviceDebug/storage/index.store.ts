import { makeAutoObservable } from 'mobx';
import {
  getAllDeviceStorage,
  DeviceStorage,
  clearDeviceStorage,
  getDeviceMacInfoList,
  DeviceMac,
} from 'band-bluetooth-sdk';
import { RootStore } from '@/packages/mobx-rootstore';

export class DeviceDemoStorageStore {
  deviceStorage?: DeviceStorage[];

  deviceMacInfo?: DeviceMac.DeviceMacInfoList;

  constructor(_rootStore: RootStore) {
    makeAutoObservable(this);
  }

  init() {
    this.loadDeviceStorage();
    this.loadDeviceMacInfo();
  }

  loadDeviceStorage() {
    this.deviceStorage = getAllDeviceStorage();
  }

  loadDeviceMacInfo() {
    this.deviceMacInfo = getDeviceMacInfoList();
  }

  /**
   * 清除设备缓存
   */
  clearDeviceStorage() {
    clearDeviceStorage();
  }
}
