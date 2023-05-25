export declare function parseQrcode(url: string): {
    mac: string;
    sn: string;
    model?: undefined;
} | {
    model: string;
    mac: string;
    sn?: undefined;
};
