import { createContext, ReactNode, useContext, useEffect } from 'react';
import { BaseStore, GetStoreOptions, RootStore, StoreClass } from './RootStore';

export * from './RootStore';

/**
 * RootStore Context
 */
export const RootStoreContext = createContext<RootStore | undefined>(undefined);

/**
 * RootStore Provider
 */
export function RootStoreProvider({
  children,
  store,
  hydrationData,
}: {
  children: ReactNode;
  store?: RootStore;
  hydrationData?: any;
}) {
  const _store = initializeStore(store, hydrationData);
  useEffect(() => _store.mounted(), [_store]);

  return <RootStoreContext.Provider value={_store}>{children}</RootStoreContext.Provider>;
}

/**
 * useRootStore
 * 获取 RootStore
 */
export function useRootStore() {
  const context = useContext(RootStoreContext);
  if (context === undefined) {
    throw new Error('useRootStore must be used within RootStoreProvider');
  }

  return context;
}

/**
 * 获取 Store
 * 如果已经存在则返回已存在 store
 * 不存在则创建一个新的，并 register 到 rootStore
 */
export function useStore<S extends BaseStore>(
  StoreClass: StoreClass<S>,
  keyOrOptions?: string | GetStoreOptions<S>,
): S {
  const rootStore = useRootStore();
  return rootStore.getStore(StoreClass, keyOrOptions);
}

/**
 * 注销
 *
 * @param StoreClass
 * @param storeKey
 */
export function useUnregister(store: BaseStore) {
  const rootStore = useRootStore();
  useEffect(() => {
    return () => {
      if (!store) return;
      rootStore.unregister(store);
    };
  }, [store, rootStore]);
}

/**
 * 初始化 rootStore
 * @param initialData
 */
function initializeStore(store?: RootStore, initialData?: any): RootStore {
  const _rootStore = store ?? new RootStore();

  if (initialData) {
    _rootStore.hydrate(initialData);
  }
  return _rootStore;
}
