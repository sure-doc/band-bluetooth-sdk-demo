import { useEffect } from 'react';
import { useRouter } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { observer } from 'mobx-react-lite';
import { useStore, useUnregister } from '@/packages/mobx-rootstore';
import { GetPressureStatusStore } from './index.store';
import { DataView } from '../../components/DataView';

const GetPressureStatus = () => {
  const router = useRouter();

  const { mac } = router.params;
  console.info('mac', mac);

  if (!mac) throw new Error('缺少参数 mac');

  const store = useStore(GetPressureStatusStore, {
    creator: (rootStore) => new GetPressureStatusStore(rootStore, { mac }),
  });

  useEffect(() => {
    store.init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useUnregister(store);

  return (
    <View style={{ padding: '32px 16px' }}>
      <DataView>{store.resp ?? '无数据'}</DataView>
    </View>
  );
};

export default observer(GetPressureStatus);
