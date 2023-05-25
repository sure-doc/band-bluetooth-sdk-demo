import { useEffect } from 'react';
import { useRouter } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { observer } from 'mobx-react-lite';
import { useStore, useUnregister } from '@/packages/mobx-rootstore';

import { TestRequestConcurrentStore } from './index.store';

const TestRequestConcurrent = () => {
  const router = useRouter();

  const { mac } = router.params;

  if (!mac) throw new Error('缺少参数 mac');

  const store = useStore(TestRequestConcurrentStore, {
    creator: (rootStore) => new TestRequestConcurrentStore(rootStore, { mac }),
  });

  useEffect(() => {
    store.init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useUnregister(store);

  return (
    <View style={{ padding: '32px 0' }}>
      {store.msgList.map((msg, i) => {
        return <View key={i}>{msg}</View>;
      })}
    </View>
  );
};

export default observer(TestRequestConcurrent);
