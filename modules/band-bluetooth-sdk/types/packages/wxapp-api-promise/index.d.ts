type GetField<T, K> = K extends keyof T ? T[K] : undefined;
type GetParameters<T> = T extends (...args: any[]) => any ? NonNullable<Parameters<T>[0]> : undefined;
export type GetSuccessResult<T> = GetParameters<NonNullable<GetField<GetParameters<T>, 'success'>>>;
export type GetFailResult<T> = GetParameters<NonNullable<GetField<GetParameters<T>, 'fail'>>>;
export interface PromisifySuccessResult<T> {
    success: T;
    error: undefined;
}
export interface PromisifyErrorResult<E> {
    success: undefined;
    error: E;
}
export type PromisifyResult<T, E = any> = PromisifySuccessResult<T> | PromisifyErrorResult<E>;
/**
 * 例子：
 * ```ts
 * const res = await promisify(wx.getBluetoothAdapterState)({});
 * ```
 */
export declare function promisify<Api extends (options: any) => any>(func: Api): (args?: Omit<GetParameters<Api>, 'success'>) => Promise<{
    success: NonNullable<GetSuccessResult<Api>>;
    error: undefined;
} | {
    success: undefined;
    error: NonNullable<GetFailResult<Api>>;
}>;
export {};
