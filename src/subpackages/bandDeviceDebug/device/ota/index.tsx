import { useEffect } from 'react';
import { View } from '@tarojs/components';
import { useRouter } from '@tarojs/taro';
import { useStore } from '@/packages/mobx-rootstore';
import { OATStore } from './index.store';
// import { OtaErrorCode } from 'band-bluetooth-sdk/src/internal/error';
import { observer } from 'mobx-react-lite';

const OTA = () => {
  const router = useRouter();
  const { mac } = router.params;

  const oTAStore = useStore(OATStore);
  useEffect(() => {
    oTAStore.getOTAFile(mac!);
    // startUpgrade({ mac: mac! })
    //   .then(() => {})
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View>
      <View>当前的OTA状态：{oTAStore.state}</View>
      <View>OTA文件已发送：{oTAStore.uploadFilePercent}</View>
      {/* <View>OTA升级状态：{OtaErrorCodeText[oTAStore.OTAState as OtaErrorCode]}</View> */}
    </View>
  );
};

export default observer(OTA);
