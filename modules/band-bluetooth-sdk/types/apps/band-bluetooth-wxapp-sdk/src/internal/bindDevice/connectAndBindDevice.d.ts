import { Observable } from 'rxjs';
import { ConnectAndBindDevice } from './types';
export declare function connectAndBindDeviceObservable({
  mac,
  userId,
  language,
  onConfirmBind,
}: Omit<ConnectAndBindDevice.Options, 'onStateChange' | 'canceler'>): Observable<{
  state: ConnectAndBindDevice.State;
}>;
export declare function connectAndBindDevice({
  mac,
  userId,
  language,
  onConfirmBind,
  onStateChange,
  canceler,
}: ConnectAndBindDevice.Options): Promise<{
  state: ConnectAndBindDevice.State;
}>;
