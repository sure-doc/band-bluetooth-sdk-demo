import { PropsWithChildren, useMemo } from 'react';
import { Picker } from '@tarojs/components';

export type SinglePickerProps = PropsWithChildren<{
  value?: number;
  min?: number;
  max: number;
  multiple?: number;
  onChange?: (newValue: number) => void;
}>;

export const SinglePicker = ({
  max,
  min: minProp,
  multiple: multipleProp,
  value,
  children,
  onChange,
}: SinglePickerProps) => {
  const min = minProp ?? 0;
  const multiple = multipleProp ?? 1;

  const options = useMemo(
    () =>
      Array.from({ length: max - min + 1 })
        .map((_, i) => i + min)
        .filter((v) => v % multiple === 0),
    [min, max, multiple],
  );

  return (
    <Picker
      mode="selector"
      range={options}
      value={value !== undefined ? options.findIndex((item) => item === value) : undefined}
      onChange={(e) => {
        const index = e.detail.value as number;
        const newValue = options[index];
        onChange?.(newValue);
      }}
    >
      {children}
    </Picker>
  );
};
