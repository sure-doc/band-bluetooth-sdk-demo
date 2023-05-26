import { Subject } from 'rxjs';
import { Event } from './types';
export declare class EventManager {
    event$: Subject<{
        mac: string;
        event: Event;
    }>;
    onEventObservable({ mac, eventType }?: {
        mac?: string;
        eventType?: Event.EventType;
    }): import("rxjs").Observable<{
        mac: string;
        event: Event;
    }>;
    onEvent(callback: (arg: {
        mac: string;
        event: Event;
    }) => void): () => void;
    triggerEvent(mac: string, originEvent: Event.OriginEvent): void;
}
