import { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { Picker } from '@tarojs/components';

export type MultiplePikcerProps = PropsWithChildren<{
  value?: [number, number];
  oneMin?: number;
  oneMax: number;
  twoMin?: number;
  twoMax: number;
  twoMultiple?: number;
  onChange?: (newValues: [number, number]) => void;
}>;

export function MultiplePicker({
  children,
  value,
  oneMin: oneMinProp,
  oneMax,
  twoMin: twoMinProp,
  twoMax,
  twoMultiple: twoMultipleProp,
  onChange,
}: MultiplePikcerProps) {
  const oneMin = oneMinProp ?? 0;
  const twoMin = twoMinProp ?? 0;
  const twoMultiple = twoMultipleProp ?? 1;

  const oneOptions = useMemo(
    () => Array.from({ length: oneMax - oneMin + 1 }).map((_, i) => i + oneMin),
    [oneMax, oneMin],
  );
  const twoOptions = useMemo(
    () =>
      Array.from({ length: twoMax - twoMin + 1 })
        .map((_, i) => i + twoMin)
        .filter((v) => v % twoMultiple === 0),
    [twoMin, twoMax, twoMultiple],
  );

  const [oneIndex, setOneIndex] = useState(0);
  const [twoIndex, setTwoIndex] = useState(0);

  useEffect(() => {
    setOneIndex(value?.[0] !== undefined ? oneOptions.findIndex((item) => item === value[0]) : 0);
    setTwoIndex(value?.[1] !== undefined ? twoOptions.findIndex((item) => item === value[1]) : 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value?.[0], value?.[1], oneOptions, twoOptions]);

  const range = [oneOptions, twoOptions];
  return (
    <Picker
      mode="multiSelector"
      value={[oneIndex, twoIndex]}
      onChange={(e) => {
        const [nextOneIndex, nextTwoIndex] = e.detail.value;

        const nextOneValue = oneOptions[nextOneIndex];
        const nextTwoValue = twoOptions[nextTwoIndex];

        onChange?.([nextOneValue, nextTwoValue]);
      }}
      range={range}
    >
      {children}
    </Picker>
  );
}
