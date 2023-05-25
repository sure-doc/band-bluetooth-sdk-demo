import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useRouter } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { useStore, useUnregister } from '@/packages/mobx-rootstore';
import { MyAlert, List } from '@/components';

import { DeviceStore } from './index.store';
import { DataView } from '../components/DataView';
import { navigateTo } from '../services';

const Device = () => {
  const store = useStore(DeviceStore);

  const router = useRouter();

  const { mac } = router.params;

  useEffect(() => {
    if (!mac) throw new Error('缺少参数：mac');
    store.init({ mac });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useUnregister(store);

  if (!mac) return <View>无效连接</View>;

  const navigateToDeviceView = (url: string) => {
    navigateTo({
      url: `device/${url}/index?mac=${mac}`,
    });
  };

  return (
    <View style={{ padding: '32px 0' }}>
      <List>
        <List.Item title="开启同步数据" onClick={() => store.startDataSync()} />
        <List.Item title="请求绑定" onClick={() => store.bindDevice()} />
        <List.Item title="解除绑定" onClick={() => store.unbindDevice()} />
        <List.Item title="获取用户信息" onClick={() => store.getUserInfo()} />
        <List.Item title="OTA" onClick={() => navigateToDeviceView('ota')} />
        <List.Item title="获取电池电量信息" onClick={() => store.getBatteryInfo()} />
        <List.Item title="获取日常数据记录" onClick={() => navigateToDeviceView('getDailyRecordData')} />
        <List.Item title="获取日常数据汇总" onClick={() => navigateToDeviceView('getDailyRecordSummary')} />
        <List.Item title="获取睡眠报告" onClick={() => navigateToDeviceView('getSleepReport')} />
        <List.Item title="获取压力值" onClick={() => navigateToDeviceView('getPressureStatus')} />
        <List.Item title="获取日常活动数值" onClick={() => navigateToDeviceView('getTodayActivityData')} />
        <List.Item title="获取运动记录集合" onClick={() => navigateToDeviceView('getSportRecordList')} />
        <List.Item title="获取活动强度详情" onClick={() => navigateToDeviceView('getActivityStrength')} />
        <List.Item title="设备信息" onClick={() => navigateToDeviceView('deviceInfo')} />
        <List.Item title="获取文件" onClick={() => navigateToDeviceView('getFile')} />
        <List.Item title="上传数据日志" onClick={() => navigateToDeviceView('dataReportLogs')} />
      </List>

      <View style={{ paddingTop: '16px' }}>
        <List>
          <List.Item title="健康目标" onClick={() => navigateToDeviceView('healthGoal')} />
          <List.Item title="心率设置" onClick={() => navigateToDeviceView('hrSettings')} />
          <List.Item title="心率区间" onClick={() => navigateToDeviceView('sportHrSectionSettings')} />
          <List.Item title="睡眠设置" onClick={() => navigateToDeviceView('sleepSettings')} />
          <List.Item title="血氧设置" onClick={() => navigateToDeviceView('bloodOxygenSettings')} />
          <List.Item title="久坐提醒" onClick={() => navigateToDeviceView('sedentaryReminder')} />
          <List.Item title="设备时间" onClick={() => navigateToDeviceView('timeInfo')} />
        </List>
      </View>

      <View style={{ paddingTop: '16px' }}>
        <List>
          <List.Item title="测试请求并发" onClick={() => navigateToDeviceView('testRequestConcurrent')} />
        </List>
      </View>

      <Alert />
    </View>
  );
};

const Alert = observer(() => {
  const store = useStore(DeviceStore);
  return (
    <MyAlert show={store.alertData.visible} onConfirm={() => store.closeAlert()}>
      <DataView>{store.alertData.content}</DataView>
    </MyAlert>
  );
});

export default observer(Device);
