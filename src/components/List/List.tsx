import type { ViewProps } from '@tarojs/components/types/View';
import { CSSProperties, PropsWithChildren, createContext, useMemo } from 'react';
import { View } from '@tarojs/components';
import { StyleProps, mergeStylesProps } from '../common/styleProps';
import { moduleClassNames } from '../common/moduleClassNames';
import { BaseWith } from '@my/types';

import styles from './List.module.scss';
import { InputProps } from '../Input';

const prefixClass = `list`;

interface ListContextProps {
  /** 标题宽度 */
  titleWidth?: CSSProperties['width'];
  /** Input 默认 align */
  inputAlign?: InputProps['align'];
}

export const ListContext = createContext<ListContextProps | undefined>(undefined);

type BaseListProps = PropsWithChildren<{
  /** 是否卡片，默认是； 卡片模式下展示为带 margin 和圆角的卡片,不是卡片时整宽的列表 */
  card?: boolean;
  /** 是否加阴影，默认：false */
  shadow?: boolean;
  /** 不是卡片时，是否要边框，默认：true */
  border?: boolean;
}> &
  ListContextProps &
  StyleProps<'--font-color' | '--font-size' | '--prefix-width' | '--align-items' | '--active-background-color'>;

export type ListProps = BaseWith<BaseListProps, ViewProps>;

export const List = ({
  card = true,
  shadow,
  border = true,
  titleWidth,
  inputAlign = 'right',
  children,
  ...restProps
}: ListProps) => {
  const props = mergeStylesProps(restProps, {
    className: moduleClassNames(styles, prefixClass, `${prefixClass}-${card ? 'card' : 'default'}`, {
      [`${prefixClass}--shadow`]: shadow,
      [`${prefixClass}-border-disabled`]: !card && !border,
    }),
  });

  const contentValue = useMemo(() => ({ titleWidth, inputAlign }), [titleWidth, inputAlign]);
  return (
    <View {...props}>
      <View className={styles[`${prefixClass}-inner`]}>
        <ListContext.Provider value={contentValue}>{children}</ListContext.Provider>
      </View>
    </View>
  );
};
