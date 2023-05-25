export * from './types';
export * from './events';
export declare function initGps(): void;
export declare const handleDeviceRequestGps: ({ uploadData, mac }: {
    uploadData: import("src").StartDataSync.UploadNormalData<any>;
    mac: string;
}) => void;
export declare const updateGpsStatus: (gpsStatus: import("@apps/lifesense-wxapp-sdk/types/GpsManager").GpsStatus) => void;
export declare const updateLocationInfo: (locationInfo: import("@apps/lifesense-wxapp-sdk/types/GpsManager").LogcationInfo) => void;
