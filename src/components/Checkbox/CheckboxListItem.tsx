import { useRef, isValidElement, cloneElement, useImperativeHandle, Ref, ReactElement, Children } from 'react';
import { Checkbox } from '../Checkbox';
import { List } from '../List';

import type { ListItemProps } from '../List';

export type CheckboxListItemProps = ListItemProps;

export function CheckboxListItem(props: CheckboxListItemProps) {
  const { children, ...restProps } = props;

  const internalCheckboxRef = useRef<Checkbox.Ref | null>(null);

  const listItemProps: ListItemProps = {
    ...restProps,
    clickable: restProps.clickable ?? false,
    arrow: restProps.arrow ?? false,
    onClick: (e) => {
      internalCheckboxRef.current?.toggle();
      restProps.onClick?.(e);
    },
  };

  // checkbox
  let checkboxEl: ReactElement<any> | undefined;
  let checkboxRef: Ref<any> | undefined;

  Children.toArray(children).forEach((item) => item);
  if (isValidElement(children)) {
    const checkboxProps: Checkbox.Props = {
      disabledClickToggle: true,
    };

    checkboxRef = (children as any)?.ref;
    checkboxEl = cloneElement<any>(children, { ...checkboxProps, ref: internalCheckboxRef });
  } else {
    console.warn('ListCheckbox: 只能使用 Checkbox 作为子节点');
  }

  useImperativeHandle(checkboxRef, () => {
    return internalCheckboxRef.current;
  });

  return <List.Item {...listItemProps}>{checkboxEl}</List.Item>;
}
