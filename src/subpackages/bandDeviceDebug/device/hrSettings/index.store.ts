import Taro from '@tarojs/taro';
import { makeAutoObservable, runInAction } from 'mobx';
import { dataHelper, requestDevice } from 'band-bluetooth-sdk';

export class HrSettingsStore {
  mac!: string;

  settings?: dataHelper.HrSetting;

  constructor() {
    makeAutoObservable(this);
  }

  /** hr */
  get hrSwitch() {
    return this.settings?.hrSwitch === dataHelper.HrSettingSwitch.Opened;
  }

  // /** hrDailyWarn */
  get hrDailyWarnSwitch() {
    return this.settings?.hrDailyWarnSwitch === dataHelper.HrSettingSwitch.Opened;
  }

  /** hrSportWarn */
  get hrSportWarnSwitch() {
    return this.settings?.hrSportWarnSwitch === dataHelper.HrSettingSwitch.Opened;
  }

  async init({ mac }: { mac: string }) {
    this.mac = mac;

    Taro.showLoading({ title: '加载中...', mask: true });

    const resp = await requestDevice({
      mac: this.mac,
      requestType: 'GetHrSetting',
    });
    console.info('GetHrSetting', resp);

    runInAction(() => {
      this.settings = resp;
    });

    Taro.hideLoading();
  }

  changeHrSwitch(checked: boolean) {
    if (!this.settings) throw new Error('未加载完成');

    this.settings = {
      ...this.settings,
      hrSwitch: checked ? dataHelper.HrSettingSwitch.Opened : dataHelper.HrSettingSwitch.Closed,
    };
    this.saveHrSettings();
  }

  changeHrInterval(value: number) {
    if (!this.settings) throw new Error('未加载完成');
    this.settings = {
      ...this.settings,
      hrInterval: value,
    };
    this.saveHrSettings();
  }

  changeHrDailyWarnSwitch(checked: boolean) {
    if (!this.settings) throw new Error('未加载完成');

    this.settings = {
      ...this.settings,
      hrDailyWarnSwitch: checked ? dataHelper.HrSettingSwitch.Opened : dataHelper.HrSettingSwitch.Closed,
    };
    this.saveHrSettings();
  }
  changeHrDailyWarn(value: number) {
    if (!this.settings) throw new Error('未加载完成');
    this.settings = {
      ...this.settings,
      hrDailyWarnValue: value,
    };
    this.saveHrSettings();
  }

  changeHrSportWarnSwitch(checked: boolean) {
    if (!this.settings) throw new Error('未加载完成');

    this.settings = {
      ...this.settings,
      hrSportWarnSwitch: checked ? dataHelper.HrSettingSwitch.Opened : dataHelper.HrSettingSwitch.Closed,
    };
    this.saveHrSettings();
  }
  changeHrSportWarn(value: number) {
    if (!this.settings) throw new Error('未加载完成');
    this.settings = {
      ...this.settings,
      hrSportWarnValue: value,
    };
    this.saveHrSettings();
  }

  async saveHrSettings() {
    if (!this.settings) throw new Error('未加载完成');
    const data: dataHelper.HrSetting = {
      ...this.settings,
    };

    console.info('saveHrSettings', data);

    await requestDevice({
      mac: this.mac,
      requestType: 'SetHrSetting',
      data,
    });
  }
}
