import { useEffect } from 'react';
import { useRouter } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { observer } from 'mobx-react-lite';
import { useStore, useUnregister } from '@/packages/mobx-rootstore';
import { List } from '@/components';
import { FileListStore } from './index.store';
import { dataHelper } from 'band-bluetooth-sdk';

const FileList = () => {
  const store = useStore(FileListStore);

  const router = useRouter();

  const { mac, fileType } = router.params;

  console.info('mac', mac);
  console.info('fileType', fileType);

  useEffect(() => {
    if (!mac) throw new Error('缺少参数 mac');
    if (!fileType) throw new Error('缺少参数 fileType');
    store.init({ mac, fileType: fileType as unknown as dataHelper.FileType });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useUnregister(store);

  return (
    <View style={{ paddingTop: '16px' }}>
      <List>
        {store.fileList?.map((filename) => {
          return <List.Item key={filename} title={filename} onClick={() => store.getFile(filename)} />;
        })}
      </List>
    </View>
  );
};

export default observer(FileList);
