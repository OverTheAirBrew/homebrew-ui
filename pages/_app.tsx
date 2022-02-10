import { appWithTranslation } from '@overtheairbrew/next-i18next';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AppLayout from '../components/layout/app-layout';
import { AppWrapper } from '../lib/context';
import '../styles/globals.scss';
const nextI18NextConfig = require('../next-i18next.config');

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.js' as any);
  }, []);

  return (
    <AppWrapper>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </AppWrapper>
  );
}

export default appWithTranslation(MyApp, nextI18NextConfig);
