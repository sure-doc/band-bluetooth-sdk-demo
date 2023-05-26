import { useEffect } from 'react';
import { Button, View } from '@tarojs/components';
import { observer } from 'mobx-react-lite';
import { useStore, useUnregister } from '@/packages/mobx-rootstore';
import { DataView } from '../components/DataView';
import { DeviceDemoStorageStore } from './index.store';

const Storage = () => {
  const store = useStore(DeviceDemoStorageStore);

  useEffect(() => {
    store.init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useUnregister(store);

  return (
    <View style={{ padding: '16px' }}>
      <DataView
        style={{ paddingTop: '12px' }}
        title={
          <View>
            设备缓存：
            <Button size="mini" onClick={() => store.clearDeviceStorage()}>
              清除
            </Button>
          </View>
        }
      >
        {store.deviceStorage}
      </DataView>
      <DataView style={{ paddingTop: '12px' }} title="设备 mac 临时缓存：">
        {store.deviceMacInfo}
      </DataView>
    </View>
  );
};
export default observer(Storage);
