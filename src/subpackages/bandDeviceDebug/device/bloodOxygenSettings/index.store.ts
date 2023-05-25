import Taro from '@tarojs/taro';
import { makeAutoObservable, runInAction } from 'mobx';
import { RootStore } from '@/packages/mobx-rootstore';
import { dataHelper, requestDevice } from 'band-bluetooth-sdk';

export class BloodOxygenSettingsStore {
  mac!: string;

  settings?: dataHelper.BloodOxygenSetting;

  constructor(_rootStore: RootStore) {
    makeAutoObservable(this);
  }

  async init({ mac }: { mac: string }) {
    this.mac = mac;

    Taro.showLoading({ title: '加载中...', mask: true });

    const resp = await requestDevice({
      mac: this.mac,
      requestType: 'GetBloodOxygenSetting',
    });
    console.info('loadSettings', resp);

    runInAction(() => {
      this.settings = resp;
    });

    Taro.hideLoading();
  }

  async saveSettings(changedSettings: Partial<dataHelper.BloodOxygenSetting>) {
    if (!this.settings) throw new Error('未加载完成');
    this.settings = {
      ...this.settings,
      ...changedSettings,
    };

    console.info('saveSettings', this.settings);

    await requestDevice({
      mac: this.mac,
      requestType: 'SetBloodOxygenSetting',
      data: this.settings,
    });
  }
}
