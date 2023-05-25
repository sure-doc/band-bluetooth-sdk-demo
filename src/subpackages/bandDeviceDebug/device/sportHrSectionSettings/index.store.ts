import Taro from '@tarojs/taro';
import { makeAutoObservable, runInAction, toJS } from 'mobx';
import { RootStore } from '@/packages/mobx-rootstore';
import { dataHelper, requestDevice } from 'band-bluetooth-sdk';

export class SportHrSectionSettingsStore {
  mac!: string;

  settings?: dataHelper.GetSetSportHrSectionSetting;

  constructor(_rootStore: RootStore) {
    makeAutoObservable(this);
  }

  async init({ mac }: { mac: string }) {
    this.mac = mac;

    Taro.showLoading({ title: '加载中...', mask: true });

    const resp = await requestDevice({
      mac: this.mac,
      requestType: 'GetSetSportHrSectionSetting',
      data: {
        isSet: false,
      },
    });
    console.info('loadSettings', resp);

    runInAction(() => {
      this.settings = resp;
    });

    Taro.hideLoading();
  }

  get maxHr() {
    const hrSections = this.settings?.hrSections ?? [];
    return hrSections[hrSections?.length - 1]?.max;
  }

  async changeMaxHr(maxHr: number) {
    let prevItem: NonNullable<dataHelper.GetSetSportHrSectionSetting['hrSections']>[number] | undefined;
    const hrSections = Array.from({ length: 5 })
      .map((_) => {
        const max = prevItem ? prevItem.min - 1 : maxHr;
        const min = (prevItem ? prevItem.min : maxHr) - Math.floor(maxHr * 0.1);
        prevItem = {
          max,
          min,
        };

        return prevItem;
      })
      .reverse();

    const res = await Taro.showModal({ title: '提示', content: '修改最大心率后，运动心率区间将根据最大心率重置' });

    if (!res.confirm) {
      return;
    }

    this.saveSettings(hrSections);
  }

  changeHrSection({ index, min, max }: { index: number; min: number; max: number }) {
    if (!this.settings) throw new Error('未加载完成');
    let { hrSections } = this.settings;

    hrSections = hrSections || [];

    hrSections[index].min = min;
    hrSections[index].max = max;

    if (index > 0) {
      const preHrSection = hrSections[index - 1];
      preHrSection.max = min - 1;
    }

    if (index < hrSections.length - 1) {
      const nextHrSection = hrSections[index + 1];
      nextHrSection.min = max + 1;
    }

    return this.saveSettings(hrSections);
  }

  async saveSettings(hrSections: NonNullable<dataHelper.GetSetSportHrSectionSetting['hrSections']>) {
    if (!this.settings) throw new Error('未加载完成');
    this.settings = toJS({
      hrSections,
      isSet: true,
    });

    console.info('saveSettings', this.settings);

    await requestDevice({
      mac: this.mac,
      requestType: 'GetSetSportHrSectionSetting',
      data: this.settings,
    });
  }
}
