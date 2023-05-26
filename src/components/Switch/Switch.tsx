import { FC, ReactNode, useState } from 'react';
import { View } from '@tarojs/components';
import { usePropsValue } from '../common/usePropsValue';
import { StyleProps } from '../common/styleProps';
import { ViewProps } from '@tarojs/components/types/View';
import { Except, Simplify } from 'type-fest';

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

/**
 * 参考 type-fest Merge, 参数顺序和生成的新类型的字段顺序相反
 */

type BaseWith_<FirstType, SecondType> = FirstType & Except<SecondType, Extract<keyof SecondType, keyof FirstType>>;

/**
合并两个类型，第一个类型覆盖第二个类型
@example
```
type Foo = {
	a: string;
	b: string;
};
type Bar = {
	b: number;
  c: number;
};
const ab: BaseWith<Foo, Bar> = {a: 'hell', b: 'world', c: 3};
```
*/
export type BaseWith<FirstType, SecondType> = Simplify<BaseWith_<FirstType, SecondType>>;
