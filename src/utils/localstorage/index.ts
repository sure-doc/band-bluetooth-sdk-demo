import { EventEmitter } from '@/packages/event-emitter';

export interface LocalDevice {
  mac: string;
}

export interface LocalUserInfo {
  name: string;
  gender?: number;
  height?: number;
  weight?: number;
  birthday?: string;
}

export interface LocalDataLog {
  mac: string;
  data: any;
  ts: number;
}

interface Data {
  bindDevices: LocalDevice[];
  userInfo: LocalUserInfo;
  dataReportList: LocalDataLog[];
}

const StorageKey = 'band-device-debug';

const defualtData = {
  bindDevices: [],
  userInfo: {
    name: '未命名',
  },
  dataReportList: [],
};
let globalData: Data = defualtData;

let isInit = false;

function saveStorage(data: Partial<Data>) {
  globalData = {
    ...globalData,
    ...data,
  };
  wx.setStorage({
    key: StorageKey,
    data: {
      bindDevices: globalData.bindDevices,
      userInfo: globalData.userInfo,
    },
  });
}

function initStorage() {
  if (isInit) return;

  isInit = true;
  const data = wx.getStorageSync(StorageKey) as Data | undefined;
  if (data) {
    // 清空，以前保存的
    data.dataReportList = [];
    saveStorage(data);
  }
}

function delay(ts: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ts);
  });
}

/** ------ userInfo ------- */

export async function getUserInfo() {
  initStorage();

  await delay(300);

  return globalData.userInfo;
}

export async function saveUserInfo(userInfo: LocalUserInfo) {
  initStorage();

  await delay(300);

  saveStorage({
    userInfo,
  });
}

/** ------ dataReport ------- */

const dataReporEventEmitter = new EventEmitter<LocalDataLog>();
/** 只保留最新的多少条数据 */
const MaxCount = 1000;
/** 同一个 mac 的保留多少条数据 */
const MaxMacCount = 500;

export async function getDataReport({ mac }: { mac?: string }) {
  initStorage();
  return globalData.dataReportList.filter((item) => !mac || item.mac === mac);
}

export async function saveDataReport(_newItem: Omit<LocalDataLog, 'ts'>) {
  initStorage();

  if (!checkSave(_newItem)) {
    return;
  }
  await delay(300);

  const newItem = { ..._newItem, ts: new Date().getTime() };

  const newMacDataReportList = trimWhenOverSize(
    [...globalData.dataReportList.filter((item) => item.mac === newItem.mac), newItem],
    MaxMacCount,
  );

  let nextDataReportList = globalData.dataReportList.filter((item) => item.mac !== newItem.mac);

  nextDataReportList = trimWhenOverSize([...nextDataReportList, ...newMacDataReportList], MaxCount);

  dataReporEventEmitter.emit(newItem);
  saveStorage({
    dataReportList: nextDataReportList,
  });
}

export function onDataReport({ mac, onChange }: { mac?: string; onChange: (dataReport: LocalDataLog) => void }) {
  initStorage();

  return dataReporEventEmitter.on((dataReport) => {
    if (!mac || dataReport.mac === mac) {
      onChange(dataReport);
    }
  });
}

/**
 * 只保留指定多少条数据
 */
function trimWhenOverSize(dataReportList: LocalDataLog[], maxLength: number) {
  if (dataReportList.length > maxLength) {
    return dataReportList.slice(maxLength - dataReportList.length);
  }

  return dataReportList;
}

function checkSave(_newItem: Omit<LocalDataLog, 'ts'>) {
  const data = _newItem.data;
  // 文件上传，不处理 8,4
  if (data.categoryId === 8) {
    return data.commandId !== 4;
  }
  return true;
}
