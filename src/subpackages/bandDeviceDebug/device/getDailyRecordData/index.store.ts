import Taro from '@tarojs/taro';
import { makeAutoObservable } from 'mobx';
import { RootStore } from '@/packages/mobx-rootstore';
import { dataHelper, requestDeviceGetFile } from 'band-bluetooth-sdk';

export class GetDailyRecordDataStore {
  mac: string;
  dataType = dataHelper.DataType.Hr;
  recordType = dataHelper.RecordType.Recent;

  resultDialog = new ResultDialog();

  constructor(_rootStore: RootStore, { mac }: { mac: string }) {
    makeAutoObservable(this);
    this.mac = mac;
  }

  checkDataType(type: dataHelper.DataType) {
    this.dataType = type;
  }
  checkRecordType(type: dataHelper.RecordType): void {
    this.recordType = type;
  }

  async getData() {
    try {
      Taro.showLoading({ title: '获取中...', mask: true });
      const resp = await requestDeviceGetFile({
        mac: this.mac,
        requestType: 'GetDailyRecordData',
        data: {
          dataType: this.dataType,
          recordType: this.recordType,
        },
      });

      console.info('resp', resp);

      this.resultDialog.show({
        title: '获取成功',
        content: `结果：${JSON.stringify(resp, undefined, 2)}`,
      });
    } catch (error) {
      console.error('获取失败', error);
      this.resultDialog.show({
        title: '获取失败',
        content: `结果：${JSON.stringify(error)}`,
      });
    }

    Taro.hideLoading();
  }
}

class ResultDialog {
  visible = false;
  title?: string;
  content?: string;

  constructor() {
    makeAutoObservable(this);
  }

  show({ title, content }: { title: string; content: string }) {
    this.visible = true;
    this.title = title;
    this.content = content;
  }

  close() {
    this.visible = false;
    this.content = undefined;
  }
}
