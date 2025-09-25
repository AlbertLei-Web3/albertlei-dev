// i18n configuration for next-intl (App Router)
// 中文：next-intl 的基础配置，按请求动态加载消息文件
// English: Base configuration for next-intl, loading message files per request

import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {
  // 中文：允许的语言列表；English: supported locales
  const supportedLocales = ['en', 'zh'];
  const activeLocale = supportedLocales.includes(locale) ? locale : 'zh';

  // 动态导入对应语言的 messages（构建时分割）
  const messages = (await import(`./messages/${activeLocale}.json`)).default;

  return {
    locale: activeLocale,
    messages
  } as const;
});


