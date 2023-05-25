import { ObjectTypeConfig } from '@my/byte-type';
export interface Recvice0x10Common {
    u8RspCmdId: number;
    /** COde 值 */
    u8RspCode: number;
}
export declare const Recvice0x10CommonTypeConfig: {
    u8RspCmdId: {
        id: number;
        type: string;
    };
    /** COde 值 */
    u8RspCode: {
        id: number;
        type: string;
    };
};
export declare const recvice0x10Common: ObjectTypeConfig;
export declare const Recvice0x02DataTypeConfig: ObjectTypeConfig;
export declare const Recvice0x03DataTypeConfig: ObjectTypeConfig;
