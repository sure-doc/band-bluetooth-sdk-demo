import { BehaviorSubject, Observable } from 'rxjs';
import { AdapterState, GetBluetoothAdapterAvailableResult, GetBluetoothAdapterStateResult, OnBluetoothAdapterStateChangeOption, OnBluetoothAdapterAvailableChangeOption } from './types';
/**
 * 管理蓝牙状态
 */
export declare class AdapterStateManager {
    state$: BehaviorSubject<AdapterState>;
    onBluetoothAdapterStateChange$: Observable<{
        state: AdapterState;
        prevState: AdapterState;
    }>;
    discovering$: Observable<boolean>;
    private destroy$;
    constructor();
    /** 获取蓝牙状态 */
    getBluetoothAdapterState(): GetBluetoothAdapterStateResult;
    /** 获取蓝牙是否可用 */
    getBluetoothAdapterAvailable(): GetBluetoothAdapterAvailableResult;
    /**
     *
     * 监听蓝牙状态变更
     *
     * 例子：
     * ``` ts
     * const off = onBluetoothAdapterStateChange({
     *   onChange: (state) => {
     *     // 蓝牙适配器是否可用
     *     console.info(state.available);
     *     // 蓝牙适配器是否处于搜索状态
     *     console.info(state.discovering);
     *   },
     *   immediate: true, // 立即回调当前状态
     * })
     *
     * // 取消舰艇
     * off();
     * ```
     *
     * @param onChange
     * @returns
     */
    onBluetoothAdapterStateChange({ onChange, immediate }: OnBluetoothAdapterStateChangeOption): () => void;
    /**
     *
     * 监听蓝牙是否可用变更
     *
     * 例子：
     * ``` ts
     * const off = onBluetoothAdapterAvailableChange({
     *   onChange: (available) => {
     *     // 蓝牙适配器是否可用
     *     console.info(available);
     *   },
     *   immediate: true, // 立即回调当前状态
     * })
     *
     * // 取消舰艇
     * off();
     * ```
     *
     * @returns
     */
    onBluetoothAdapterAvailableChange({ onChange, immediate }: OnBluetoothAdapterAvailableChangeOption): () => void;
    onBluetoothAdapterAvailableChangeObservable({ immediate }?: {
        immediate?: boolean;
    }): Observable<boolean>;
    destroy(): void;
}
