import { PropsWithChildren } from 'react';
import { MultiplePicker } from './MultiplePicker';

export function HoursMinutesPicker({
  children,
  hours,
  minutes,
  minHours: minHoursProp,
  maxHours: maxHoursProp,
  maxMinutes: maxMinutesProp,
  multipleMinutes: multipleMinutesProp,
  onChange,
}: PropsWithChildren<{
  hours?: number;
  minutes?: number;
  minHours?: number;
  maxHours?: number;
  maxMinutes?: number;
  multipleMinutes?: number;
  onChange?: (newValues: [number, number]) => void;
}>) {
  const minHours = minHoursProp ?? 0;
  const maxHours = maxHoursProp ?? 23;
  const maxMinutes = maxMinutesProp ?? 59;
  const multipleMinutes = multipleMinutesProp ?? 1;

  return (
    <MultiplePicker
      value={hours && minutes ? [hours, minutes] : undefined}
      oneMin={minHours}
      oneMax={maxHours}
      twoMin={0}
      twoMax={maxMinutes}
      twoMultiple={multipleMinutes}
      onChange={([nextHours, nextMinutes]) => {
        onChange?.([nextHours, nextMinutes]);
      }}
    >
      {children}
    </MultiplePicker>
  );
}
