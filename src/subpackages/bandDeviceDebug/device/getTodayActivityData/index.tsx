import { useEffect } from 'react';
import { useRouter } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { observer } from 'mobx-react-lite';
import { useStore, useUnregister } from '@/packages/mobx-rootstore';
import { GetTodayActivityDataStore } from './index.store';
import { DataView } from '../../components/DataView';

const GetTodayActivityData = () => {
  const store = useStore(GetTodayActivityDataStore);

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
    <View style={{ padding: '32px 16px' }}>
      <DataView>{store.resp ?? '无数据'}</DataView>
    </View>
  );
};

export default observer(GetTodayActivityData);
