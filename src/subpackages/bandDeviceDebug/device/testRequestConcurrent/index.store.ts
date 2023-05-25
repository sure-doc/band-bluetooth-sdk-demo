import { makeAutoObservable } from 'mobx';
import { RootStore } from '@/packages/mobx-rootstore';
import { dataHelper, requestDevice } from 'band-bluetooth-sdk';

export class TestRequestConcurrentStore {
  mac: string;
  msgList: string[] = [];

  settings?: dataHelper.GetSetSportHrSectionSetting;

  constructor(_rootStore: RootStore, { mac }: { mac: string }) {
    makeAutoObservable(this);
    this.mac = mac;
  }

  async init() {
    this.msgList = [];

    Array.from({ length: 10 }).forEach(async () => {
      this.msgList.push(`request start`);
      const resp = await requestDevice({
        mac: this.mac,
        requestType: 'GetDeviceInfo',
      });
      this.msgList.push(`request resp=${JSON.stringify(resp)}`);
    });
  }
}
