import { useEffect, useState } from 'react';
import { useRouter } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { observer } from 'mobx-react-lite';
import { useStore, useUnregister } from '@/packages/mobx-rootstore';
import { List } from '@/components';
import { DeviceTimeInfoStore } from './index.store';
import dayjs from 'dayjs';
import { HoursMinutesPicker } from '../../components/HoursMinutesPicker';

const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const DeviceTime = observer(() => {
  const router = useRouter();
  const { mac } = router.params;
  console.info('mac', mac);
  if (!mac) throw new Error('缺少参数 mac');
  const store = useStore(DeviceTimeInfoStore, { creator: (rootStore) => new DeviceTimeInfoStore(rootStore, { mac }) });

  useEffect(() => {
    store.init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useUnregister(store);

  return (
    <View style={{ paddingTop: '16px' }}>
      <List>
        <List.Item
          title="设备时间"
          content={store.deviceTime?.timestamp ? dayjs(store.deviceTime.timestamp * 1000).format(TIME_FORMAT) : ''}
        />
        <TimeListItem />
      </List>

      <View style={{ paddingTop: '16px' }}>
        <List>
          <List.Item title="重新获取设备时间" onClick={() => store.refreshDeviceTime()} />

          <List.Item title="同步当前时间到设备" onClick={() => store.syncTimeToDevice()} />
        </List>
      </View>

      <View style={{ paddingTop: '16px' }}>
        <List>
          <HoursMinutesPicker
            hours={store.customTime.hour}
            minutes={store.customTime.minute}
            onChange={(value) => store.changeCustomTime({ hour: value[0], minute: value[1] })}
          >
            <List.Item title="自定义时间" content={formatTimeView(store.customTime)} />
          </HoursMinutesPicker>
          <List.Item title="下发时间" onClick={() => store.sendCustomTimeToDevice()} />
        </List>
      </View>
    </View>
  );
});

function TimeListItem() {
  const [ts, setTs] = useState(new Date().getTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTs(new Date().getTime());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return <List.Item title="当前时间" content={dayjs(ts).format(TIME_FORMAT)} />;
}

export default DeviceTime;

function formatTimeView(data?: { hour: number; minute: number }) {
  if (!data) return '';
  const { hour, minute } = data;
  return dayjs().set('hours', hour).set('minutes', minute).format('HH:mm');
}
