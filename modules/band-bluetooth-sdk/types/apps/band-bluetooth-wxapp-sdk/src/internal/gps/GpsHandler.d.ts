import { GpsManager } from '@apps/lifesense-wxapp-sdk';
import { StartDataSync } from '../dataSync/startDataSync';
import { LogcationInfo, GpsStatus } from './types';
export declare class GpsHandler {
    gpsStatus: GpsStatus;
    locationInfo?: LogcationInfo;
    gpsManager: GpsManager;
    isStart: boolean;
    constructor();
    updateLocationInfo(locationInfo: LogcationInfo): void;
    updateGpsStatus(gpsStatus: GpsStatus): void;
    handleDeviceRequestGps({ uploadData, mac }: {
        uploadData: StartDataSync.UploadNormalData;
        mac: string;
    }): void;
}
