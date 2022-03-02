import { serverSideTranslations } from '@overtheairbrew/next-i18next/serverSideTranslations';
import { FC } from 'react';
import Col from '../components/layout/grid/col';
import Row from '../components/layout/grid/row';
import PageContent from '../components/layout/page/content';
import PageHeader from '../components/layout/page/header';
import Pid from '../components/pid';
import { BASE_URL } from '../lib/config';

const localeConfig = require('../locale-config.json');

const Home: FC<{ kettles: any }> = ({ kettles }) => {
  return (
    <>
      <PageHeader title="Home" />
      <PageContent>
        <Row>
          {kettles.map((kettle: any) => {
            return (
              <Col key={kettle.id} breakPoint={{ md: 4 }}>
                <Pid kettle={kettle} />
              </Col>
            );
          })}
          {/* <Col breakPoint={{ md: 4 }}>
            <Pid />
          </Col> */}
          <Col></Col>
          <Col></Col>
        </Row>
      </PageContent>
    </>
  );
};

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const [kettles] = await Promise.all([
    fetch(`${BASE_URL}/api/kettles`).then((data) => data.json()),
  ]);

  console.log(kettles);

  return {
    props: {
      ...(await serverSideTranslations(locale, localeConfig.namespaces)),
      kettles,
    },
  };
};

export default Home;
