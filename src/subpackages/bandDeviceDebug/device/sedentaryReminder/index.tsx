import { useEffect } from 'react';
import { useRouter } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import { observer } from 'mobx-react-lite';
import { useStore, useUnregister } from '@/packages/mobx-rootstore';
import { List, Switch } from '@/components';
import { SedentaryReminderStore } from './index.store';
import dayjs from 'dayjs';
import { SinglePicker } from '../../components/SinglePicker';
import { MultiplePicker } from '../../components/MultiplePicker';

const SedentaryReminder = () => {
  const store = useStore(SedentaryReminderStore);

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
        <List.Item title="久坐提醒开关">
          <Switch checked={!!store.settings?.enable} onChange={(checked) => store.changeEnable(checked)} />
        </List.Item>
      </List>

      <View style={{ paddingTop: '16px' }}>
        <List>
          <SinglePicker
            value={store.settings?.thresholdValue.duration}
            min={1}
            max={300}
            onChange={(value) => store.changeDuration(value)}
          >
            <List.Item title="久坐设置: duration" clickable>
              {store.settings?.thresholdValue.duration ? `${store.settings?.thresholdValue.duration}分钟` : ''}
            </List.Item>
          </SinglePicker>
          <SinglePicker
            value={store.settings?.thresholdValue.step}
            min={1}
            max={300}
            onChange={(value) => store.changeSteps(value)}
          >
            <List.Item title="久坐设置: step" clickable>
              {store.settings?.thresholdValue.step ? `${store.settings.thresholdValue.step}步` : ''}
            </List.Item>
          </SinglePicker>
        </List>
      </View>

      <View style={{ paddingTop: '16px' }}>
        <List>
          {store.settings?.timeSets.map((item, index) => {
            return (
              <MultiplePicker
                key={index}
                value={item.startTime && item.endTime ? [item.startTime.hour, item.endTime.hour] : undefined}
                oneMin={0}
                oneMax={23}
                twoMin={0}
                twoMax={23}
                onChange={([start, end]) => store.changeTimeSets({ item, start, end })}
              >
                <List.Item title={`有效区间-${index + 1}`} clickable>
                  {item.startTime !== undefined && item.endTime !== undefined
                    ? `${formatTimeView(item.startTime)} ~ ${formatTimeView(item.endTime)}`
                    : ''}
                </List.Item>
              </MultiplePicker>
            );
          })}
          <List.Item>
            <View>
              {(store.settings?.timeSets?.length ?? 0) < 3 && (
                <Button size="mini" onClick={() => store.addTimeSet()}>
                  添加
                </Button>
              )}
              {(store.settings?.timeSets?.length ?? 0) > 1 && (
                <Button style={{ marginLeft: '8px' }} size="mini" onClick={() => store.removeTimeSet()}>
                  删除
                </Button>
              )}
            </View>
          </List.Item>
        </List>
      </View>
    </View>
  );
};

function formatTimeView({ hour, minute }: { hour: number; minute: number }) {
  return dayjs().set('hours', hour).set('minutes', minute).format('HH:mm');
}

export default observer(SedentaryReminder);
