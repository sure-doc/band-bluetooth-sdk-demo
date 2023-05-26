import type { CSSProperties } from 'react';
import type { Get } from 'type-fest';
import classNames from 'classnames';

type RecordStyle<P extends string = never> = Record<P, string | number>;
export interface StyleProps<S extends string | Record<string, string | number> = {}> {
  className?: string;
  style?: CSSProperties & (S extends string ? Partial<RecordStyle<S>> : S extends RecordStyle ? Partial<S> : {});
}

export function mergeStylesProps<T, S extends StyleProps = StyleProps>(
  props: T,
  props2: S,
): Omit<T, 'style'> & { style: CSSProperties & Get<T, 'style'> & S['style'] } {
  const p: any = {
    ...props,
  };
  if (props2.className) {
    p.className = classNames(props2.className, p?.className);
  }
  if (props2.style) {
    p.style = {
      ...(props2.style ?? {}),
      ...(p.style ?? {}),
    };
  }
  return p as any;
}
