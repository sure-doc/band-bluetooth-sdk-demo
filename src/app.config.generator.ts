import type { Config } from '@tarojs/taro';
import { ensureTabBarListInPages, removeTabBarIfListLess2 } from '@my/taro-app-config/helper';

const config: Config = {
  // ------------------------ pages ------------------------
  pages: ['pages/debug/index'],
  // ------------------------ subpackages ------------------------
  subpackages: [
    {
      root: 'subpackages/bandDeviceDebug',
      pages: [
        'index',
        'scanDevices/index',
        'storage/index',
        'userInfo/index',
        'device/index',
        'device/healthGoal/index',
        'device/ota/index',
        'device/hrSettings/index',
        'device/dataReportLogs/index',
        'device/timeInfo/index',
        'device/deviceInfo/index',
        'device/sedentaryReminder/index',
        'device/getFile/index',
        'device/getFile/fileList/index',
        'device/sleepSettings/index',
        'device/bloodOxygenSettings/index',
        'device/sportHrSectionSettings/index',
        'device/getDailyRecordData/index',
        'device/getDailyRecordSummary/index',
        'device/getPressureStatus/index',
        'device/getSleepReport/index',
        'device/getTodayActivityData/index',
        'device/getSportRecordList/index',
        'device/getActivityStrength/index',
        'device/testRequestConcurrent/index',
      ],
    },
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#F1F1F1',
    navigationBarTextStyle: 'black',
    backgroundColor: '#F1F1F1',
  },

  permission: {
    'scope.userLocation': {
      desc: '用于记录用户跑步轨迹', // 高速公路行驶持续后台定位
    },
  },
  requiredBackgroundModes: ['location'],
};

export default [...(process.env.MY_DEV === 'true' ? [ensureTabBarListInPages, removeTabBarIfListLess2] : [])].reduce(
  (acc, fn) => fn(acc),
  config,
);
