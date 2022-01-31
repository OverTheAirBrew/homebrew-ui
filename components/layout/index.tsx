import icons from '@paljs/icons';
import {
  Layout, LayoutColumn, LayoutColumns, LayoutContainer,
  LayoutContent, LayoutFooter
} from '@paljs/ui/Layout';
import { useRouter } from 'next/dist/client/router';
import react, { Fragment } from 'react';
import { ThemeProvider } from 'styled-components';
import SimpleLayout from '../simple-layout';
import themes from '../themes';
import Header from './header';
import { menu } from './menu';
import Sidebar from './sidebar';





const AppLayout: react.FC<{
  theme: 'dark' | 'cosmic' | 'corporate';
  breweryName: string;
}> = ({ children, theme, breweryName }) => {
  const router = useRouter();

  return (
    <Fragment>
      <ThemeProvider theme={themes(theme, 'ltr')}>
        <Fragment>
          <SimpleLayout />
          <Layout evaIcons={icons} dir="ltr" className='main-content'>
            <Header breweryName={breweryName} />
            <LayoutContainer id="modal-container">
              <Sidebar currentPath={router.pathname} items={menu} />
              <LayoutContent>
                <LayoutColumns>
                  <LayoutColumn>
                    {children}
                  </LayoutColumn>
                </LayoutColumns>
                <LayoutFooter>&copy; OverTheAirBrewCo</LayoutFooter>
              </LayoutContent>
            </LayoutContainer>
          </Layout>
        </Fragment>
      </ThemeProvider>
    </Fragment>
  );
};

export default AppLayout;
