import { createSwitch } from './Switch';
import styles from './Switch.module.scss';

export type { SwitchProps, SwitchComponent } from './Switch';

export const Switch = createSwitch({ styles });
