import { makeAutoObservable } from 'mobx';
import { RootStore } from '@/packages/mobx-rootstore';
import { dataHelper } from 'band-bluetooth-sdk';
import { navigateTo } from '../../services';

export class GetFileStore {
  mac!: string;

  deviceInfo?: dataHelper.DeviceInfo;

  constructor(_rootStore: RootStore) {
    makeAutoObservable(this);
  }

  async init({ mac }: { mac: string }) {
    this.mac = mac;
  }

  navigateFileList(fileType: dataHelper.FileType): void {
    navigateTo({
      url: `device/getFile/fileList/index?mac=${this.mac}&fileType=${fileType}`,
    });
  }
}
