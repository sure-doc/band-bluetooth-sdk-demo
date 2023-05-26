import Taro from '@tarojs/taro';
import { makeAutoObservable, runInAction } from 'mobx';
import { RootStore } from '@/packages/mobx-rootstore';
import { dataHelper, requestDevice } from 'band-bluetooth-sdk';

export class GetActivityStrengthStore {
  mac!: string;

  resp?: dataHelper.ActivityStrengthDetail;

  constructor(_rootStore: RootStore) {
    makeAutoObservable(this);
  }

  async init({ mac }: { mac: string }) {
    this.mac = mac;

    Taro.showLoading({ title: '加载中...', mask: true });
    const resp = await requestDevice({
      mac: this.mac,
      requestType: 'GetActivityStrength',
    });

    runInAction(() => {
      this.resp = resp;
    });

    Taro.hideLoading();
  }
}
