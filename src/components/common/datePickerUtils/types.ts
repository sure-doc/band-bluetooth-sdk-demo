import { ReactNode } from 'react';

export interface PickerColumnItem {
  label: ReactNode;
  value: string;
}

export type PickerColumn = (string | PickerColumnItem)[];
