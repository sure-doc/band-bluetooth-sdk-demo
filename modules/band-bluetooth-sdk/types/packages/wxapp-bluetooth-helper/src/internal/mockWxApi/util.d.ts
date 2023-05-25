export declare function mockSuccess(option: {
    success?: (res: any) => void;
    complete?: (res: any) => void;
}): void;
export declare function mockError(error: {
    errCode?: number;
    errMsg?: string;
}, option: {
    fail?: (res: any) => void;
    complete?: (res: any) => void;
}): void;
