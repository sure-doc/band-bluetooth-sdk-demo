export interface AdapterState {
    /** 蓝牙适配器是否可用 */
    available: boolean;
    /** 蓝牙适配器是否处于搜索状态 */
    discovering: boolean;
}
export type GetBluetoothAdapterStateResult = AdapterState;
export type GetBluetoothAdapterAvailableResult = boolean;
export interface OnBluetoothAdapterStateChangeOption {
    onChange: (state: AdapterState, prevState?: AdapterState) => void;
    immediate?: boolean;
}
export interface OnBluetoothAdapterAvailableChangeOption {
    onChange: (available: boolean) => void;
    immediate?: boolean;
}
