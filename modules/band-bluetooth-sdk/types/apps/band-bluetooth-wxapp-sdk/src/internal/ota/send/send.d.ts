/// <reference types="miniprogram-api-typings" />
export interface SendData {
    commandId: number;
    data: ArrayBuffer;
}
export declare function sendData({ deviceId, characteristicId, sendData, }: {
    deviceId: string;
    characteristicId: string;
    sendData: SendData;
}): Promise<(WechatMiniprogram.BluetoothError | undefined)[]>;
