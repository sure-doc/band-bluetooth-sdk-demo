import { GetBluetoothAdapterStateResult, GetBluetoothAdapterAvailableResult, OnBluetoothAdapterAvailableChangeOption, OnBluetoothAdapterStateChangeOption } from './types';
export { destroyStateManager } from './getAdapterStateManager';
export type { AdapterState } from './types';
export declare namespace GetBluetoothAdapterState {
    type Result = GetBluetoothAdapterStateResult;
}
export declare const getBluetoothAdapterState: () => import("./types").AdapterState;
export declare namespace GetBluetoothAdapterAvailable {
    type Result = GetBluetoothAdapterAvailableResult;
}
export declare const getBluetoothAdapterAvailable: () => boolean;
export declare namespace OnBluetoothAdapterStateChange {
    type Option = OnBluetoothAdapterStateChangeOption;
}
export declare const onBluetoothAdapterStateChange: ({ onChange, immediate }: OnBluetoothAdapterStateChangeOption) => () => void;
export declare namespace OnBluetoothAdapterAvailableChange {
    type Option = OnBluetoothAdapterAvailableChangeOption;
}
export declare const onBluetoothAdapterAvailableChange: ({ onChange, immediate }: OnBluetoothAdapterAvailableChangeOption) => () => void;
export declare const onBluetoothAdapterAvailableChangeObservable: ({ immediate }?: {
    immediate?: boolean | undefined;
}) => import("rxjs").Observable<boolean>;
