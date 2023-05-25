import { attachPropertiesToComponent } from '../common/attachPropertiesToComponent';
import { List as _List, ListProps } from './List';
import { ListItem } from './ListItem';

export type { ListProps } from './List';
export type { ListItemProps } from './ListItem';
export namespace List {
  export type Props = ListProps;
  // export type ItemProps = ListItemProps;
}

export const List = attachPropertiesToComponent(_List, {
  Item: ListItem,
});

export type ListComponent = typeof List;
