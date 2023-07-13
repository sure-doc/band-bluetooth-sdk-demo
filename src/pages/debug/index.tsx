import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import { observer } from 'mobx-react-lite';
import { List } from '@/components/List';
import { init as sdkInit, destroySDK } from 'band-bluetooth-sdk';

import styles from './index.module.scss';

const Debug = () => {
  // useEffect(() => {
  //   sdkInit();
  // }, []);

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
        <List.Item title="卸载 SDK" onClick={() => destroySDK()} />
      </List>
    </View>
  );
};

function navigateTo(url: string) {
  Taro.navigateTo({ url });
}

export default observer(Debug);
