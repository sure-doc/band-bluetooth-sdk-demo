export type Subscription<T> = (val: T) => void;
export declare class EventEmitter<T = void> {
    private subscriptions;
    /** 调用 */
    emit(val: T): void;
    /**
     * 监听
     * @returns 取消监听函数
     */
    on(subscription: Subscription<T>): () => void;
    once(subscription: Subscription<T>): () => void;
}
