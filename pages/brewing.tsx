import { useRouter } from 'next/dist/client/router';
import Col from '../components/layout/grid/col';
import Row from '../components/layout/grid/row';
import PageContent from '../components/layout/page/content';
import PageHeader from '../components/layout/page/header';

const Home = () => {
  const router = useRouter();

  return (
    <>
      <PageHeader title="Home" currentPath={router.pathname} />
      <PageContent>
        <Row>
          <Col>Hello</Col>
        </Row>
      </PageContent>
    </>
  );
};

export default Home;
