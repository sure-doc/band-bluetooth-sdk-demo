import { Input } from '@tarojs/components';
import { InputProps } from '@tarojs/components/types/Input';
import React from 'react';
import classNames from 'classnames';
import './index.scss';

type MyInputProps = InputProps;

export const MyInput: React.FC<MyInputProps> = ({ className, placeholderClass, ...props }) => {
  return (
    <Input
      className={classNames('inp ', className)}
      placeholderClass={classNames('inp-placeholder', placeholderClass)}
      {...props}
    />
  );
};
