import { useEffect } from 'react';
import { useRouter } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { observer } from 'mobx-react-lite';
import { useStore, useUnregister } from '@/packages/mobx-rootstore';
import { GetDailyRecordSummaryStore } from './index.store';

const GetDailyRecordSummary = () => {
  const router = useRouter();
  const { mac } = router.params;
  console.info('mac', mac);

  const store = useStore(GetDailyRecordSummaryStore, {
    creator: (rootStore) => new GetDailyRecordSummaryStore(rootStore, { mac }),
  });
  useUnregister(store);

  useEffect(() => {
    if (!mac) throw new Error('缺少参数 mac');
    store.init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useUnregister(store);

  return <View style={{ padding: '32px 0' }} />;
};

export default observer(GetDailyRecordSummary);
