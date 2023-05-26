import { View } from '@tarojs/components';
import { ReactNode, PropsWithChildren } from 'react';
import styles from './index.module.scss';

export type MyAlertProps = PropsWithChildren<{
  show: boolean;
  title?: string;
  content?: ReactNode;
  okText?: ReactNode;
  onConfirm: () => void;
}>;

export const MyAlert = ({ show, title, content, children, okText, onConfirm }: MyAlertProps) => {
  return (
    <View style={{ display: show ? 'block' : 'none' }}>
      <View className={styles.mask} />
      <View className={styles.confirm_layer}>
        <View className={styles.confirm_title}>{title || '提示'}</View>
        <View className={styles.confirm_content}>{content ?? children}</View>
        <View onClick={onConfirm} className={styles.btn_ok}>
          {okText || '确定'}
        </View>
      </View>
    </View>
  );
};
