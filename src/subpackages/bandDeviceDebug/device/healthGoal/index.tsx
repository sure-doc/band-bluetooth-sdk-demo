import { useEffect } from 'react';
import { useRouter } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { observer } from 'mobx-react-lite';
import { useStore, useUnregister } from '@/packages/mobx-rootstore';
import { List } from '@/components';
import { HealthGoalStore } from './index.store';
import { SinglePicker } from '../../components/SinglePicker';

const HealthGoal = () => {
  const store = useStore(HealthGoalStore);

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
        {store.items.map((item) => {
          return (
            <SinglePicker
              key={item.type}
              min={item.optionsConfig.min}
              max={item.optionsConfig.max}
              multiple={item.optionsConfig.multiple}
              value={item.value}
              onChange={(value) =>
                store.setItemValue({
                  type: item.type,
                  value,
                })
              }
            >
              <List.Item title={item.title} content={item.value} clickable />
            </SinglePicker>
          );
        })}
      </List>
    </View>
  );
};

export default observer(HealthGoal);
