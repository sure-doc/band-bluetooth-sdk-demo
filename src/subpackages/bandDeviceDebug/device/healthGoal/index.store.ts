import Taro from '@tarojs/taro';
import { makeAutoObservable } from 'mobx';
import { RootStore } from '@/packages/mobx-rootstore';
import { dataHelper, requestDevice } from 'band-bluetooth-sdk';

const goalItemConfig = [
  {
    type: dataHelper.TodayActiveGoalType.Steps,
    title: '步数（步）',
    optionsConfig: {
      min: 1000,
      multiple: 1000,
      max: 30000,
    },
  },
  {
    type: dataHelper.TodayActiveGoalType.Calorie,
    title: '卡路里（0.1kcal）',
    optionsConfig: {
      min: 1000,
      multiple: 1000,
      max: 200000,
    },
  },
  {
    type: dataHelper.TodayActiveGoalType.Distance,
    title: '距离（米）',
    optionsConfig: {
      min: 1000,
      multiple: 1000,
      max: 30000,
    },
  },
  {
    type: dataHelper.TodayActiveGoalType.StandingDuration,
    title: '站立时长（小时）',
    optionsConfig: {
      min: 1,
      max: 24,
    },
  },
  {
    type: dataHelper.TodayActiveGoalType.WeeklyActivityDuration,
    title: '周活动时长（分钟）',
    optionsConfig: {
      min: 10,
      multiple: 10,
      max: 500,
    },
  },
];

export class HealthGoalStore {
  mac!: string;

  items = goalItemConfig.map((itemConfig) => {
    return {
      ...itemConfig,
      value: undefined as undefined | number,
    };
  });

  constructor(_rootStore: RootStore) {
    makeAutoObservable(this);
  }

  async init({ mac }: { mac: string }) {
    this.mac = mac;

    Taro.showLoading({ title: '加载中...', mask: true });

    const resp = await requestDevice({
      mac: this.mac,
      requestType: 'GetActivaGoalSetting',
    });
    console.info('resp', resp);

    resp.items.forEach((item) => {
      this.setItemValue({ type: item.type, value: item.value });
    });

    Taro.hideLoading();
  }

  setItemValue({ type, value }: { type: number; value: number }) {
    this.items = this.items.map((item) => {
      if (item.type !== type) return item;

      return {
        ...item,
        value,
      };
    });

    this.saveToDevice();
  }

  // setItemOptionsIndex({ type, optionsIndex }: { type: number; optionsIndex: number }) {
  //   this.items = this.items.map((item) => {
  //     if (item.type !== type) return item;

  //     const value = item.optionsConfig.begin + optionsIndex * item.optionsConfig.interval;
  //     return {
  //       ...item,
  //       optionsIndex,
  //       value,
  //     };
  //   });

  //   this.saveToDevice();
  // }

  async saveToDevice() {
    const data: dataHelper.TodayActiveGoalSetting = {
      switch: true,
      items: this.items
        .filter((item) => item.value !== undefined)
        .map((item) => {
          const goalItem: dataHelper.TodayActiveGoalSettingItem = { type: item.type, switch: true, value: item.value! };

          return goalItem;
        }),
    };

    await requestDevice({
      mac: this.mac,
      requestType: 'SetActivaGoalSetting',
      data,
    });
  }
}
