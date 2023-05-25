export { Event } from './types';
export * from './types';
export declare const onEvent: (callback: (arg: {
    mac: string;
    event: import("./types").Event;
}) => void) => () => void;
export declare const onEventObservable: ({ mac, eventType }?: {
    mac?: string | undefined;
    eventType?: import("./types").Event.EventType | undefined;
}) => import("rxjs").Observable<{
    mac: string;
    event: import("./types").Event;
}>;
export declare const triggerEvent: (mac: string, originEvent: import("../../dataHelper/types").EventDisc_t) => void;
