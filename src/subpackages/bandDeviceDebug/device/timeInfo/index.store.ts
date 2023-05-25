import Taro from '@tarojs/taro';
import { makeAutoObservable, runInAction } from 'mobx';
import { RootStore } from '@/packages/mobx-rootstore';
import { dataHelper, requestDevice } from 'band-bluetooth-sdk';
import dayjs from 'dayjs';

export class DeviceTimeInfoStore {
  mac: string;

  deviceTime?: dataHelper.DeviceTime;
  customTime: { hour: number; minute: number };

  constructor(_rootStore: RootStore, { mac }: { mac: string }) {
    this.mac = mac;
    this.customTime = {
      hour: dayjs().hour(),
      minute: dayjs().minute(),
    };
    makeAutoObservable(this);
  }

  async init() {
    Taro.showLoading({ title: '加载中...', mask: true });

    await this.loadDeviceTime();

    Taro.hideLoading();
  }

  async refreshDeviceTime() {
    Taro.showLoading({ title: '重新获取中...', mask: true });

    await this.loadDeviceTime();

    Taro.hideLoading();
  }

  async syncTimeToDevice() {
    await this.setDeviceTime(new Date().getTime());
  }

  changeCustomTime(customTime: { hour: number; minute: number }) {
    console.info(`changeCustomTime: customTime=${JSON.stringify(customTime)}`);
    this.customTime = customTime;
  }

  async sendCustomTimeToDevice() {
    await this.setDeviceTime(dayjs().hour(this.customTime.hour).minute(this.customTime.minute).valueOf());
  }

  private async loadDeviceTime() {
    console.info('GetDeviceTime');
    const resp = await requestDevice({
      mac: this.mac,
      requestType: 'GetDeviceTime',
    });
    console.info('GetDeviceTime', resp);

    runInAction(() => {
      this.deviceTime = resp;
    });
  }

  private async setDeviceTime(time: number) {
    Taro.showLoading({ title: '同步中...', mask: true });

    let offset = new Date().getTimezoneOffset();
    offset = offset > 0 ? -offset : Math.abs(offset);

    console.info('Math.round(time / 1000)', Math.round(time / 1000));

    const data = {
      timestamp: Math.round(time / 1000),
      timezone: offset,
      timezoneCity: '',
      dateFormat: 0,
      timeFormat: 0,
    };

    let resp;
    let error;
    try {
      console.info('SetDeviceTime', data);
      resp = await requestDevice({
        mac: this.mac,
        requestType: 'SetDeviceTime',
        data,
      });
      console.info('SetDeviceTime resp', resp);
    } catch (_error) {
      console.error(_error);
      error = _error;
      // throw error;
    }
    Taro.hideLoading();

    if (resp) {
      Taro.showToast({ title: `同步成功, resp=${JSON.stringify(resp)}` });
    }
    if (error) {
      Taro.showToast({ title: `同步失败, error=${JSON.stringify(error)}` });
    }

    return resp;
  }
}
