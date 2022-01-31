import AppLayout from '../components/layout';

function OtaApp({Component, pageProps}: {Component: any, pageProps: any}) {
  // return <Component {...pageProps} />

  const theme: {value: 'dark' | 'cosmic' | 'corporate'} = {
    value: 'dark'
  }

  const breweryName = {
    value: 'Over The Air Brew Co'
  }

  return (
    <AppLayout theme={theme?.value} breweryName={breweryName?.value}>
      <Component  {...pageProps} />
    </AppLayout>
  )
}

export default OtaApp