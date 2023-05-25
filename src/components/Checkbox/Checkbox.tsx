import React, { ForwardedRef, PropsWithChildren, useContext, useImperativeHandle, Ref } from 'react';
import { BaseWith } from '@my/types';
import { View } from '@tarojs/components';
import { StyleProps, mergeStylesProps } from '../common/styleProps';
import { moduleClassNames } from '../common/moduleClassNames';
import { usePropsValue } from '../common/usePropsValue';
import { forwardRef } from '../common/forwardRef';
import { ViewProps } from '@tarojs/components/types/View';

import { CheckboxGroupContext } from './CheckboxGroupContext';
import styles from './Checkbox.module.scss';

const prefixClass = 'checkbox';

export type CheckboxValue = any;

type BaseCheckboxProps<T> = PropsWithChildren<{
  /** 是否选中 */
  checked?: boolean;
  /** 默认是否选中 */
  defaultChecked?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 用于 Group 的 value */
  value?: T;
  block?: boolean;
  /** 禁止点击切换 */
  disabledClickToggle?: boolean;
  /** 自定义 icon */
  icon?: (checked: boolean) => React.ReactNode;
  /** 变更事件 */
  onChange?: (checked: boolean) => void;
  ref?: Ref<CheckboxRef>;
}> &
  StyleProps<
    | '--font-size'
    | '--font-color'
    | '--icon-size'
    | '--checked-icon-size'
    | '--checked-icon-color'
    | '--disabled-font-color'
    | '--gap'
  >;

export type CheckboxProps<T extends CheckboxValue = any> = BaseWith<BaseCheckboxProps<T>, ViewProps>;

export interface CheckboxRef {
  toggle: (checked?: boolean) => void;
}

export const Checkbox = forwardRef(function InnerCheckbox<T>(
  {
    checked: _checked,
    defaultChecked,
    disabled: _disabled,
    value,
    block,
    disabledClickToggle,
    children,
    icon,
    onChange,
    ...restProps
  }: CheckboxProps<T>,
  ref: ForwardedRef<CheckboxRef>,
) {
  let [checked, setChecked] = usePropsValue<boolean>({
    value: _checked,
    defaultValue: defaultChecked ?? false,
    onChange,
  });

  // group
  const groupContext = useContext(CheckboxGroupContext);
  const warning = () => {
    if (_checked !== undefined) {
      console.warn('Checkbox: 使用 Checkbox.Group 时，`checked` 属性无效');
    }
    if (defaultChecked !== undefined) {
      console.warn('Checkbox: 使用 Checkbox.Group 时，`defaultChecked` 属性无效');
    }
  };

  let disabled = _disabled;
  if (groupContext) {
    warning();

    checked = groupContext.value.includes(value);
    setChecked = (checked) => {
      if (checked) {
        groupContext.check(value);
      } else {
        groupContext.uncheck(value);
      }
      onChange?.(checked);
    };
    disabled ??= groupContext.disabled;
  }

  // ref
  useImperativeHandle(
    ref,
    () => {
      return { toggle: (v) => setChecked(v ?? !checked) };
    },
    [checked, setChecked],
  );

  // icon
  const renderIcon = () => {
    if (icon) {
      return icon(checked);
    }

    return checked && <View className={styles[`${prefixClass}-icon-checked`]} />;
  };

  const props = mergeStylesProps(
    {
      ...restProps,
      ...(!disabledClickToggle ? { onClick: () => !disabled && setChecked(!checked) } : undefined),
    },
    {
      className: moduleClassNames(styles, prefixClass, {
        [`${prefixClass}-checked`]: checked,
        [`${prefixClass}-disabled`]: disabled,
        [`${prefixClass}-block`]: block,
      }),
    },
  );

  return (
    <View {...props}>
      <View className={styles[`${prefixClass}-icon`]}>{renderIcon()}</View>
      {children && <View className={styles[`${prefixClass}-content`]}>{children}</View>}
    </View>
  );
});
