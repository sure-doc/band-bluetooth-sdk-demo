import Taro from '@tarojs/taro';
import { makeAutoObservable, runInAction } from 'mobx';
import { RootStore } from '@/packages/mobx-rootstore';
import { dataHelper, requestDevice } from 'band-bluetooth-sdk';

export class FileListStore {
  mac!: string;
  fileType!: dataHelper.FileType;

  fileList?: dataHelper.GetFileListResponse['fileList'];

  constructor(_rootStore: RootStore) {
    makeAutoObservable(this);
  }

  async init({ mac, fileType }: { mac: string; fileType: dataHelper.FileType }) {
    this.mac = mac;
    this.fileType = fileType;

    Taro.showLoading({ title: '加载中...', mask: true });

    await this.loadFileList();

    Taro.hideLoading();
  }

  async getFile(fileName: string) {
    Taro.showLoading({ title: '加载中...', mask: true });
    console.info('getFile');

    const resp = await requestDevice({
      mac: this.mac,
      requestType: 'GetFile',
      data: {
        fileType: this.fileType,
        fileName,
      },
    });
    console.info('getFile', resp);

    Taro.hideLoading();
    Taro.showModal({
      title: '提示',
      content: `获取成功，请在"上传数据日志" 中查看 类别:8, 命令:0 的数据`,
      showCancel: false,
    });
  }

  private async loadFileList() {
    console.info('loadFileList');
    const resp = await requestDevice({
      mac: this.mac,
      requestType: 'GetFileList',
      data: {
        fileType: this.fileType,
      },
    });
    console.info('loadFileList', resp);

    runInAction(() => {
      this.fileList = resp.fileList;
    });
  }
}
