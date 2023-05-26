import { useEffect } from 'react';
import { useRouter } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { observer } from 'mobx-react-lite';
import { useStore, useUnregister } from '@/packages/mobx-rootstore';
import { dataHelper } from 'band-bluetooth-sdk';
import { List, Switch, Checkbox } from '@/components';
import { BloodOxygenSettingsStore } from './index.store';
import { SinglePicker } from '../../components/SinglePicker';

const BloodOxygenSettings = () => {
  const store = useStore(BloodOxygenSettingsStore);

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
        <List.Item title="手环血氧检测类型开关">
          <Switch checked={store.settings?.switch} onChange={(checked) => store.saveSettings({ switch: checked })} />
        </List.Item>
      </List>

      <View style={{ paddingTop: '16px' }}>
        <List>
          <List.Item title="睡眠血氧">
            <Checkbox
              checked={store.settings?.type === dataHelper.BloodOxygenSettingType.SleepBloodOxygen}
              onChange={() => store.saveSettings({ type: dataHelper.BloodOxygenSettingType.SleepBloodOxygen })}
            />
          </List.Item>
          <List.Item title="全天血氧">
            <Checkbox
              checked={store.settings?.type === dataHelper.BloodOxygenSettingType.AllDayBloodOxygen}
              onChange={() => store.saveSettings({ type: dataHelper.BloodOxygenSettingType.AllDayBloodOxygen })}
            />
          </List.Item>
        </List>
      </View>

      <View style={{ paddingTop: '16px' }}>
        <List>
          <SinglePicker
            min={1}
            max={300}
            value={store.settings?.interval}
            onChange={(value) => {
              store.saveSettings({ interval: value });
            }}
          >
            <List.Item title="手环血氧周期检测间隔（单位s）" clickable>
              {store.settings?.interval ? `${store.settings?.interval}秒` : ''}
            </List.Item>
          </SinglePicker>
        </List>
      </View>
    </View>
  );
};

export default observer(BloodOxygenSettings);
