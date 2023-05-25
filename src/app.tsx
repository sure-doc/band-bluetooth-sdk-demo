import 'miniprogram-api-typings';
import { PropsWithChildren } from 'react';
// store
import { RootStoreProvider } from '@/packages/mobx-rootstore';
import { rootStore } from '@/store';

import './app.scss';

const App = ({ children }: PropsWithChildren<{}>) => {
  return <RootStoreProvider store={rootStore}>{children}</RootStoreProvider>;
};

export default App;
