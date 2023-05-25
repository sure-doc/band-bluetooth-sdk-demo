import { useEffect } from 'react';
import { useRouter } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { observer } from 'mobx-react-lite';
import { useStore, useUnregister } from '@/packages/mobx-rootstore';
import { List, Switch } from '@/components';
import { HrSettingsStore } from './index.store';
import { SinglePicker } from '../../components/SinglePicker';

const HrSettings = () => {
  const store = useStore(HrSettingsStore);

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
        <List.Item title="手环日常心率检测开关">
          <Switch checked={store.hrSwitch} onChange={(checked) => store.changeHrSwitch(checked)} />
        </List.Item>

        <SinglePicker
          value={store.settings?.hrInterval}
          min={1}
          max={300}
          onChange={(value) => store.changeHrInterval(value)}
        >
          <List.Item title="手环日常心率周期检测间隔" clickable>
            {store.settings?.hrInterval ? `${store.settings.hrInterval}秒` : ''}
          </List.Item>
        </SinglePicker>
      </List>

      <View style={{ paddingTop: '16px' }}>
        <List>
          <List.Item title="日常最大心率预警">
            <Switch checked={store.hrDailyWarnSwitch} onChange={(checked) => store.changeHrDailyWarnSwitch(checked)} />
          </List.Item>

          <SinglePicker
            value={store.settings?.hrDailyWarnValue}
            min={40}
            max={210}
            onChange={(value) => store.changeHrDailyWarn(value)}
          >
            <List.Item title="日常最大心率预警值" clickable>
              {store.settings?.hrDailyWarnValue ? `${store.settings.hrDailyWarnValue}次/分` : ''}
            </List.Item>
          </SinglePicker>
        </List>
      </View>

      <View style={{ paddingTop: '16px' }}>
        <List>
          <List.Item title="运动最大心率预警">
            <Switch checked={store.hrSportWarnSwitch} onChange={(checked) => store.changeHrSportWarnSwitch(checked)} />
          </List.Item>
          <SinglePicker
            value={store.settings?.hrSportWarnValue}
            min={40}
            max={210}
            onChange={(value) => store.changeHrSportWarn(value)}
          >
            <List.Item title="运动最大心率预警值" clickable>
              {store.settings?.hrSportWarnValue ? `${store.settings.hrSportWarnValue}次/分` : ''}
            </List.Item>
          </SinglePicker>
        </List>
      </View>
    </View>
  );
};

export default observer(HrSettings);
