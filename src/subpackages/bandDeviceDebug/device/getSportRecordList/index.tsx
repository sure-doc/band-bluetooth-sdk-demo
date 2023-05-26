import { useEffect } from 'react';
import { useRouter } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { observer } from 'mobx-react-lite';
import { useStore, useUnregister } from '@/packages/mobx-rootstore';
import { GetSportRecordListStore } from './index.store';
import { List } from '@/components';

const GetSportRecordList = () => {
  const store = useStore(GetSportRecordListStore);

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
    <View style={{ padding: '32px 0' }}>
      {!store.resp && '无数据'}
      <List>
        {store.resp?.sportIds.map((sportId) => (
          <List.Item key={sportId} title={sportId} onClick={() => store.getSportRecordFile(sportId)} />
        ))}
      </List>
    </View>
  );
};

export default observer(GetSportRecordList);
