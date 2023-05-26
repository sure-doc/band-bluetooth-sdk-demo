import { PropsWithChildren } from 'react';
import { usePropsValue } from '../common/usePropsValue';

import { CheckboxGroupContext, CheckboxGroupContextValue } from './CheckboxGroupContext';
import { CheckboxValue } from './Checkbox';

export type CheckboxGroupProps<T extends CheckboxValue = any> = PropsWithChildren<{
  /** 当前值 */
  value?: T[];
  /** 默认值 */
  defaultValue?: T[];
  /** 是否禁用 */
  disabled?: boolean;
  /** 数据改变时触发 */
  onChange?: (val: T[]) => void;
}>;

export const CheckboxGroup = <T extends CheckboxValue = any>({
  value,
  defaultValue = [],
  disabled,
  children,
  onChange,
}: CheckboxGroupProps<T>) => {
  const [internalValue, setInternalValue] = usePropsValue({ value, defaultValue });

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const contentValue: CheckboxGroupContextValue = {
    value: internalValue,
    disabled,
    check: (v) => {
      const nextValue = [...internalValue, v];
      setInternalValue(nextValue);

      onChange?.(nextValue);
    },
    uncheck: (v) => {
      const nextValue = internalValue.filter((item) => item !== v);
      setInternalValue(internalValue.filter((item) => item !== v));

      onChange?.(nextValue);
    },
  };
  return <CheckboxGroupContext.Provider value={contentValue}>{children}</CheckboxGroupContext.Provider>;
};
