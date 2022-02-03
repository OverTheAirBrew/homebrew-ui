// import 'admin-lte/build/js/AdminLTE';
import { appWithTranslation } from 'next-i18next';
import Script from 'next/script';
import { useEffect } from 'react';
import AppLayout from '../components/layout/app-layout';
import '../styles/globals.scss';
const nextI18NextConfig = require('../next-i18next.config');

function OtaApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  useEffect(() => {
    import('admin-lte/plugins/jquery/jquery.min.js');
    import('admin-lte/plugins/jquery-ui/jquery-ui.min.js');
    import('admin-lte/plugins/overlayScrollbars/js/jquery.overlayScrollbars');

    import('bootstrap/dist/js/bootstrap.min');

    import('admin-lte/build/js/AdminLTE');

    // console.log($('body'));
  }, []);

  const theme: { value: 'dark' | 'cosmic' | 'corporate' } = {
    value: 'dark',
  };

  const breweryName = {
    value: 'Over The Air Brew Co',
  };

  return (
    <>
      {/* <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback"
        />
      </Head> */}
      <AppLayout>
        {/* <div className="preloader flex-column justify-content-center align-items-center">
          <img
            className="animation__shake"
            src="/OTA_Logo_SocialCircle.svg"
            alt="Over The Air Logo"
            height="60"
            width="60"
          />
        </div> */}
        <Component {...pageProps} />
      </AppLayout>
      <Script
        strategy="lazyOnload"
        src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"
        integrity="sha512-bLT0Qm9VnAYZDflyKcBaQ2gg0hSYNQrJ8RilYldYQ1FxQYoCLtUjuuRuZo+fjqhx/qtq/1itJ0C2ejDxltZVFg=="
        crossOrigin="anonymous"
      />
    </>
  );
}

export default appWithTranslation(OtaApp, nextI18NextConfig);
