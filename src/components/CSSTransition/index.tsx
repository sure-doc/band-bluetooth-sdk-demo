/**
 * https://github.com/reactjs/react-transition-group/blob/master/src/CSSTransition.js
 *
 * CSSTransition 小程序版本
 */
import { useState, cloneElement, Children, isValidElement, useRef } from 'react';

import { Transition, TransitionStatus } from 'react-transition-group';
import type { CSSTransitionProps as _CSSTransitionProps } from 'react-transition-group/CSSTransition';

import classnames from 'classnames';
import Taro from '@tarojs/taro';

type CSSTransitionProps = _CSSTransitionProps;

type Type = 'appear' | 'enter' | 'exit';
type Phase = 'active' | 'done' | 'base';

export const CSSTransition = ({
  classNames = '',
  nodeRef,
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  onExited,
  children,
  ...restProps
}: CSSTransitionProps) => {
  const [viewClassNames, setViewClassNames] = useState<Record<string, boolean>>({});
  const appliedClasses = useRef<{
    [key in Type]: {
      [key in Phase]?: {
        [key in string]: boolean;
      };
    };
  }>({
    appear: {},
    enter: {},
    exit: {},
  });

  const getClassNames = (type: Type) => {
    const isStringClassNames = typeof classNames === 'string';
    const prefix = isStringClassNames && classNames ? `${classNames}-` : '';

    let baseClassName = isStringClassNames ? `${prefix}${type}` : classNames[type];

    let activeClassName = isStringClassNames ? `${baseClassName}-active` : classNames[`${type}Active`];

    let doneClassName = isStringClassNames ? `${baseClassName}-done` : classNames[`${type}Done`];

    return {
      baseClassName,
      activeClassName,
      doneClassName,
    };
  };

  // node: HTMLElement, isAppearing: boolean
  // when prop `nodeRef` is provided `node` is excluded
  const resolveArguments = (maybeNode: HTMLElement, maybeAppearing: boolean) =>
    nodeRef
      ? maybeNode // here `maybeNode` is actually `appearing`
      : maybeAppearing; // `findDOMNode` was used

  const _onEnter: CSSTransitionProps['onEnter'] = (maybeNode, maybeAppearing) => {
    const appearing = resolveArguments(maybeNode, maybeAppearing);
    removeClasses('exit');
    addClass(appearing ? 'appear' : 'enter', 'base');

    onEnter?.(maybeNode, maybeAppearing);
  };

  const _onEntering: CSSTransitionProps['onEntering'] = (maybeNode: HTMLElement, maybeAppearing: boolean) => {
    Taro.nextTick(() => {
      const appearing = resolveArguments(maybeNode, maybeAppearing);
      const type = appearing ? 'appear' : 'enter';
      addClass(type, 'active');
    });

    onEntering?.(maybeNode, maybeAppearing);
  };

  const _onEntered = (maybeNode: HTMLElement, maybeAppearing: boolean) => {
    const appearing = resolveArguments(maybeNode, maybeAppearing);
    const type = appearing ? 'appear' : 'enter';
    removeClasses(type);
    addClass(type, 'done');

    onEntered?.(maybeNode, maybeAppearing);
  };

  const _onExit = (maybeNode: HTMLElement) => {
    removeClasses('appear');
    removeClasses('enter');
    addClass('exit', 'base');

    onExit?.(maybeNode);
  };

  const _onExiting = (maybeNode: HTMLElement) => {
    addClass('exit', 'active');

    onExiting?.(maybeNode);
  };

  const _onExited = (maybeNode: HTMLElement) => {
    removeClasses('exit');
    addClass('exit', 'done');

    onExited?.(maybeNode);
  };

  const addClass = (type: Type, phase: Phase) => {
    const adds: Record<string, boolean> = {};

    const className = getClassNames(type)[`${phase}ClassName`];
    if (className) {
      adds[className] = true;
    }

    if (type === 'appear' && phase === 'done') {
      const { doneClassName } = getClassNames('enter');
      if (doneClassName) {
        adds[doneClassName] = true;
      }
    }

    appliedClasses.current[type][phase] = adds;
    if (Object.keys(adds).length > 0) {
      setViewClassNames((state) => ({ ...state, ...adds }));
    }
  };

  function removeClasses(type: Type) {
    const { base: baseClassName, active: activeClassName, done: doneClassName } = appliedClasses.current[type];

    appliedClasses.current[type] = {};

    let removes: Record<string, boolean> = {};
    if (baseClassName) {
      removes = { ...baseClassName };
    }
    if (activeClassName) {
      removes = { ...removes, ...activeClassName };
    }
    if (doneClassName) {
      removes = { ...removes, ...doneClassName };
    }
    Object.keys(removes).forEach((key) => {
      removes[key] = false;
    });
    if (Object.keys(removes).length > 0) {
      setViewClassNames((state) => ({ ...state, ...removes }));
    }
  }

  function renderChild() {
    let child;
    if (typeof children === 'function') {
      child = (status: TransitionStatus) => children(status);
    } else {
      child = children;
    }
    const onlyChild = Children.only(child);
    if (!isValidElement(onlyChild)) return null;
    return cloneElement<any>(onlyChild, {
      ...onlyChild,
      className: classnames((onlyChild as any).props.className, viewClassNames),
    });
  }

  return (
    <Transition
      {...restProps}
      nodeRef={nodeRef}
      onEnter={_onEnter}
      onEntered={_onEntered}
      onEntering={_onEntering}
      onExit={_onExit}
      onExiting={_onExiting}
      onExited={_onExited}
    >
      {renderChild()}
    </Transition>
  );
};
