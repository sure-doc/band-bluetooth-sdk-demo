import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import { observer } from 'mobx-react-lite';
import { List } from '@/components/List';
import { init as sdkInit, destroySDK } from 'band-bluetooth-sdk';

import styles from './index.module.scss';

const Debug = () => {
  return (
    <View style={{ paddingTop: '16px' }}>
      <List className={styles['list_board']}>
        <List.Item title="调试手环" onClick={() => navigateTo('/subpackages/bandDeviceDebug/index')} />
      </List>

      <List className={styles['list_board']}>
        <List.Item title="打开调试" onClick={() => wx.setEnableDebug({ enableDebug: true })} />
        <List.Item title="关闭调试" onClick={() => wx.setEnableDebug({ enableDebug: false })} />
      </List>

      <List className={styles['list_board']}>
        <List.Item title="init SDK" onClick={() => sdkInit()} />
        <List.Item
          title="卸载 SDK"
          onClick={() => {
            destroySDK();
          }}
        />
      </List>

      <List className={styles['list_board']}>
        <List.Item title="微信 init" onClick={() => wxBLEInit()} />
        <List.Item title="微信 off" onClick={() => wxBLEOff()} />
      </List>
    </View>
  );
};

function navigateTo(url: string) {
  Taro.navigateTo({ url });
}

export default observer(Debug);

function wxBLEInit() {
  Taro.openBluetoothAdapter().then(() => {
    Taro.startBluetoothDevicesDiscovery({});

    Taro.onBluetoothAdapterStateChange((res) => {
      console.log('wx.onBluetoothAdapterStateChange', res);
    });

    Taro.onBluetoothDeviceFound((res) => {
      console.log('wx.onBluetoothDeviceFound', res);
    });

    Taro.onBLEConnectionStateChange((res) => {
      console.log('wx.onBLEConnectionStateChange', res);
    });

    Taro.onBLECharacteristicValueChange((res) => {
      console.log('wx.onBLECharacteristicValueChange', res);
    });
  });
}

/** off 微信BLE */
function wxBLEOff() {
  Taro.stopBluetoothDevicesDiscovery();
  Taro.offBluetoothAdapterStateChange((res) => console.log('wx.offBluetoothAdapterStateChange', res));
  Taro.offBluetoothDeviceFound((res) => console.log('wx.offBluetoothDeviceFound', res));
  Taro.offBLEConnectionStateChange((res) => console.log('wx.offBLEConnectionStateChange', res));
  Taro.offBLECharacteristicValueChange((res) => console.log('wx.offBLECharacteristicValueChange', res));
  Taro.closeBluetoothAdapter();
}
