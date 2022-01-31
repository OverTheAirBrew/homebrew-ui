const i18nextHttpBackend = require('i18next-http-backend/cjs');
const chainedBackend = require('i18next-chained-backend').default;
const localStorageBackend = require('i18next-localstorage-backend').default;

const localConfig = require('./locale-config.json');

module.exports = {
  backend: {
    backendOptions: [{}, { expirationTime: 60 * 60 * 1000 }], // 1 hour
    backends: process.browser ? [localStorageBackend, i18nextHttpBackend] : [],
  },
  i18n: {
    defaultLocale: 'en-gb',
    locales: localConfig.locales,
  },
  use: process.browser ? [chainedBackend] : [],
  ns: localConfig.namespaces,
  defaultNS: 'common',
  serializeConfig: false,
  // preload: ['en-GB'],
  partialBundledLanguages: true,
  debug: false,
  react: {
    useSuspense: false,
  },
};
