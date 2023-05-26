import Taro from '@tarojs/taro';
import { makeAutoObservable } from 'mobx';
import { RootStore } from '@/packages/mobx-rootstore';
import { InputProps } from '@tarojs/components/types/Input';
import { getUserInfo, saveUserInfo, LocalUserInfo } from '@/utils/localstorage';
import { DeviceDemoStore } from '../index.store';

export class UserInfoStore {
  userInfo?: LocalUserInfo;

  editInputData = {
    visible: false,
    name: '' as keyof LocalUserInfo,
    inputType: undefined as InputProps['type'],
    value: undefined as string | undefined,
  };
  deviceDemoStore: DeviceDemoStore;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);

    this.deviceDemoStore = rootStore.getStore(DeviceDemoStore);
  }

  async init() {
    Taro.showLoading({ title: '加载中...', mask: true });

    await this.loadUserInfo();
    Taro.hideLoading();
  }

  async loadUserInfo() {
    this.userInfo = await getUserInfo();

    console.info('loadUserInfo', this.userInfo);
  }

  showEditInput(name: keyof LocalUserInfo) {
    if (!this.userInfo) throw new Error('userInfo 未加载');
    this.editInputData.name = name;
    this.editInputData.value = this.userInfo[name] as any;
    this.editInputData.visible = true;
  }

  changeEditInputValue(value: string): void {
    this.editInputData.value = value;
  }
  confirmEditInput() {
    const { name, value: _value } = this.editInputData;
    let value: number | string = _value!;
    if (['height', 'weight'].includes(name)) {
      value = Number(value);
    }
    this.save({
      [name]: value,
    });
  }

  async save(userInfo: Partial<LocalUserInfo>) {
    if (!this.userInfo) throw new Error('userInfo 未加载');
    Taro.showLoading({ title: '保存中...', mask: true });

    const nextUserInfo = {
      ...this.userInfo,
      ...userInfo,
    };
    console.info('nextUserInfo', nextUserInfo);

    await saveUserInfo(nextUserInfo);

    this.userInfo = nextUserInfo;

    try {
      await this.deviceDemoStore.setUserInfo(this.userInfo);
    } catch (error) {
      console.error(error);
    }
    this.editInputData.visible = false;
    Taro.hideLoading();
  }

  changeBirthday(value: string) {
    this.save({ birthday: value });
  }
}
