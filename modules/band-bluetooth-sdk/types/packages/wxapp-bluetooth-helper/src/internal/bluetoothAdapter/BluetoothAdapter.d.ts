import 'miniprogram-api-typings';
import { BehaviorSubject, Observable } from 'rxjs';
type State = 'closed' | 'opening' | 'opened' | 'closing';
declare enum OpenErrorCode {
    /** 正在打开 */
    openning = "openning",
    /** 已打开 */
    opened = "opened",
    /** 取消 */
    cancel = "cancel"
}
declare class OpenError extends Error {
    code: OpenErrorCode;
    constructor(code: OpenErrorCode);
}
export declare class BluetoothAdapter {
    /** 当前状态 */
    state$: BehaviorSubject<State>;
    private open$;
    private close$;
    /** 打开成功 */
    private apiOpenSuccess$;
    /** 关闭成功 */
    private apiCloseSuccess$;
    /** 检查当前状态 */
    private check$;
    private checkResult$;
    /** 目前期望是否打开 */
    private expectOpen$;
    private realState$;
    /** 卸载 */
    private destroy$;
    constructor();
    /**
     * 打开
     */
    open(): Promise<{
        error: undefined;
    } | {
        error: OpenError;
    }>;
    close(): void;
    check(): Promise<{
        state: State;
    }>;
    /**
     * getState
     */
    getState(): State;
    /**
     * onStateChange
     */
    onStateChange(callback: (state: State) => void, { immediate }?: {
        immediate?: boolean;
    }): () => void;
    /**
     * onOpenedChangeObservable
     */
    onOpenedChangeObservable({ immediate }?: {
        immediate?: boolean;
    }): Observable<boolean>;
    /**
     * onOpenedChange
     */
    onOpenedChange(callback: (opened: boolean) => void, options?: {
        immediate?: boolean;
    }): () => void;
    destroy(): void;
    private doCheck;
    private doOpenObservable;
}
export {};
