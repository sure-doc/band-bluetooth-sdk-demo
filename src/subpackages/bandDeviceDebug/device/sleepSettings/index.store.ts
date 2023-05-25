import Taro from '@tarojs/taro';
import { makeAutoObservable, runInAction, toJS } from 'mobx';
import { RootStore } from '@/packages/mobx-rootstore';
import { dataHelper, requestDevice } from 'band-bluetooth-sdk';

export class SleepSettingsStore {
  mac!: string;

  settings?: dataHelper.SleepSetting;

  constructor(_rootStore: RootStore) {
    makeAutoObservable(this);
  }

  get scheduleSleepDuration() {
    if (!this.settings?.sleepSchedule) {
      return undefined;
    }
    const { sleepDuration } = this.settings.sleepSchedule;
    const hours = Math.floor(sleepDuration / 3600);
    const minutes = Math.floor((sleepDuration % 3600) / 60);
    return [hours, minutes];
  }

  async init({ mac }: { mac: string }) {
    this.mac = mac;

    Taro.showLoading({ title: '加载中...', mask: true });

    const resp = await requestDevice({
      mac: this.mac,
      requestType: 'GetSleepSetting',
    });
    console.info('GetSleepSetting', resp);

    runInAction(() => {
      this.settings = resp;
    });

    Taro.hideLoading();
  }

  changeSleepSwitch(checked: boolean) {
    console.error('checked', checked);
    this.saveSettings({
      sleepSwitch: checked,
    });
  }

  changeScheduleSleepDuration(values: [number, number]) {
    console.info('values', values);
    const value = values[0] * 3600 + values[1] * 60;
    this.saveSleepSchedule({
      sleepDuration: value,
    });
  }

  changeFallAsleepRemindCycle(week: number, checked: boolean) {
    let remindCycle = this.settings?.sleepSchedule.fallAsleepRemindSetting?.remindCycle ?? [];
    if (checked) {
      remindCycle = [...remindCycle, week];
    } else {
      remindCycle = remindCycle.filter((v) => v !== week);
    }
    this.saveFallAsleepRemindSetting({ remindCycle });
  }

  saveSleepSchedule(changedSleepSchedule: Partial<dataHelper.SleepSetting['sleepSchedule']>) {
    if (!this.settings) throw new Error('未加载完成');
    return this.saveSettings({
      sleepSchedule: {
        ...this.settings.sleepSchedule,
        ...changedSleepSchedule,
      },
    });
  }
  saveFallAsleepRemindSetting(
    changedFallAsleepRemindSetting: Partial<dataHelper.SleepSetting['sleepSchedule']['fallAsleepRemindSetting']>,
  ) {
    if (!this.settings) throw new Error('未加载完成');
    return this.saveSettings({
      sleepSchedule: {
        ...this.settings.sleepSchedule,
        fallAsleepRemindSetting: {
          remindSwitch: true,
          remindCycle: [],
          ...this.settings.sleepSchedule.fallAsleepRemindSetting,
          ...changedFallAsleepRemindSetting,
        },
      },
    });
  }

  async saveSettings(changedSettings: Partial<dataHelper.SleepSetting>) {
    if (!this.settings) throw new Error('未加载完成');
    const nextSettings = {
      ...this.settings,
      ...changedSettings,
      sleepScheduleEnabled: true,
    };
    runInAction(() => {
      this.settings = nextSettings;
    });

    const data: dataHelper.SleepSetting = toJS(nextSettings);

    console.info('saveSettings', data);

    await requestDevice({
      mac: this.mac,
      requestType: 'SetSleepSetting',
      data,
    });
  }
}
