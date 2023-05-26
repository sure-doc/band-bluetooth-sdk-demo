import { useEffect } from 'react';
import { Button, View, Text } from '@tarojs/components';
import { observer } from 'mobx-react-lite';
import { useStore, useUnregister } from '@/packages/mobx-rootstore';
import { ScanDevicesStore } from './index.store';
import { useDidHide, useDidShow } from '@tarojs/taro';
import styles from './index.module.scss';

const ScanDevices = () => {
  const store = useStore(ScanDevicesStore);

  useEffect(() => {
    return () => store.stopScan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useUnregister(store);

  useDidShow(() => {
    store.scan();
  });

  useDidHide(() => {
    store.stopScan();
  });

  return (
    <View style={{ padding: '15px' }}>
      {store.scanDeviceList.map(({ device, state }) => {
        return (
          <View key={device.deviceId} style={{ borderBottom: '1px solid #999' }}>
            <View>id: {device.deviceId}</View>
            <View>name: {device.name}</View>
            <View>localName: {device.localName}</View>
            <View>RSSI: {device.RSSI}</View>
            <View>mac: {device.mac}</View>
            <View>
              <Text {...{ userSelect: true }}>data: {ab2hex(device.advertisData)}</Text>
            </View>
            <View>
              状态：
              <Text>
                {!state.connected && !state.connecting && '未连接'}
                {state.connected && '已连接'}
                {state.connecting && '连接中'}
              </Text>
            </View>

            <View>
              {!state.connecting && !state.connected && (
                <>
                  <Button className={styles.btn} size="mini" onClick={() => store.connectDevice(device)}>
                    连接
                  </Button>
                  <Button className={styles.btn} size="mini" onClick={() => store.connectAndBindDevice(device)}>
                    连接并绑定
                  </Button>
                </>
              )}

              {state.connecting && (
                <Button className={styles.btn} size="mini" onClick={() => store.disconnectDevice(device)}>
                  取消连接
                </Button>
              )}

              {state.connected && (
                <>
                  <Button className={styles.btn} size="mini" onClick={() => store.disconnectDevice(device)}>
                    断开连接
                  </Button>
                  {/* 更多 */}
                  <Button className={styles.btn} size="mini" onClick={() => store.navigateToDeviceDetial(device)}>
                    更多
                  </Button>
                </>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default observer(ScanDevices);

export function ab2hex(buffer: ArrayBuffer, { reversal, limit }: { reversal?: boolean; limit?: number } = {}) {
  if (!buffer) {
    return '';
  }
  if (typeof buffer === 'string') {
    return buffer;
  }
  let hexArr = Array.prototype.map.call(new Uint8Array(buffer.slice(0, limit)), function (bit) {
    return ('00' + bit.toString(16)).slice(-2);
  });
  if (reversal) {
    return hexArr.reverse().join('');
  }
  return hexArr.join('');
}
