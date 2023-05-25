import { LogcationInfo, GpsStatus } from '@apps/lifesense-wxapp-sdk';
export type { LogcationInfo } from '@apps/lifesense-wxapp-sdk';
export { GpsStatus } from '@apps/lifesense-wxapp-sdk';
export interface GpsInfo {
    locationInfo?: LogcationInfo;
    gpsStatus: GpsStatus;
}
