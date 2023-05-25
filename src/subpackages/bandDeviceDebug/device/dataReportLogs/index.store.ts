import { makeAutoObservable } from 'mobx';
import { RootStore } from '@/packages/mobx-rootstore';
import { LocalDataLog, getDataReport, onDataReport } from '@/utils/localstorage';

/** 为了后面加过滤用的 */
// const AllCommand = [
//   { categoryId: 0, min: 1, max: 7 },
//   { categoryId: 1, min: 1, max: 16 },
//   { categoryId: 2, min: 1, max: 16 },
//   { categoryId: 3, min: 1, max: 14 },
//   { categoryId: 4, min: 1, max: 7 },
//   { categoryId: 5, min: 1, max: 7 },
//   { categoryId: 6, min: 1, max: 2 },
//   { categoryId: 7, min: 1, max: 3 },
//   { categoryId: 8, min: 1, max: 19 },
//   { categoryId: 9, min: 1, max: 9 },
//   { categoryId: 10, min: 1, max: 5 },
// ];

export class DataReportLogsStore {
  dataList: LocalDataLog[] = [];
  offDataReport?: () => void;
  mac!: string;

  constructor(_rootStore: RootStore) {
    makeAutoObservable(this);
  }

  async init({ mac }: { mac: string }) {
    this.mac = mac;
    this.offDataReport = onDataReport({
      mac,
      onChange: (data) => {
        this.dataList = [...this.dataList, data].slice(0, 500);
      },
    });

    const dataReportList = await getDataReport({ mac });

    this.dataList = dataReportList;
  }

  clean() {
    this.offDataReport?.();
  }
}
