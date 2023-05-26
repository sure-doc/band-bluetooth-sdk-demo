import { useEffect } from 'react';
import { useRouter } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { observer } from 'mobx-react-lite';
import { useStore, useUnregister } from '@/packages/mobx-rootstore';
import { List } from '@/components';
import { GetFileStore } from './index.store';
import { dataHelper } from 'band-bluetooth-sdk';

const GetFile = () => {
  const store = useStore(GetFileStore);

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
        <List.Item title="Log" onClick={() => store.navigateFileList(dataHelper.FileType.Log)} />
        <List.Item title="表盘" onClick={() => store.navigateFileList(dataHelper.FileType.WatchFace)} />
        <List.Item title="心率" onClick={() => store.navigateFileList(dataHelper.FileType.Hr)} />
        <List.Item title="血氧" onClick={() => store.navigateFileList(dataHelper.FileType.Spo2)} />
        <List.Item title="睡眠" onClick={() => store.navigateFileList(dataHelper.FileType.Sleep)} />
        <List.Item title="运动" onClick={() => store.navigateFileList(dataHelper.FileType.SportReport)} />
        <List.Item title="日常活动" onClick={() => store.navigateFileList(dataHelper.FileType.DailyActivity)} />
        <List.Item title="运动心率" onClick={() => store.navigateFileList(dataHelper.FileType.SportHr)} />
        <List.Item title="日常汇总" onClick={() => store.navigateFileList(dataHelper.FileType.DailyActivity)} />
      </List>
    </View>
  );
};

export default observer(GetFile);

// WatchFace = 2,
// Hr = 3,
// Spo2 = 4,
// Sleep = 5,
// SportReport = 6,
// DailyActivity = 7,
// SportHr = 8,
