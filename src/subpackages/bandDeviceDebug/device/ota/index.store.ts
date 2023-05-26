import { makeAutoObservable } from 'mobx';
import { startUpgrade, OtaErrorCode } from 'band-bluetooth-sdk';

export const OtaErrorCodeText = {
  [OtaErrorCode.NotFoundDevice]: '找不到设备',
  [OtaErrorCode.Success]: '成功',
  [OtaErrorCode.ErrVerify]: '校验失败',
  [OtaErrorCode.ErrVersion]: '版本错误/不支持的升级文件',
  [OtaErrorCode.ErrStorage]: '设备端存储数据出错，致命硬件错误',
  [OtaErrorCode.ErrNoMem]: '设备端无法分配足够内存继续OTA流程',
  [OtaErrorCode.ErrDecompress]: '校验设备端解压流程状态出错失败',
  [OtaErrorCode.ErrBattery]: '电量不足进行下一步操作',
  [OtaErrorCode.ErrStatus]: '设备端状态错误/流程错误',
};

export class OATStore {
  ErrorText?: string;
  state?: string;
  uploadFilePercent?: number;
  OTAState?: number;
  constructor() {
    makeAutoObservable(this);
  }

  async getOTAFile(mac: string) {
    // const downloadFile = await new Promise((resolve) => {
    //   wx.downloadFile({
    //     url: 'https://bdcm02.baidupcs.com/file/9647dbe6euef2a148d098427e06a1d4c?bkt=en-43ea5360a23c0e203459e328a61cbe7e1af1a8bf3e56c13ff7cecc17a274ff7511a5c5dd980b6384935f2eb3329a16edca5164d99514908008dc9592d33c52e3&fid=3942873690-250528-76025938044615&time=1629789507&sign=FDTAXUbGERLQlBHSKfWqi-DCb740ccc5511e5e8fedcff06b081203-xTpumdH2XETs7sLgiXWFLa8y1HM%3D&to=94&size=3944833&sta_dx=3944833&sta_cs=0&sta_ft=lsf&sta_ct=0&sta_mt=0&fm2=MH%2CXian%2CAnywhere%2C%2Cguangdong%2Ccmnet&ctime=1629789489&mtime=1629789489&resv0=-1&resv1=0&resv2=rlim&resv3=5&resv4=3944833&vuk=3942873690&iv=0&htype=&randtype=&tkbind_id=0&newver=1&newfm=1&secfm=1&flow_ver=3&pkey=en-59ab0254faf1ca9dee3bfe71228b6a2dfb6408c107efbdf3855879a4d3b2ed899da5826f2748fee2805c6b9b7023ff7a55f52c5663498d76305a5e1275657320&sl=76480590&expires=8h&rt=pr&r=120785506&vbdid=138103961&fin=testOTA.lsf&fn=testOTA.lsf&rtype=1&dp-logid=8923870540026889215&dp-callid=0.1&hps=1&tsl=80&csl=80&fsl=-1&csign=8608eCPpMv3jnIA2jEU8jaYw5ds%3D&so=0&ut=6&uter=4&serv=0&uc=4014707514&ti=5e666840c78f19734ed2bf9397221b53d6bcb05b41329c08305a5e1275657320&hflag=30&from_type=1&adg=c_be32c16536abaced722da1139f9a53aa&reqlabel=250528_f_8e708ef11b7a03155cee6930672287cd_-1_1e771ee4e5e92988d7f62891e308afb6&by=themis',
    //     success: (res) => resolve(res.tempFilePath),
    //     fail: (error) => {
    //       throw new Error(error);
    //     },
    //   });
    // });
    // if (!downloadFile) return;
    // wx.saveFile({
    //   tempFilePath: downloadFile as any,
    //   success: (res2) => {
    //     console.log('savedFilePath', res2.savedFilePath);
    //     //  读取文件内容
    //     const fileSystemManager = wx.getFileSystemManager();
    //     fileSystemManager.readFile({
    //       filePath: res2.savedFilePath,
    //       success: (res3) => {
    //         const otaFile = res3.data as any;
    //         startUpgrade({ mac, otaFile });
    //       },
    //       fail: (res4) => {
    //         console.log('readFile fail', res4);
    //       },
    //     });
    //   },
    // });

    const fileSystemManager = wx.getFileSystemManager();
    fileSystemManager.readFile({
      filePath: 'wxfile://store_5fb0ecb711103122ea04a82ed921c9f68a4e0580fe9a9b1d.bin',
      success: (res3) => {
        const otaFile = res3.data as any;
        startUpgrade({
          mac,
          otaFile,
          onStateChange: (state) => {
            this.state = state;
            console.log('onStateChange', state);
          },
          onUploadFilePercent: (percent) => {
            this.uploadFilePercent = percent;
            console.log('onUploadFilePercent', percent);
          },
        }).then((res) => {
          console.log('startUpgrade', res);
          this.OTAState = res.data.u8RspCode;
        });
      },
      fail: (res4) => {
        console.log('readFile fail', res4);
      },
    });
  }
}
