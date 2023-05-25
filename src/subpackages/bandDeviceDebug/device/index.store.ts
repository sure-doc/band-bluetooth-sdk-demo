import Taro from '@tarojs/taro';
import { makeAutoObservable } from 'mobx';
import { RootStore } from '@/packages/mobx-rootstore';
import { requestDevice, startDataSync, bindDevice, unbindDevice } from 'band-bluetooth-sdk';

export class DeviceStore {
  alertData = {
    visible: false,
    content: undefined as unknown,
  };

  mac!: string;

  constructor(_rootStore: RootStore) {
    makeAutoObservable(this);
  }

  async init({ mac }: { mac: string }) {
    console.info('mac', mac);
    this.mac = mac;
  }

  async startDataSync() {
    Taro.showLoading({ title: '正在开启数据同步', mask: true });
    await startDataSync({ mac: this.mac });

    Taro.hideLoading();
    Taro.showToast({ title: '开启数据同步成功' });
  }

  async bindDevice() {
    Taro.showLoading({ title: '绑定中...', mask: true });
    try {
      const resp = await bindDevice({ mac: this.mac, userId: 'userId' });

      console.info('绑定结果', resp);
      Taro.showModal({
        title: '绑定结果',
        showCancel: false,
        content: JSON.stringify(resp),
      });
    } catch (error) {
      console.info('绑定失败', error);
      Taro.showModal({
        title: '绑定失败',
        showCancel: false,
        content: JSON.stringify(error),
      });
      console.error(error);
    }

    Taro.hideLoading();
  }

  /**
   * 解绑设备
   */
  async unbindDevice() {
    Taro.showLoading({ title: '解绑中...', mask: true });
    try {
      const resp = await unbindDevice({ mac: this.mac, bindUserId: 'userId' });

      console.info('解绑结果', resp);
      Taro.showModal({
        title: '解绑结果',
        showCancel: false,
        content: JSON.stringify(resp),
      });
    } catch (error) {
      console.info('解绑失败', error);
      Taro.showModal({
        title: '解绑失败',
        showCancel: false,
        content: '',
      });
      console.error(error);
    }
  }

  async getUserInfo() {
    Taro.showLoading({ title: '获取中...', mask: true });
    const res = await requestDevice({ mac: this.mac, requestType: 'GetUserInfo' });

    this.showAlert({
      content: res,
    });
    Taro.hideLoading();
  }
  async getBatteryInfo() {
    Taro.showLoading({ title: '获取中...', mask: true });
    const res = await requestDevice({ mac: this.mac, requestType: 'GetBatteryInfo' });

    this.showAlert({
      content: res,
    });
    Taro.hideLoading();
  }

  showAlert({ content }: { content: unknown }) {
    this.alertData.visible = true;
    this.alertData.content = content;
  }

  closeAlert() {
    this.alertData.visible = false;
  }
}
