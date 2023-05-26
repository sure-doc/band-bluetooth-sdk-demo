import { useEffect } from 'react';
import { useRouter } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { observer } from 'mobx-react-lite';
import { useStore, useUnregister } from '@/packages/mobx-rootstore';
import { List } from '@/components';
import { DeviceInfoStore } from './index.store';

const DeviceInfo = () => {
  const store = useStore(DeviceInfoStore);

  const router = useRouter();

  const { mac } = router.params;

  console.info('mac', mac);

  useEffect(() => {
    if (!mac) throw new Error('缺少参数 mac');
    store.init({ mac });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useUnregister(store);

  return (
    <View style={{ paddingTop: '16px' }}>
      <List>
        <List.Item title="设备类型">{store.deviceInfo?.deviceType}</List.Item>
        <List.Item title="设备硬件版本号">{store.deviceInfo?.deviceHardVersion}</List.Item>
        <List.Item title="设备软件版本号">{store.deviceInfo?.deviceSoftVersion}</List.Item>
        <List.Item title="设备SN号">{store.deviceInfo?.deviceSn}</List.Item>
        <List.Item title="设备型号">{store.deviceInfo?.deviceModel}</List.Item>
        <List.Item title="sku">{store.deviceInfo?.sku}</List.Item>
      </List>
    </View>
  );
};

export default observer(DeviceInfo);
