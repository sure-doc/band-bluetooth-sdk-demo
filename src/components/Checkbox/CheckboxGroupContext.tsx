import { createContext } from 'react';
import { CheckboxValue } from './Checkbox';

export interface CheckboxGroupContextValue {
  value: CheckboxValue[];
  disabled?: boolean;
  check: (val: CheckboxValue) => void;
  uncheck: (val: CheckboxValue) => void;
}
export const CheckboxGroupContext = createContext<CheckboxGroupContextValue | undefined>(undefined);
