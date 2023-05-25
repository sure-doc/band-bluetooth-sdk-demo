import { Checkbox as RawCheckbox, CheckboxProps, CheckboxRef, CheckboxValue } from './Checkbox';
import { CheckboxGroup, CheckboxGroupProps } from './CheckboxGroup';
import { CheckboxListItem, CheckboxListItemProps } from './CheckboxListItem';

export type { CheckboxProps, CheckboxRef, CheckboxValue } from './Checkbox';
export type { CheckboxGroupProps } from './CheckboxGroup';
export type { CheckboxListItemProps } from './CheckboxListItem';

export namespace Checkbox {
  export type Props<T extends CheckboxValue = any> = CheckboxProps<T>;
  export type GroupProps<T extends CheckboxValue = any> = CheckboxGroupProps<T>;
  export type Ref = CheckboxRef;
  export type ListItemProps = CheckboxListItemProps;
}

export const Checkbox = attachPropertiesToComponent(RawCheckbox, {
  Group: CheckboxGroup,
  ListItem: CheckboxListItem,
});

export type CheckboxComponent = typeof Checkbox;

export function attachPropertiesToComponent<C, P extends Record<string, any>>(component: C, properties: P): C & P {
  const ret = component as any;
  for (const key in properties) {
    if (properties.hasOwnProperty(key)) {
      ret[key] = properties[key];
    }
  }
  return ret;
}
