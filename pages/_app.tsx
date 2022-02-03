import { appWithTranslation } from 'next-i18next';
import { useEffect } from 'react';
import AppLayout from '../components/layout/app-layout';
import { GlobalProvider } from '../lib/global-context';
import '../styles/globals.scss';
const nextI18NextConfig = require('../next-i18next.config');

function OtaApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.js' as any);
  }, []);

  return (
    <>
      <GlobalProvider>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </GlobalProvider>
    </>
  );
}

export default appWithTranslation(OtaApp, nextI18NextConfig);
