import Taro from '@tarojs/taro';
import { makeAutoObservable, runInAction } from 'mobx';
import { dataHelper, requestDevice } from 'band-bluetooth-sdk';

export class DeviceInfoStore {
  mac!: string;

  deviceInfo?: dataHelper.DeviceInfo;

  constructor() {
    makeAutoObservable(this);
  }

  async init({ mac }: { mac: string }) {
    this.mac = mac;

    Taro.showLoading({ title: '加载中...', mask: true });

    await this.loadDeviceInfo();

    Taro.hideLoading();
  }

  private async loadDeviceInfo() {
    const resp = await requestDevice({
      mac: this.mac,
      requestType: 'GetDeviceInfo',
    });

    runInAction(() => {
      this.deviceInfo = resp;
    });
  }
}
