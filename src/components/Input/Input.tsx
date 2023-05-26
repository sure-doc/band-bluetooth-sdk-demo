import { forwardRef, useImperativeHandle, useContext } from 'react';
import classNames from 'classnames';
import { BaseWith } from '@my/types';
import { usePropsValue } from '../common/usePropsValue';
import { View, Input as TaroInput } from '@tarojs/components';
import { InputProps as TaroInputProps } from '@tarojs/components/types/Input';
import { mergeStylesProps, StyleProps } from '../common/styleProps';

import styles from './Input.module.scss';
import { ListContext } from '../List/List';

export interface InputRef {
  clear: () => void;
  focus: () => void;
  blur: () => void;
}

type InternalInputProps = BaseWith<StyleProps, TaroInputProps>;

type BaseInputProps = {
  value?: string;
  defaultValue?: string;
  align?: 'left' | 'center' | 'right';
  clearable?: boolean;
  /** 更多 input 参数 */
  inputProps?: InternalInputProps;
  /** 内部 input class */
  inputClassname?: string;
  onChange?: (val: string) => void;
  onClear?: () => void;
  /** 展示小眼睛 **/
  showEye?: boolean;
  /** 小眼睛点击回调 **/
  trigerEye?: () => void;
} & StyleProps<'--font-size' | '--color' | '--placeholder-color' | '--disabled-color'>;

export type InputProps = BaseInputProps & Omit<TaroInputProps, keyof BaseInputProps | 'ref'>;

const prefixClass = 'input';

export const Input = forwardRef<InputRef, InputProps>((props, ref) => {
  const {
    defaultValue = '',
    align: _align,
    inputProps,
    inputClassname,
    onChange,

    // ------ start input props
    value,
    onInput,
    onBlur,
    onFocus,
    // input other props
    type,
    placeholder = '请输入',
    placeholderStyle,
    placeholderClass,
    disabled,
    maxlength,
    cursorSpacing,
    autoFocus,
    focus,
    confirmType,
    confirmHold,
    cursor,
    selectionStart,
    selectionEnd,
    adjustPosition,
    holdKeyboard,
    alwaysEmbed,
    randomNumber,
    controlled,
    children,
    onConfirm,
    onKeyboardHeightChange,
    // ------ end input props
    ...restProps
  } = props;

  const listContext = useContext(ListContext);

  const align = _align ?? listContext?.inputAlign ?? 'left';

  // value
  const [internalValue, setInternalValue] = usePropsValue<string>({
    value,
    defaultValue,
    onChange: (value) => onChange?.(value),
  });

  // foucs
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hasFocus, setHasFocus] = usePropsValue({ value: focus, defaultValue: focus ?? false });

  // ref
  useImperativeHandle(ref, () => ({
    clear: () => {
      setInternalValue('');
    },
    focus: () => {
      setHasFocus(true);
    },
    blur: () => {
      setHasFocus(false);
    },
  }));

  // root props
  const rootProps = mergeStylesProps(
    {
      ...restProps,
    },
    {
      className: styles[`${prefixClass}-wrapper`],
    },
  );

  // input props
  const internalInputBaseProps: InternalInputProps = {
    type,
    placeholder,
    placeholderStyle,
    placeholderClass,
    disabled,
    maxlength,
    cursorSpacing,
    autoFocus,
    focus: hasFocus,
    confirmType,
    confirmHold,
    cursor,
    selectionStart,
    selectionEnd,
    adjustPosition,
    holdKeyboard,
    alwaysEmbed,
    randomNumber,
    controlled,
    onConfirm,
    onKeyboardHeightChange,
    ...inputProps,
    value: internalValue,
    onInput: (e) => {
      // setValue(e.target.value);
      onInput?.(e);
      setInternalValue(e.detail.value);
    },
    onFocus: (e) => {
      setHasFocus(true);
      onFocus?.(e);
    },
    onBlur: (e) => {
      setHasFocus(false);
      onBlur?.(e);
    },
  };
  const internalInputProps = mergeStylesProps(internalInputBaseProps, {
    className: classNames(styles[prefixClass], inputClassname),
    style: {
      '--align': align,
    },
  });

  return (
    <View {...(rootProps as any)}>
      <TaroInput {...internalInputProps} />

      {children}
    </View>
  );
});
