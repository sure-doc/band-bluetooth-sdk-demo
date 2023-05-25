import Taro from '@tarojs/taro';
import { makeAutoObservable, runInAction } from 'mobx';
import dayjs from 'dayjs';
import {
  connectAndBindDevice,
  connectDevice,
  parseQrcode,
  onConnectionStateChange,
  requestDevice,
  dataHelper,
  getConnectedDevices,
  disconnectDevice,
} from 'band-bluetooth-sdk';
import { LocalDevice, LocalUserInfo, getUserInfo } from '@/utils/localstorage';
import { navigateTo } from './services';

export interface DeviceConnectionState {
  connected: boolean;
  connecting: boolean;
}

export class DeviceDemoStore {
  available = false;
  isInit = false;
  loading = true;
  languageConfig: dataHelper.DeviceLanguageSetting = {
    local: 'CN',
    language: 'zh',
  };

  deviceConnectionStateMap: Record<string, DeviceConnectionState> = {};
  private offListenConnectionsState?: () => void;
  private offBluetoothAdapterStateChange?: () => void;

  constructor() {
    makeAutoObservable(this);
  }

  get connectedDevices(): LocalDevice[] {
    return Object.keys(this.deviceConnectionStateMap).map((mac) => ({ mac }));
  }

  get connectedDevicesUIData() {
    return this.connectedDevices.map((device) => {
      const state = this.getDeviceConnectionState(device.mac);
      const stteText = state.connected ? '已连接' : state.connecting ? '连接中...' : '未连接';
      return {
        device,
        state,
        stteText,
      };
    });
  }

  async init() {
    if (this.isInit) return;
    this.isInit = true;
    runInAction(() => {
      this.loading = true;
    });

    if (!this.isInit) return;

    this.deviceConnectionStateMap = {};

    this.listenConnectionState();
    this.initConnectedDevices();

    runInAction(() => {
      this.loading = false;
    });
  }

  clean() {
    this.offBluetoothAdapterStateChange?.();
    this.offListenConnectionState();
    this.isInit = false;
  }

  connectDevice(device: LocalDevice) {
    connectDevice({ mac: device.mac });
  }

  disconnectDevice(device: LocalDevice) {
    disconnectDevice({ mac: device.mac });
  }

  /**
   * 通过扫码绑定设备
   */
  async bindDeviceByScanQrcode() {
    const scanRes = await Taro.scanCode({
      scanType: ['qrCode'],
    });

    console.info('scanRes.result', scanRes.result);

    const { mac } = parseQrcode(scanRes.result);

    this.connectAndBind({ mac });
  }

  async connectAndBind({ mac }: { mac: string }) {
    await Taro.showLoading({
      title: '请在手环上确认继续',
      mask: true,
    });

    console.info('mac:', mac);

    const userInfo = await getUserInfo();

    const resp = await connectAndBindDevice({
      // mac: 'EB18492A2035',
      // mac: 'EB18492A2538',
      mac,
      userId: userInfo.name,
      language: this.languageConfig,
      onConfirmBind: async () => {
        return {
          success: true,
        };
      },
      onStateChange: ({ state }) => {
        console.info('bindDevice onStateChange:', state);
      },
    }).catch((error) => ({ error }));

    Taro.hideLoading();
    if ('error' in resp) {
      console.info('绑定失败', resp.error);
      Taro.showToast({ title: '绑定失败' });
    } else {
      Taro.showToast({ title: '绑定成功' });
    }
  }
  /** 设置用户信息 */
  async setUserInfo(userInfo: LocalUserInfo) {
    const data = transformDeviceUserInfo(userInfo);
    console.info('save data', data);
    await this.requestAllBindDevices((mac) => {
      return requestDevice({
        mac,
        requestType: 'SetUserInfo',
        data,
      });
    });
  }

  /** 向所有已连接的设备发送请求 */
  requestAllBindDevices(request: (mac: string) => Promise<any>) {
    return Promise.all(
      this.connectedDevices
        .filter((device) => {
          return this.getDeviceConnectionState(device.mac).connected;
        })
        .map((device) => {
          return request(device.mac);
        }),
    );
  }

  /** 导航到用户信息 */
  navigateToUserInfo(): void {
    navigateTo({
      url: 'userInfo/index',
    });
  }

  /**
   * 导航到 蓝牙搜索绑定
   */
  navigateToScanDevices() {
    navigateTo({
      url: 'scanDevices/index',
    });
  }
  /** 导航到 缓存信息 */
  navigateToStorage() {
    navigateTo({
      url: 'storage/index',
    });
  }

  /** 导航到 设备详情 */
  navigateToDeviceDetial(device: LocalDevice) {
    navigateTo({
      url: `device/index?mac=${device.mac}`,
    });
  }

  private initConnectedDevices() {
    const deviceMacs = getConnectedDevices();

    deviceMacs.forEach((mac) => {
      if (this.deviceConnectionStateMap[mac] === undefined) {
        this.deviceConnectionStateMap[mac] = {
          connected: true,
          connecting: false,
        };
      }
    });
  }

  private getDeviceConnectionState(mac: string): DeviceConnectionState {
    const state = this.deviceConnectionStateMap[mac];

    if (!state) {
      return {
        connected: false,
        connecting: false,
      };
    }

    return state;
  }

  private listenConnectionState() {
    this.offListenConnectionsState = onConnectionStateChange({
      onChange: ({ mac, state }) => {
        runInAction(() => {
          // 修改状态
          this.deviceConnectionStateMap[mac] = {
            ...this.deviceConnectionStateMap[mac],
            connected: state.connected,
            connecting: state.connecting,
          };
        });
      },
    });
  }

  private offListenConnectionState() {
    this.offListenConnectionsState?.();
    this.offListenConnectionsState = undefined;
  }
}
function transformDeviceUserInfo(userInfo: LocalUserInfo) {
  return {
    weight: userInfo.weight,
    height: userInfo.height,
    birthday: userInfo.birthday ? dayjs(userInfo.birthday).valueOf() : undefined,
    // age: userInfo.birthday ? dayjs().diff(dayjs(userInfo.birthday), 'year') : undefined,
    gender: userInfo.gender,
    nickName: userInfo.name,
  };
}
