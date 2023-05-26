export type Subscription<T> = (val: T) => void;

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export class EventEmitter<T = void> {
  private subscriptions = new Set<Subscription<T>>();

  /** 调用 */
  emit(val: T) {
    this.subscriptions.forEach((subscription) => {
      subscription(val);
    });
  }

  /**
   * 监听
   * @returns 取消监听函数
   */
  on(subscription: Subscription<T>): () => void {
    this.subscriptions.add(subscription);
    return () => {
      this.subscriptions.delete(subscription);
    };
  }

  once(subscription: Subscription<T>) {
    const off = () => {
      this.subscriptions.delete(subscription);
    };
    this.subscriptions.add((...args) => {
      off();
      return subscription(...args);
    });
    return off;
  }
}
