import type { Config } from '@tarojs/taro';

/**
 * tabBar.list 里面的 pagePath 必须在 pages 里面, 否则 filter 掉
 */
export function ensureTabBarListInPages(config: Config) {
  if (config?.tabBar) {
    return {
      ...config,
      tabBar: {
        ...config.tabBar,
        list: config.tabBar.list?.filter((item) => config.pages?.some((page: string) => page === item.pagePath)),
      },
    };
  }

  return config;
}

/**
 * tabBar.list 少于 2 个时, 将 tabBar 设置为 undefined
 */
export function removeTabBarIfListLess2(config: Config) {
  if (Number(config?.tabBar?.list?.length) < 2) {
    return {
      ...config,
      tabBar: undefined,
    };
  }

  return config;
}
