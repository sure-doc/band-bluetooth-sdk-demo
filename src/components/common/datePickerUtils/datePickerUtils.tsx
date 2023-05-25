import { ReactNode } from 'react';
import type { DatePrecision } from './datePickerDateUtils';
import type { WeekPrecision } from './datePickerWeekUtils';
import * as dateUtils from './datePickerDateUtils';
import * as weekUtils from './datePickerWeekUtils';

export type Precision = DatePrecision | WeekPrecision;

export type DatePickerFilter = Partial<
  Record<
    Precision,
    (
      val: number,
      extend: {
        date: Date;
      },
    ) => boolean
  >
>;

export const convertDateToStringArray = (date: Date | undefined | null, precision: Precision) => {
  if (precision.includes('week')) {
    return weekUtils.convertDateToStringArray(date);
  } else {
    return dateUtils.convertDateToStringArray(date, precision);
  }
};

export const convertStringArrayToDate = (value: (string | null | undefined)[], precision: Precision) => {
  if (precision.includes('week')) {
    return weekUtils.convertStringArrayToDate(value);
  }
  return dateUtils.convertStringArrayToDate(value);
};

export const generateDatePickerColumns = (
  selected: string[],
  min: Date,
  max: Date,
  precision: Precision,
  renderLabel: (type: Precision, data: number) => ReactNode,
  filter: DatePickerFilter | undefined,
  // eslint-disable-next-line max-params
) => {
  if (precision.startsWith('week')) {
    return weekUtils.generateDatePickerColumns(selected, min, max, precision as WeekPrecision, renderLabel, filter);
  } else {
    return dateUtils.generateDatePickerColumns(selected, min, max, precision as DatePrecision, renderLabel, filter);
  }
};

export const defaultRenderLabel = (precision: Precision, data: number) => {
  if (precision.includes('week')) {
    return weekUtils.defaultRenderLabel(precision as WeekPrecision, data);
  } else {
    return dateUtils.defaultRenderLabel(precision as DatePrecision, data);
  }
};

export const defaultRenderLabelWithUnit = (type: Precision, data: number) => {
  switch (type) {
    case 'year':
      return data + '年';
    case 'month':
      return data + '月';
    case 'day':
      return data + '日';
    case 'hour':
      return data + '时';
    case 'minute':
      return data + '分';
    case 'second':
      return data + '秒';
    default:
      return data;
  }
};
