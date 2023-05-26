import Taro from '@tarojs/taro';
import { makeAutoObservable, runInAction } from 'mobx';
import { RootStore } from '@/packages/mobx-rootstore';
import { dataHelper, requestDevice } from 'band-bluetooth-sdk';

export class GetTodayActivityDataStore {
  mac!: string;

  resp?: dataHelper.AllTypes['TodayActiveTotalGet_t'];

  constructor(_rootStore: RootStore) {
    makeAutoObservable(this);
  }

  async init({ mac }: { mac: string }) {
    try {
      this.mac = mac;

      Taro.showLoading({ title: '请求中...', mask: true });
      const resp = await requestDevice({
        mac: this.mac,
        requestType: 'GetTodayActivityData',
      });

      runInAction(() => {
        this.resp = resp;
      });
    } catch (error) {
      console.error('请求失败', error);
      Taro.showModal({
        title: '请求失败',
        showCancel: false,
      });
    } finally {
      Taro.hideLoading();
    }
  }
}
