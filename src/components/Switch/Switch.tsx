import { FC, ReactNode, useState } from 'react';
import { View } from '@tarojs/components';
import { usePropsValue } from '../common/usePropsValue';
import { StyleProps } from '../common/styleProps';
import { BaseWith } from '@my/types';
import { ViewProps } from '@tarojs/components/types/View';

import classNames from 'classnames';

const prefixClass = 'switch';

export type BaseSwitchProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  loading?: boolean;
  disabled?: boolean;
  checkedText?: ReactNode;
  uncheckedText?: ReactNode;
  beforeChange?: (val: boolean) => Promise<void>;
  onChange?: (checked: boolean) => void;
} & StyleProps<'--checked-color'>;

export type SwitchProps = BaseWith<BaseSwitchProps, ViewProps>;
export type SwitchComponent = FC<SwitchProps>;

export function createSwitch({ styles }: { styles: Record<string, string> }) {
  const Switch: SwitchComponent = (props) => {
    const {
      checked: _checked,
      defaultChecked = false,
      loading: _loading,
      disabled: _disabled,
      checkedText,
      uncheckedText,
      beforeChange,
      onChange,
    } = props;

    const [changing, setChanging] = useState(false);

    const loading = _loading || changing;

    const disabled = _disabled || loading || false;

    const [checked, setChecked] = usePropsValue<boolean>({
      value: _checked,
      defaultValue: defaultChecked,
      onChange,
    });

    async function onClick() {
      if (disabled) {
        return;
      }
      const nextChecked = !checked;
      if (beforeChange) {
        setChanging(true);
        try {
          await beforeChange(nextChecked);
          setChecked(nextChecked);
          setChanging(false);
        } catch (e) {
          setChanging(false);
          throw e;
        }
        return;
      }

      setChecked(nextChecked);
    }

    return (
      <View
        onClick={onClick}
        className={classNames(styles[prefixClass], {
          [styles[`${prefixClass}-checked`]]: checked,
          [styles[`${prefixClass}-disabled`]]: disabled,
        })}
      >
        <View className={styles[`${prefixClass}-box`]}>{checked ? checkedText : uncheckedText}</View>
        <View className={styles[`${prefixClass}-handle`]} />
      </View>
    );
  };

  return Switch;
}
