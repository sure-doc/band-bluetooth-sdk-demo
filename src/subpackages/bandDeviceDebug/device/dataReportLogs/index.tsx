import type { CSSProperties } from 'react';
import dayjs from 'dayjs';
import { toJS } from 'mobx';
import { memo, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useRouter } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { useStore } from '@/packages/mobx-rootstore';
import VirtualList from '@tarojs/components/virtual-list';

import { DataReportLogsStore } from './index.store';
import { DataView } from '../../components/DataView';

import styles from './index.module.scss';

const Row = memo(
  ({
    id,
    data,
    index,
    style,
  }: {
    /** 组件 ID */
    id: string;
    /** 单项的样式，样式必须传入组件的 style 中 */
    style?: CSSProperties;
    /** 组件渲染的数据 */
    data: { categoryId: number; commandId: number; ts: number; data?: string }[];
    /** 组件渲染数据的索引 */
    index: number;
    /** 组件是否正在滚动，当 useIsScrolling 值为 true 时返回布尔值，否则返回 undefined */
    isScrolling?: boolean;
  }) => {
    const itemData = data[index];
    return (
      <View id={id} style={{ ...style, paddingTop: '12px', background: '#f1f1f2' }}>
        <DataView
          height={250}
          title={
            <View>
              {dayjs(itemData.ts).format('YYYY-MM-DD HH:mm:ss')} 类别:{' '}
              <Text style={{ color: 'red' }}>{itemData.categoryId}</Text>, 命令:{' '}
              <Text style={{ color: 'red' }}>{itemData.commandId}</Text>
            </View>
          }
        >
          {itemData.data ?? 'undefined'}
        </DataView>
      </View>
    );
  },
);

const DataReportLogs = () => {
  const store = useStore(DataReportLogsStore);

  const router = useRouter();

  const { mac } = router.params;

  useEffect(() => {
    if (!mac) return console.error('DataReportLogs: 缺少参数：mac');
    store.init({ mac });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const list = toJS(store.dataList)
    .reverse()
    .map(({ ts, data }) => {
      return { categoryId: data.categoryId, commandId: data.commandId, ts, data: data.data };
    });

  return (
    <View className={styles.container}>
      <VirtualList height={800} width="100%" itemSize={300} itemData={list} itemCount={list.length} item={Row} />
    </View>
  );
};

export default observer(DataReportLogs);
