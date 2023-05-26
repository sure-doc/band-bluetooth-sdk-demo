import { useMemoizedFn } from 'ahooks';
import { useEffect, useRef, useState } from 'react';
import { usePropsValue } from '../usePropsValue';

export function usePickerValue<T>({
  visible,
  value,
  defaultValue,
  onSelect,
  onChange,
  onConfirm,
  isEqual = (v1, v2) => v1 === v2,
}: {
  visible?: boolean;
  value?: T;
  defaultValue?: T;
  onSelect?: (v: T) => void;
  onChange?: (v: T) => void;
  onConfirm?: (v: T) => void;
  isEqual?: (v1?: T, v2?: T) => boolean;
}) {
  // ----- internal value
  const [internalValue, setInternalValue] = usePropsValue({
    value,
    defaultValue,
  });

  // ------ before visible value 显示前的值
  const beforeVisibleValueRef = useRef<T>();

  useEffect(() => {
    if (visible) {
      beforeVisibleValueRef.current = internalValue;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  // ----- picker value
  const [pickerValue, setPickerValue] = useState(internalValue);

  // 显示/关闭时设置 pickerView 的默认值
  useEffect(() => {
    if (!isEqual(pickerValue, internalValue)) {
      const val = internalValue ?? defaultValue;
      setPickerValue(val);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  // 同步 internalValue 到 picker value
  useEffect(() => {
    if (!visible) {
      internalValue && setPickerValue(internalValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [internalValue]);

  // ----- picker onChange
  const changePickerValue = useMemoizedFn((val: T) => {
    setPickerValue(val);

    if (visible) {
      onSelect?.(val);
    }
  });

  const confirm = useMemoizedFn(() => {
    setInternalValue(pickerValue);
    if (onChange) {
      const changed = !isEqual(pickerValue, beforeVisibleValueRef.current);
      if (changed) {
        onChange(pickerValue!);
      }
    }

    onConfirm?.(pickerValue!);
  });

  return {
    value: internalValue,
    setValue: setInternalValue,
    pickerValue,
    changePickerValue,
    confirm,
  };
}
