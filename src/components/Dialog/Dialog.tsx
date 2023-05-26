import { View, Button } from '@tarojs/components';
import { PropsWithChildren, ReactNode, ReactElement } from 'react';
import { ViewProps } from '@tarojs/components/types/View';
import { moduleClassNames } from '../common/moduleClassNames';
import { StyleProps, mergeStylesProps } from '../common/styleProps';
import { toCSSLength } from '../common/toCSSLength';
import { BaseWith } from '@my/types';

import { Overlay } from '../Overlay';
// import { Button, ButtonProps } from '../Button';
import { CSSTransition } from '../CSSTransition';

import styles from './Dialog.module.scss';

const prefixClass = 'dialog';

type DialogBaseProps = {
  visible?: boolean;
  /** 自定义宽度  默认单位为PX */
  width?: string | number;
  /** 层级 默认为100 */
  zIndex?: number;
  /** 标题 */
  title?: ReactNode;
  /** 标题颜色 */
  titleColor?: string;
  /** 内容对齐方式，默认: center */
  contentAlign?: 'left' | 'center' | 'right';
  /** 取消按钮文本 */
  cancelText?: ReactNode;

  /** 确认按钮文本 */
  confirmText?: ReactNode;
  /** 隐藏确认按钮 */
  hideConfirm?: boolean;
  /** 隐藏取消按钮 */
  hideCancel?: boolean;
  /** 弹窗背景颜色  默认为#fff */
  backGroundColor?: string;
  /** 是否展示圆角 */
  noRound?: boolean;
  /** 是否减小padding厚度 */
  isMinishPadding?: boolean;
  /** top定位传值，默认45% 单位% */
  topValue?: number;
  buttons?:
    | ((args: { cancelBtn: ReactElement; confirmBtn: ReactElement; buttonClassName: string }) => ReactElement)
    | ReactNode;
  /** 是否支持点击遮罩关闭 */
  closeOnOverlayClick?: boolean;
  /** 关闭时销毁组件, 默认 false */
  destroyOnClose?: boolean;
  /** 确定事件 */
  onConfirm?: () => void;
  /** 取消事件 */
  onCancel?: () => void;
  /** 确认和取消时都会触发关闭事件 */
  onClose?: () => void;
  /** 点击遮罩事件 */
  onOverlayClick?: () => void;
} & StyleProps<{
  '--background-color': string;
  '--width': string | number;
  '--font-title-color': string;
  '--z-index': number;
  '--top-value': number;
}>;

export type DialogProps = BaseWith<PropsWithChildren<DialogBaseProps>, ViewProps>;

// eslint-disable-next-line complexity
export const Dialog = ({
  visible,
  width,
  zIndex,
  title,
  titleColor,
  contentAlign = 'center',

  backGroundColor,
  noRound,
  children,
  isMinishPadding = false,
  topValue,
  closeOnOverlayClick,
  destroyOnClose = false,
  onConfirm,
  onClose,
  onOverlayClick,
  ...restprops
}: DialogProps) => {
  const viewProps = mergeStylesProps(
    { ...restprops },
    {
      className: moduleClassNames(styles, prefixClass),
      style: {
        ...(width ? { '--width': toCSSLength(width) } : {}),
        ...(backGroundColor ? { '--background-color': backGroundColor } : {}),
        ...(titleColor ? { '--font-title-color': titleColor } : {}),
        ...(noRound && { '--border-radius': 0 }),
        ...(zIndex && { '--z-index': zIndex }),
        ...(isMinishPadding ? { '--content-padding': '0' } : {}),
        ...(topValue ? { '--top-value': toCSSLength(topValue, '%') } : {}),
      },
    },
  );

  return (
    <View {...viewProps}>
      <Overlay
        className={styles[`${prefixClass}-overlay`]}
        visible={Boolean(visible)}
        destroyOnClose={destroyOnClose}
        onClick={() => {
          onOverlayClick?.();
          closeOnOverlayClick && onClose?.();
        }}
      />
      <View className={styles[`${prefixClass}-wrapper`]}>
        <CSSTransition in={visible} timeout={300} classNames={styles} unmountOnExit={destroyOnClose}>
          <View className={styles[`${prefixClass}-main`]}>
            {title && <View className={moduleClassNames(styles, `${prefixClass}-title`)}>{title}</View>}
            <View
              className={moduleClassNames(
                styles,
                `${prefixClass}-content`,
                `${prefixClass}-content-align-${contentAlign}`,
              )}
            >
              {children}
            </View>
            <View className={moduleClassNames(styles, `${prefixClass}-button-wrapper`)}>
              <Button
                onClick={() => {
                  onConfirm?.();
                  onClose?.();
                }}
              >
                确定
              </Button>
            </View>
          </View>
        </CSSTransition>
      </View>
    </View>
  );
};
