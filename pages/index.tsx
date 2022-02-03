import Col from '../components/layout/grid/col';
import Row from '../components/layout/grid/row';
import PageContent from '../components/layout/page/content';
import PageHeader from '../components/layout/page/header';

const Home = () => {
  return (
    <>
      <PageHeader title="Home" />
      <PageContent>
        <Row>
          <Col>Hello</Col>
        </Row>
      </PageContent>
    </>
  );
};

export default Home;
