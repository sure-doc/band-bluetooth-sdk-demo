import { useEffect } from 'react';
import { useRouter } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { observer } from 'mobx-react-lite';
import { useStore, useUnregister } from '@/packages/mobx-rootstore';
import { List } from '@/components';
import { SportHrSectionSettingsStore } from './index.store';
import { SinglePicker } from '../../components/SinglePicker';
import { MultiplePicker } from '../../components/MultiplePicker';

const SportHrSectionSettings = () => {
  const store = useStore(SportHrSectionSettingsStore);

  const router = useRouter();

  const { mac } = router.params;

  useEffect(() => {
    if (!mac) throw new Error('缺少参数 mac');
    store.init({ mac });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useUnregister(store);

  console.info('render', store.settings);

  return (
    <View style={{ padding: '32px 0' }}>
      <List>
        <SinglePicker max={220} min={60} value={store.maxHr} onChange={(v) => store.changeMaxHr(v)}>
          <List.Item title="最大心率值" content={store.maxHr} clickable />
        </SinglePicker>
      </List>
      <View style={{ paddingTop: '16px' }}>
        <List>
          {Array.from({ length: 5 })
            .map((_, i) => ({
              index: i,
              title: ['热身', '燃脂', '有氧耐力', '无氧耐力', '极限'][i],
              hrSection: store.settings?.hrSections![i],
              preHrSection: store.settings?.hrSections![i - 1],
              nextHrSection: store.settings?.hrSections![i + 1],
            }))
            .map(({ title, hrSection, preHrSection, nextHrSection, index }) => (
              <MultiplePicker
                key={title}
                oneMin={preHrSection ? preHrSection.min + 2 : 60}
                oneMax={nextHrSection ? nextHrSection.max - 3 : 220}
                twoMin={preHrSection ? preHrSection.min + 3 : 60}
                twoMax={nextHrSection ? nextHrSection.max - 2 : 220}
                value={hrSection && [hrSection.min, hrSection.max]}
                onChange={([min, max]) => store.changeHrSection({ index, min, max })}
              >
                <List.Item title={title} clickable content={hrSection && `${hrSection.min}-${hrSection.max}次/分`} />
              </MultiplePicker>
            ))}
        </List>
      </View>
    </View>
  );
};

export default observer(SportHrSectionSettings);
