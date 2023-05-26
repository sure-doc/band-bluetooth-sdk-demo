import type { ViewProps } from '@tarojs/components/types/View';
import { ReactNode, PropsWithChildren, CSSProperties, useContext } from 'react';
import { View } from '@tarojs/components';
import { BaseWith } from '@my/types';
import { StyleProps, mergeStylesProps } from '../common/styleProps';
import { moduleClassNames } from '../common/moduleClassNames';
import classNames from 'classnames';

import { ListContext } from './List';

import styles from './List.module.scss';

const prefixClass = 'list-item';

export type BaseListItemProps = PropsWithChildren<{
  /** 左边标题 */
  title?: ReactNode;
  /** 标题宽度 */
  titleWidth?: CSSProperties['width'];
  /** 是否可以点击，会有点击效果，传入 onClick 时默认为 true，否则 false */
  clickable?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 右侧是否显示箭头图标，也支持传入 ReactNode 来自定义图标；默认值与 `clickable` 相同 */
  arrow?: boolean | ReactNode;
  /** 内容，与 children 一致, 传入 content 时，覆盖 children */
  content?: ReactNode;
  /** 描述文本 */
  description?: ReactNode;
  /** 内容是否块元素 */
  blockContent?: boolean;
  /** 顶部内容 */
  header?: ReactNode;
  /** 底部内容 */
  footer?: ReactNode;
  /** 左侧内容 */
  prefix?: ReactNode;
  /** 右侧内容 */
  suffix?: ReactNode;
  /** 中间内容的顶部 */
  contentHeader?: ReactNode;
  /** 中间内容的底部 */
  contentFooter?: ReactNode;
  /** title className */
  titleClassName?: string;
  /** 左边标题和描述文本的间隔 */
  titleAndDescriptionHeight?: string;
}> &
  StyleProps<'--prefix-width' | '--title-width' | '--align-items' | '--active-background-color'>;

export type ListItemProps = BaseWith<BaseListItemProps, ViewProps>;

export const ListItem = ({
  title,
  titleClassName,
  titleWidth: _titleWidth,
  titleAndDescriptionHeight,
  content: _content,
  description,
  arrow: _arrow,
  clickable: _clickable,
  disabled,
  blockContent,
  prefix,
  suffix,
  children,
  header,
  footer,
  contentHeader,
  contentFooter,
  hoverClass,
  onClick,
  ...restProps
}: ListItemProps) => {
  const clickable = _clickable ?? !!onClick;
  const arrow = _arrow ?? clickable;
  const content = _content ?? children ?? undefined;

  const listContext = useContext(ListContext);

  const titleWidth = _titleWidth ?? listContext?.titleWidth;

  const props = mergeStylesProps<ViewProps>(
    {
      ...restProps,
      onClick: !disabled ? onClick : undefined,
      hoverClass: classNames(hoverClass, clickable && styles[`${prefixClass}-active`]),
    },
    {
      className: moduleClassNames(styles, prefixClass, {
        [`${prefixClass}-disabled`]: disabled,
        [`${prefixClass}-block-content`]: blockContent,
      }),
      style: {
        ...(titleWidth ? { '--title-width': titleWidth } : undefined),
      },
    },
  );

  return (
    <View {...props}>
      <View className={styles[`${prefixClass}-main`]}>
        {header && <View className={styles[`${prefixClass}-header`]}>{header}</View>}

        {/* middle */}
        <View className={styles[`${prefixClass}-middle`]}>
          {/* prefix */}
          {prefix && <View className={styles[`${prefixClass}-prefix`]}>{prefix}</View>}

          <View
            className={styles[`${prefixClass}-content-container`]}
            style={{ rowGap: `${titleAndDescriptionHeight}` }}
          >
            {contentHeader && <View className={styles[`${prefixClass}-content-header`]}>{contentHeader}</View>}
            <View className={styles[`${prefixClass}-content-middle`]}>
              {title && <View className={classNames(styles[`${prefixClass}-title`], titleClassName)}>{title}</View>}
              {content !== undefined && (
                <View className={styles[`${prefixClass}-content-wrapper`]}>
                  <View className={styles[`${prefixClass}-content`]}>{content}</View>
                </View>
              )}
            </View>
            {description && <View className={styles[`${prefixClass}-description`]}>{description}</View>}
            {contentFooter && <View className={styles[`${prefixClass}-content-footer`]}>{contentFooter}</View>}
          </View>

          {/* suffix */}
          {suffix && <View className={styles[`${prefixClass}-suffix`]}>{suffix}</View>}

          {/* arrow */}
          {arrow && <View className={styles[`${prefixClass}-arrow`]}>{arrow === true ? '>' : arrow}</View>}
        </View>

        {footer && <View className={styles[`${prefixClass}-footer`]}>{footer}</View>}
      </View>
    </View>
  );
};
