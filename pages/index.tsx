import { ISetting } from '../components/hoc/withSettings';


function Home({ settings }: { settings: ISetting[] }) {
  // const theme = settings.find((setting) => setting.key === 'ui-theme');
  // const breweryName = settings.find(
  //   (setting) => setting.key === 'ui-brewery-name',
  // );

  const theme: {value: 'dark' | 'cosmic' | 'corporate'} = {
    value: 'dark'
  }

  const breweryName = {
    value: 'OverTheAirBrewCo'
  }

  return (
    // <AppLayout theme={theme?.value} breweryName={breweryName?.value}>
      <div>Hello</div>
    // </AppLayout>
  );
}

// export default withSettings(Home, ['ui-theme', 'ui-brewery-name']);
export default Home;
