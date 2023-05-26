import Taro from '@tarojs/taro';
import { makeAutoObservable, runInAction } from 'mobx';
import { scanDevice, connectAndBindDevice, ScanDevice, connectDevice, disconnectDevice } from 'band-bluetooth-sdk';
import { RootStore } from '@/packages/mobx-rootstore';
import { DeviceDemoStore } from '../index.store';
import { getUserInfo } from '@/utils/localstorage';
import { navigateTo } from '../services';

export class ScanDevicesStore {
  scanDeviceMap = new Map<string, ScanDevice.ScanResult>();

  deviceDemoStore: DeviceDemoStore;
  stopScanDevice?: () => void;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);

    this.deviceDemoStore = rootStore.getStore(DeviceDemoStore);
  }

  get scanDeviceList() {
    return Array.from(this.scanDeviceMap.values()).map((device) => ({
      device,
      state: this.deviceDemoStore.deviceConnectionStateMap[device.mac] ?? { connected: false, connecting: false },
    }));
  }

  scan() {
    /** 已经在扫描就不用重复扫描了 */
    if (this.stopScanDevice) return;
    this.stopScanDevice = scanDevice({
      onDeviceFound: (device) => {
        runInAction(() => {
          this.scanDeviceMap.set(device.deviceId, device);
        });
      },
    });
  }

  stopScan() {
    if (this.stopScanDevice) {
      this.stopScanDevice();
      this.stopScanDevice = undefined;
    }
  }

  connectDevice(device: ScanDevice.ScanResult) {
    connectDevice({ mac: device.mac });
  }

  disconnectDevice(device: ScanDevice.ScanResult) {
    disconnectDevice({ mac: device.mac });
  }

  async connectAndBindDevice(device: ScanDevice.ScanResult) {
    Taro.showLoading({
      title: '请在手环上确认继续',
      mask: true,
    });

    const userInfo = await getUserInfo();

    const resp = await connectAndBindDevice({
      mac: device.mac,
      userId: userInfo.name,
      language: this.deviceDemoStore.languageConfig,
      onConfirmBind: async () => {
        return {
          success: true,
        };
      },
      onStateChange: ({ state }) => {
        console.info('bindDevice onStateChange:', state);
      },
    }).catch((error) => ({ error }));

    Taro.hideLoading();
    if ('error' in resp) {
      console.info('绑定失败', resp.error);
      Taro.showToast({ title: '绑定失败' });
    } else {
      Taro.showToast({ title: '绑定成功' });
      Taro.navigateBack();
    }
  }

  /** 导航到 设备详情 */
  navigateToDeviceDetial(device: ScanDevice.ScanResult) {
    navigateTo({
      url: `device/index?mac=${device.mac}`,
    });
  }
}
