import Taro from '@tarojs/taro';
import { makeAutoObservable, runInAction } from 'mobx';
import { RootStore } from '@/packages/mobx-rootstore';
import { dataHelper, requestDevice } from 'band-bluetooth-sdk';

export class SedentaryReminderStore {
  mac!: string;

  settings?: Omit<dataHelper.SedentaryReminder, 'timeSets'> & {
    timeSets: Partial<dataHelper.TimeRange>[];
  };

  constructor(_rootStore: RootStore) {
    makeAutoObservable(this);
  }

  async init({ mac }: { mac: string }) {
    this.mac = mac;

    Taro.showLoading({ title: '加载中...', mask: true });

    const resp = await requestDevice({
      mac: this.mac,
      requestType: 'GetSedentaryReminder',
    });
    console.info('GetSedentaryReminder', resp);

    runInAction(() => {
      this.settings = resp;
    });

    Taro.hideLoading();
  }
  changeEnable(checked: boolean) {
    if (!this.settings) throw new Error('未加载完成');
    this.settings = {
      ...this.settings,
      enable: checked,
    };
    this.saveSettings();
  }

  changeDuration(value: number) {
    if (!this.settings) throw new Error('未加载完成');
    this.settings = {
      ...this.settings,
      thresholdValue: {
        ...this.settings.thresholdValue,
        duration: value,
      },
    };
    this.saveSettings();
  }

  changeSteps(value: number) {
    if (!this.settings) throw new Error('未加载完成');
    this.settings = {
      ...this.settings,
      thresholdValue: {
        ...this.settings.thresholdValue,
        step: value,
      },
    };
    this.saveSettings();
  }

  changeTimeSets(data: { item: Partial<dataHelper.TimeRange>; start: number; end: number }) {
    if (!this.settings) throw new Error('未加载完成');
    this.settings = {
      ...this.settings,
      timeSets:
        this.settings?.timeSets.map((item) => {
          if (item === data.item) {
            return {
              startTime: { hour: data.start, minute: 0 },
              endTime: { hour: data.end, minute: 59 },
            };
          }
          return item;
        }) ?? [],
    };
    this.saveSettings();
  }

  addTimeSet() {
    if (!this.settings) throw new Error('未加载完成');
    this.settings = {
      ...this.settings,
      timeSets: [...this.settings.timeSets, {}],
    };
    this.saveSettings();
  }

  removeTimeSet() {
    if (!this.settings) throw new Error('未加载完成');
    this.settings = {
      ...this.settings,
      timeSets: this.settings.timeSets.slice(0, this.settings.timeSets.length - 1),
    };
    this.saveSettings();
  }

  async saveSettings() {
    if (!this.settings) throw new Error('未加载完成');
    const data: dataHelper.SedentaryReminder = {
      ...this.settings,
      timeSets: this.settings.timeSets.filter(
        (item) => item.startTime !== undefined && item.endTime !== undefined,
      ) as Array<dataHelper.TimeRange>,
    };

    console.info('saveHrSettings', data);

    await requestDevice({
      mac: this.mac,
      requestType: 'SetSedentaryReminder',
      data,
    });
  }
}
