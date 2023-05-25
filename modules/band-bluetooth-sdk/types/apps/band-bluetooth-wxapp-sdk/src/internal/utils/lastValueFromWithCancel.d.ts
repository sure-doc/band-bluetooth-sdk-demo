import { Observable } from 'rxjs';
export type Canceler = (cancel: () => void) => void;
export declare function lastValueFromWithCancel<T>(source: Observable<T>, options?: {
    next?: (value: T) => void;
    canceler?: Canceler;
}): Promise<T>;
export default lastValueFromWithCancel;
