import { View } from '@tarojs/components';
import { ViewProps } from '@tarojs/components/types/View';
import { PropsWithChildren } from 'react';
import { moduleClassNames } from '../common/moduleClassNames';
import { mergeStylesProps, StyleProps } from '../common/styleProps';
import { BaseWith } from '@my/types';

import { CSSTransition } from '../CSSTransition';

import styles from './Overlay.module.scss';

const prefixClass = 'overlay';

type OverlayBaseProps = {
  /** 是否显示遮罩 */
  visible: boolean;
  /** 背景颜色 */
  backgroundColor?: string;
  /** 关闭时销毁组件, 默认 false */
  destroyOnClose?: boolean;
  /** zIndex */
  zIndex?: number | string;
  /** 点击遮罩 */
  onOverlayClick?: () => void;
} & StyleProps<'--z-index'>;

export type OverlayProps = BaseWith<PropsWithChildren<OverlayBaseProps>, ViewProps>;

export const Overlay = ({
  visible,
  destroyOnClose = false,
  backgroundColor,
  children,
  zIndex,
  onOverlayClick,
  ...resetProps
}: OverlayProps) => {
  const props = mergeStylesProps(
    { ...resetProps },
    {
      className: moduleClassNames(styles, prefixClass),
      style: {
        ...(backgroundColor ? { '--background-color': backgroundColor } : {}),
        ...(zIndex ? { '--z-index': zIndex } : {}),
      },
    },
  );
  return (
    <CSSTransition
      in={visible}
      appear
      classNames={{ ...styles, appear: styles.enter, appearActive: styles.enterActive, appearDone: styles.enterDone }}
      timeout={300}
      unmountOnExit={destroyOnClose}
    >
      <View {...props}>
        {onOverlayClick && <View className={styles[`${prefixClass}-click`]} onClick={onOverlayClick} />}
        {children && <View className={styles[`${prefixClass}-content`]}>{children}</View>}
      </View>
    </CSSTransition>
  );
};
