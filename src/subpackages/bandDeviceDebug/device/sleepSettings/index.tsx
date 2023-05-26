import { useEffect } from 'react';
import { useRouter } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { observer } from 'mobx-react-lite';
import { useStore, useUnregister } from '@/packages/mobx-rootstore';
import { List, Switch } from '@/components';
import { HoursMinutesPicker } from '../../components/HoursMinutesPicker';
import { SleepSettingsStore } from './index.store';
import dayjs from 'dayjs';

const WEEK = '一二三四五六日';

const SleepSettings = () => {
  const store = useStore(SleepSettingsStore);

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
      <List>
        <List.Item title="睡眠监测开关">
          <Switch
            checked={store.settings?.sleepSwitch ?? false}
            onChange={(checked) => store.changeSleepSwitch(checked)}
          />
        </List.Item>
      </List>

      <View style={{ paddingTop: '16px' }}>
        <List>
          <HoursMinutesPicker
            hours={store.scheduleSleepDuration?.[0]}
            minutes={store.scheduleSleepDuration?.[1]}
            minHours={3}
            maxHours={12}
            multipleMinutes={30}
            onChange={(value) => store.changeScheduleSleepDuration(value)}
          >
            <List.Item
              title="目标睡眠时长"
              clickable
              content={
                store.scheduleSleepDuration
                  ? `${store.scheduleSleepDuration[0]}小时${store.scheduleSleepDuration[1]}分钟`
                  : ''
              }
            />
          </HoursMinutesPicker>
        </List>
      </View>

      <View style={{ paddingTop: '16px' }}>
        <List>
          <HoursMinutesPicker
            hours={store.settings?.sleepSchedule.sleepStartTime?.hour}
            minutes={store.settings?.sleepSchedule.sleepStartTime?.minute}
            onChange={(value) =>
              store.saveSleepSchedule({
                sleepStartTime: { hour: value[0], minute: value[1] },
              })
            }
          >
            <List.Item
              title="计划入睡时间"
              clickable
              content={formatTimeView(store.settings?.sleepSchedule.sleepStartTime)}
            />
          </HoursMinutesPicker>
          <HoursMinutesPicker
            hours={store.settings?.sleepSchedule.sleepEndTime?.hour}
            minutes={store.settings?.sleepSchedule.sleepEndTime?.minute}
            onChange={(value) =>
              store.saveSleepSchedule({
                sleepEndTime: { hour: value[0], minute: value[1] },
              })
            }
          >
            <List.Item
              title="计划起床时间"
              clickable
              content={formatTimeView(store.settings?.sleepSchedule.sleepEndTime)}
            />
          </HoursMinutesPicker>
        </List>
      </View>

      <View style={{ paddingTop: '16px' }}>
        <List>
          <List.Item title="入睡提醒">
            <Switch
              checked={store.settings?.sleepSchedule.fallAsleepRemindSetting?.remindSwitch ?? false}
              onChange={(checked) => store.saveFallAsleepRemindSetting({ remindSwitch: checked })}
            />
          </List.Item>
          {store.settings?.sleepSchedule.fallAsleepRemindSetting?.remindSwitch && (
            <>
              <HoursMinutesPicker
                hours={store.settings?.sleepSchedule.fallAsleepRemindSetting?.remindTime?.hour}
                minutes={store.settings?.sleepSchedule.fallAsleepRemindSetting?.remindTime?.minute}
                onChange={(value) =>
                  store.saveFallAsleepRemindSetting({ remindTime: { hour: value[0], minute: value[1] } })
                }
              >
                <List.Item
                  title="提醒时间"
                  clickable
                  content={
                    store.settings?.sleepSchedule.fallAsleepRemindSetting?.remindTime
                      ? formatTimeView(store.settings?.sleepSchedule.fallAsleepRemindSetting?.remindTime)
                      : ''
                  }
                />
              </HoursMinutesPicker>
              {Array.from({ length: 7 })
                .map((_, i) => i + 1)
                .map((week, index) => (
                  <List.Item key={week} title={`重复：周${WEEK[index]}`}>
                    <Switch
                      checked={store.settings?.sleepSchedule.fallAsleepRemindSetting?.remindCycle.some(
                        (v) => v === week,
                      )}
                      onChange={(checked) => store.changeFallAsleepRemindCycle(week, checked)}
                    />
                  </List.Item>
                ))}
            </>
          )}
        </List>
      </View>
    </View>
  );
};

function formatTimeView(data?: { hour: number; minute: number }) {
  if (!data) return '';
  const { hour, minute } = data;
  return dayjs().set('hours', hour).set('minutes', minute).format('HH:mm');
}

export default observer(SleepSettings);
