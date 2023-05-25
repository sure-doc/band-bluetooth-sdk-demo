import { EventEmitter } from '@my/event-emitter';
/** gps 开启请求 */
export declare const gpsStartRequestEvent: EventEmitter<void>;
export declare function onGpsStartRequest(callback: () => any): () => void;
/** gps 关闭请求 */
export declare const gpsStopRequestEvent: EventEmitter<void>;
export declare function onGpsStopRequest(callback: () => any): () => void;
