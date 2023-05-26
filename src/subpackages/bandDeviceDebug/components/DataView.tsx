import type { ReactNode } from 'react';
import { View, Text, StandardProps, ScrollView } from '@tarojs/components';

export function DataView({
  title,
  children,
  style,
  height,
}: {
  children: unknown;
  title?: ReactNode;
  style?: StandardProps['style'];
  height?: number | string;
}) {
  return (
    <View style={style}>
      {title && <View style={{ paddingBottom: '4px' }}>{title}</View>}

      {height ? (
        <ScrollView style={{ height }} scrollY>
          <Content>{children}</Content>
        </ScrollView>
      ) : (
        <Content>{children}</Content>
      )}
    </View>
  );
}

const Content = ({ children }: { children: unknown }) => {
  return (
    <View style={{ padding: '8px', backgroundColor: '#fff', borderRadius: '4px', overflowX: 'auto' }}>
      <Text space="ensp" {...{ userSelect: true }}>
        {stringify(children)}
      </Text>
    </View>
  );
};

function stringify(value: unknown) {
  return value ? JSON.stringify(value, undefined, 2) : '';
}

export default DataView;
