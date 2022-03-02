import type { NextPage } from 'next';
import Dashboard from '../components/dashboard';
import PageContent from '../components/layout/page/content';
import PageHeader from '../components/layout/page/header';

const Home: NextPage = () => {
  return (
    <>
      <PageHeader title="Home" />
      <PageContent>
        <Dashboard />
      </PageContent>
    </>
  );
};

export default Home;
