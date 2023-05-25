import { Observable } from 'rxjs';
import { BindDevice } from './types';
/**
 * 绑定设备
 *
 * 确保设备已经连接
 */
export declare function bindDeviceObservable({ userId, mac, language, onConfirmBind, }: Omit<BindDevice.Options, 'onStateChange' | 'canceler'>): Observable<{
    state: BindDevice.State;
}>;
export declare function bindDevice({ mac, userId, language, onConfirmBind, onStateChange, canceler }: BindDevice.Options): Promise<{
    state: BindDevice.State;
}>;
