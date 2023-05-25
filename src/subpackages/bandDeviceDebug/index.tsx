import { useEffect } from 'react';
import { Button, View } from '@tarojs/components';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/packages/mobx-rootstore';
import { List } from '@/components';
import { DeviceDemoStore } from './index.store';
import styles from './index.module.scss';

const BandDeviceDebug = () => {
  const store = useStore(DeviceDemoStore);

  useEffect(() => {
    store.init();

    return () => store.clean();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={{ paddingTop: '16px' }}>
      <List>
        <List.Item title="用户信息" onClick={() => store.navigateToUserInfo()} />
        <List.Item title="通过扫码绑定" onClick={() => store.bindDeviceByScanQrcode()} />
        <List.Item title="蓝牙搜索" onClick={() => store.navigateToScanDevices()} />
        <List.Item title="查看缓存" onClick={() => store.navigateToStorage()} />
      </List>

      <View style={{ padding: '16px' }}>
        {store.loading ? (
          <View>Loading...</View>
        ) : store.connectedDevicesUIData.length ? (
          store.connectedDevicesUIData.map((data) => {
            return (
              <View key={data.device.mac}>
                <View>mac: {data.device.mac}</View>
                <View>连接状态: {data.stteText}</View>

                <View>
                  {/* 重新连接 */}
                  {!data.state.connecting && !data.state.connected && (
                    <>
                      <Button className={styles.btn} size="mini" onClick={() => store.connectDevice(data.device)}>
                        重新连接
                      </Button>
                      <Button
                        className={styles.btn}
                        size="mini"
                        onClick={() => store.connectAndBind({ mac: data.device.mac })}
                      >
                        连接并绑定
                      </Button>
                    </>
                  )}

                  {data.state.connecting && (
                    <>
                      {/* 取消连接 */}
                      <Button className={styles.btn} size="mini" onClick={() => store.disconnectDevice(data.device)}>
                        取消连接
                      </Button>
                    </>
                  )}

                  {data.state.connected && (
                    <>
                      {/* 断开连接 */}
                      <Button className={styles.btn} size="mini" onClick={() => store.disconnectDevice(data.device)}>
                        断开连接
                      </Button>

                      {/* 更多 */}
                      <Button
                        className={styles.btn}
                        size="mini"
                        onClick={() => store.navigateToDeviceDetial(data.device)}
                      >
                        更多
                      </Button>
                    </>
                  )}
                </View>
              </View>
            );
          })
        ) : (
          <View>无连接设备</View>
        )}
      </View>
    </View>
  );
};

export default observer(BandDeviceDebug);
