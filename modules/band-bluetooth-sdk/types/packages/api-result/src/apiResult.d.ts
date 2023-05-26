import { ApiError } from './apiError';
export type ApiResult<Data, Code extends number = number> = ApiSuccessResult<Data> | ApiErrorResult<Code>;
export type ApiSuccessResult<Data> = Data & {
    error: undefined;
};
export interface ApiErrorResult<Code extends number = number> {
    error: ApiError<Code>;
}
export declare function getErrorResult<Code extends number = number>(error: ApiError<Code>): ApiErrorResult<Code>;
export declare function getSuccessResult<Data>(data: Data): ApiSuccessResult<Data>;
