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
export function promisify<Api extends (options: any) => any>(func: Api) {
  return (args?: Omit<GetParameters<Api>, 'success'>) =>
    new Promise<
      | { success: NonNullable<GetSuccessResult<Api>>; error: undefined }
      | { success: undefined; error: NonNullable<GetFailResult<Api>> }
    >((resolve) => {
      func(
        Object.assign(args ?? {}, {
          success: (res: GetSuccessResult<Api>) => {
            resolve({
              success: res!,
              error: undefined,
            });
          },
          fail: (error: GetFailResult<Api>) => {
            const result = { error: error || {} };
            resolve(result as any);
          },
        }),
      );
    });
}

// interface TestOptions {
//   p1: string;
//   success?: (res: { s: string }) => void;
//   fail?: (res: { e: string }) => void;
// }

// async function test() {
//   const sss = promisify((options: TestOptions) => {
//     return options;
//   });

//   const res = await sss({ p1: '' });

//   if (res.error) {
//     return;
//   }

//   console.info(res.success.s);
// }
// test();
