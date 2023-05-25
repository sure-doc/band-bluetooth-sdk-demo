export interface BaseStore {
  onRootStoreMounted?: () => void;
  destroy?: () => void;
  [key: string]: any;
}

export type StoreClass<T extends BaseStore = {}> = new (rootStore: RootStore, ...args: any[]) => T;

export interface GetStoreOptions<S> {
  /** 自定义 key */
  key?: string;
  /** 自定义创建 */
  creator?: (rootStore: RootStore) => S;
  /** 当 store 不存在时，是否自动创建，默认 true */
  autoCreate?: boolean;
}

const STORE_CLASS_KEY = '__rootStoreKey';

export class RootStore {
  storeClassList: StoreClass[] = [];
  stores: Map<string, BaseStore> = new Map();
  mountedPromise: Promise<void>;
  mountedPromiseResolve!: () => void;

  constructor() {
    this.mountedPromise = new Promise<void>((resolve) => {
      this.mountedPromiseResolve = resolve;
    });
  }

  hydrate(_data: any) {
    // TODO:
  }

  /**
   * 首次渲染完成
   */
  mounted() {
    this.mountedPromiseResolve();
  }

  /**
   * 注册 Store
   *
   * @param store
   * @param storeKey 可选，默认为 "default"
   */
  register(StoreClass: StoreClass, store: BaseStore, storeKey?: string) {
    const key = this.getKeyByStoreClass(StoreClass, storeKey);

    if (this.stores.has(key)) {
      throw new Error(`register: ${key} 已存在`);
    }
    this.stores.set(key, store);

    this.mountedPromise.then(() => {
      store.onRootStoreMounted?.();
    });

    return () => {
      this.unregister(store);
    };
  }

  /**
   * 注销
   *
   * @param store
   * @param storeKey 可选，默认为 "default"
   */
  unregister(store: BaseStore) {
    this.stores.forEach((value, key, map) => {
      if (store === value) {
        store.destroy?.();
        map.delete(key);
      }
    });
  }

  /**
   * 注销所有 store
   */
  unregisterAll() {
    this.stores.forEach((store, key, map) => {
      store.destroy?.();
      map.delete(key);
    });
  }

  /**
   * 获取  Store
   * 如果已经存在则返回已存在 store
   * 不存在则创建一个新的，并 register 到 rootStore
   *
   * @param StoreClass 指定 Store
   * @param storeKey 可选，默认为 "default"
   */
  getStore<S extends BaseStore>(StoreClass: StoreClass<S>, keyOrOptions?: string | GetStoreOptions<S>): S {
    const {
      key,
      creator,
      autoCreate = true,
    }: GetStoreOptions<S> = typeof keyOrOptions === 'string' ? { key: keyOrOptions } : keyOrOptions ?? {};

    const storeKey = this.getKeyByStoreClass(StoreClass, key);
    const store = this.stores.get(storeKey);
    if (store) return store as S;

    if (!autoCreate) throw new Error(`store not exist. StoreClass: ${StoreClass.name}, key: ${storeKey}`);

    const newStore = creator ? creator(this) : new StoreClass(this);
    this.register(StoreClass, newStore, key);

    return newStore;
  }

  /**
   * 是否存在
   *
   * @param StoreClass
   * @param key
   * @returns boolean
   */
  exist(StoreClass: StoreClass, key?: string) {
    const storeKey = this.getKeyByStoreClass(StoreClass, key);
    return this.stores.has(storeKey);
  }

  private getKeyByStoreClass(StoreClass: StoreClass, storeKey?: string) {
    let storeClassKey = getStoreClassKey(StoreClass);

    if (!storeClassKey) {
      storeClassKey = `${new Date().getTime()}-${Math.random()}-${StoreClass.name}`;
      setStoreClassKey(StoreClass, storeClassKey);
      this.storeClassList.push(StoreClass);
    }

    return this.getKey(storeClassKey, storeKey);
  }

  private getKey(storeName: string, storeKey = 'default') {
    const key = `${storeName}-${storeKey}`;
    return key;
  }
}

function setStoreClassKey(StoreClass: StoreClass, key: string) {
  (StoreClass as any)[STORE_CLASS_KEY] = key;
}

function getStoreClassKey(StoreClass: StoreClass): string | undefined {
  return (StoreClass as any)[STORE_CLASS_KEY];
}
