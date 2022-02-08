const localConfig = require('./locale-config.json');
const httpBackend = require('i18next-http-backend');
const localStorageBackend = require('i18next-localstorage-backend').default;
const chainedBackend = require('i18next-chained-backend').default;

module.exports = {
  backend: {},
  i18n: {
    defaultLocale: 'en',
    locales: localConfig.locales,
  },
  // use: process.browser ? [chainedBackend] : [httpBackend],
  ns: localConfig.namespaces,
  defaultNS: 'common',
  serializeConfig: false,
  preload: ['en'],
  partialBundledLanguages: true,
  debug: false,
  react: {
    useSuspense: false,
  },
  initImmediate: true,
};
