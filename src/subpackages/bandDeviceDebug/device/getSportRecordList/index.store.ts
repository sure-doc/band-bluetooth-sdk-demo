import Taro from '@tarojs/taro';
import { makeAutoObservable, runInAction } from 'mobx';
import { RootStore } from '@/packages/mobx-rootstore';
import { dataHelper, requestDevice } from 'band-bluetooth-sdk';
import dayjs from 'dayjs';

export class GetSportRecordListStore {
  mac!: string;

  resp?: dataHelper.GetSportRecordListResult;

  constructor(_rootStore: RootStore) {
    makeAutoObservable(this);
  }

  async init({ mac }: { mac: string }) {
    this.mac = mac;

    Taro.showLoading({ title: '加载中...', mask: true });
    const resp = await requestDevice({
      mac: this.mac,
      requestType: 'GetSportRecordList',
      data: {
        startTime: dayjs().subtract(1, 'month').valueOf(),
        endTime: dayjs().valueOf(),
      },
    });

    runInAction(() => {
      this.resp = resp;
    });

    Taro.hideLoading();
  }

  async getSportRecordFile(sportId: string) {
    Taro.showLoading({ title: '获取中...', mask: true });
    await requestDevice({
      mac: this.mac,
      requestType: 'GetSportRecordFile',
      data: {
        sportId,
      },
    });

    Taro.hideLoading();
    Taro.showModal({
      title: '提示',
      content: `获取成功，请在"上传数据日志" 中查看 类别:8, 命令:0 的数据`,
      showCancel: false,
    });
  }
}
