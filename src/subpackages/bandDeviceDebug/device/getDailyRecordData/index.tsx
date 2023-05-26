import { useRouter } from '@tarojs/taro';
import { ScrollView, Button, Text, View } from '@tarojs/components';
import { observer } from 'mobx-react-lite';
import { useStore, useUnregister } from '@/packages/mobx-rootstore';
import { List, Checkbox, Dialog } from '@/components';
import { GetDailyRecordDataStore } from './index.store';
import { dataHelper } from 'band-bluetooth-sdk';

const dataTypeOptions = [
  {
    type: dataHelper.DataType.Hr,
    title: '心率',
  },
  {
    type: dataHelper.DataType.BloodOxygen,
    title: '血氧',
  },
  {
    type: dataHelper.DataType.Sleep,
    title: '睡眠',
  },
  {
    type: dataHelper.DataType.DailyActivity,
    title: '日常活动',
  },
  {
    type: dataHelper.DataType.DailyActivityAndStatus,
    title: '日常活动及状态',
  },
  {
    type: dataHelper.DataType.RestingHeartRate,
    title: '静息心率',
  },
];

const recordTypeOptions = [
  {
    type: dataHelper.RecordType.Recent,
    title: '近期记录',
  },
  {
    type: dataHelper.RecordType.History,
    title: '历史记录',
  },
  {
    type: dataHelper.RecordType.SpotTest,
    title: '点测记录',
  },
];

const GetDailyRecordData = () => {
  const router = useRouter();
  const { mac } = router.params;
  if (!mac) throw new Error('缺少参数 mac');

  const store = useStore(GetDailyRecordDataStore, {
    creator: (rootStore) => new GetDailyRecordDataStore(rootStore, { mac }),
  });

  console.info('mac', mac);

  useUnregister(store);

  return (
    <>
      <View style={{ padding: '32px 0' }}>
        <List>
          {dataTypeOptions.map(({ title, type }) => {
            return (
              <List.Item key={title} title={title}>
                <Checkbox checked={store.dataType === type} onChange={() => store.checkDataType(type)} />
              </List.Item>
            );
          })}
        </List>

        <View style={{ paddingTop: '16px' }}>
          <List>
            {recordTypeOptions.map(({ title, type }) => {
              return (
                <List.Item key={title} title={title}>
                  <Checkbox checked={store.recordType === type} onChange={() => store.checkRecordType(type)} />
                </List.Item>
              );
            })}
          </List>
        </View>

        <View style={{ paddingTop: '16px' }}>
          <Button onClick={() => store.getData()}>获取</Button>
        </View>
      </View>

      <Dialog
        visible={store.resultDialog.visible}
        title={store.resultDialog.title}
        hideCancel
        onClose={store.resultDialog.close.bind(store.resultDialog)}
      >
        <ScrollView style={{ height: 400 }} scrollY>
          <View style={{ padding: '8px', backgroundColor: '#fff', borderRadius: '4px', overflowX: 'auto' }}>
            <Text space="ensp" selectable userSelect>
              {store.resultDialog.content}
            </Text>
          </View>
        </ScrollView>
      </Dialog>
    </>
  );
};

export default observer(GetDailyRecordData);
