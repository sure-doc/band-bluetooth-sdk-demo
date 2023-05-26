import Taro from '@tarojs/taro';
import { makeAutoObservable, runInAction } from 'mobx';
import { RootStore } from '@/packages/mobx-rootstore';
import { dataHelper, requestDevice } from 'band-bluetooth-sdk';

export class GetPressureStatusStore {
  mac: string;

  resp?: dataHelper.GetPressureStatusResponse;

  constructor(_rootStore: RootStore, { mac }: { mac: string }) {
    makeAutoObservable(this);
    this.mac = mac;
  }

  async init() {
    Taro.showLoading({ title: '加载中...', mask: true });
    const resp = await requestDevice({
      mac: this.mac,
      requestType: 'GetPressureStatus',
      data: {
        status: dataHelper.PressureStatusType.BeforeSleep,
      },
    });

    runInAction(() => {
      this.resp = resp;
    });

    Taro.hideLoading();
  }
}
