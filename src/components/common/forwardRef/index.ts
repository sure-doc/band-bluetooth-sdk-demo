// https://fettblog.eu/typescript-react-generic-forward-refs/
import { forwardRef as _forwardRef, Ref, ReactElement, RefAttributes } from 'react';

export const forward = _forwardRef;

export function forwardRef<T, P = {}>(
  render: (props: P, ref: Ref<T>) => ReactElement | null,
): (props: P & RefAttributes<T>) => ReactElement | null {
  return _forwardRef(render) as any;
}
