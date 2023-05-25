import { ObjectTypeConfig } from '@my/byte-type';
export declare const firstFrameTypeConfig: ObjectTypeConfig;
export declare const frameTypeConfig: ObjectTypeConfig;
interface FrameCommon {
    commandId: number;
    frameId: number;
}
export interface FirstFrame extends FrameCommon {
    dataLength: number;
    data: ArrayBuffer;
}
export interface Frame extends FrameCommon {
    data: ArrayBuffer;
}
export {};
