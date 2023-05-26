import Taro from '@tarojs/taro';
import { makeAutoObservable } from 'mobx';
import { RootStore } from '@/packages/mobx-rootstore';
import { requestDeviceGetFile } from 'band-bluetooth-sdk';

export class GetDailyRecordSummaryStore {
  mac?: string;

  constructor(_rootStore: RootStore, { mac }: { mac?: string }) {
    this.mac = mac;
    makeAutoObservable(this);
  }

  async init() {
    if (!this.mac) {
      throw new Error('mac 不存在');
    }
    try {
      Taro.showLoading({ title: '获取中...', mask: true });
      const resp = await requestDeviceGetFile({
        mac: this.mac,
        requestType: 'GetDailyRecordSummaryFile',
      });

      Taro.showModal({
        title: '获取成功',
        content: `${JSON.stringify(resp)}`,
        showCancel: false,
      });
    } catch (error) {
      console.error('获取失败', error);
      Taro.showModal({
        title: '获取失败',
        showCancel: false,
      });
    }

    Taro.hideLoading();
  }
}
