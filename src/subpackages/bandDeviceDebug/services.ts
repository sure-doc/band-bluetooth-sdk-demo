import Taro from '@tarojs/taro';

export function navigateTo({ url }: { url: string }) {
  return Taro.navigateTo({ url: `/subpackages/bandDeviceDebug/${url}` });
}
