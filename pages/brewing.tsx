import type { NextPage } from 'next';
import Col from '../components/layout/grid/col';
import Row from '../components/layout/grid/row';
import PageContent from '../components/layout/page/content';
import PageHeader from '../components/layout/page/header';
import Pid from '../components/pid';

const Home: NextPage = () => {
  return (
    <>
      <PageHeader title="Home" />
      <PageContent>
        <Row>
          <Col breakPoint={{ md: 4 }}>
            <Pid />
          </Col>
          <Col></Col>
          <Col></Col>
        </Row>
      </PageContent>
    </>
  );
};

export default Home;
