import { appWithTranslation } from 'next-i18next';
import AppLayout from '../components/layout';
const nextI18NextConfig = require('../next-i18next.config');


function OtaApp({Component, pageProps}: {Component: any, pageProps: any}) {
  // return <Component {...pageProps} />

  const theme: {value: 'dark' | 'cosmic' | 'corporate'} = {
    value: 'dark'
  }

  const breweryName = {
    value: 'Over The Air Brew Co'
  }

  return (
    <AppLayout breweryName={breweryName?.value}>
      <Component  {...pageProps} />
    </AppLayout>
  )
}

export default appWithTranslation(OtaApp, nextI18NextConfig)