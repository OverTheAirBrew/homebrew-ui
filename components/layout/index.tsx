import icons from '@paljs/icons';
import { Menu, Sidebar, SidebarBody, SidebarRefObject } from '@paljs/ui';
import {
  Layout, LayoutColumn, LayoutColumns, LayoutContainer,
  LayoutContent, LayoutFooter
} from '@paljs/ui/Layout';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import react, { Fragment, useRef, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import SimpleLayout from '../simple-layout';
import themes from '../themes';
import Header from './header';
import { menu } from './menu';



const AppLayout: react.FC<{
  theme: 'dark' | 'cosmic' | 'corporate';
  breweryName: string;
}> = ({ children, theme, breweryName }) => {
  const router = useRouter();

  const sidebarRef = useRef<SidebarRefObject>(null)
  const [seeHeader, setSeeHeader] = useState(true)

  const getState = (state?:'hidden' | 'visible' | 'compacted' | 'expanded') => {
    setSeeHeader(state !== 'compacted')
  }

  return (
    <Fragment>
      <ThemeProvider theme={themes(theme, 'ltr')}>
        <Fragment>
          <SimpleLayout />
          <Layout evaIcons={icons} dir="ltr" className='main-content'>
            <Header breweryName={breweryName} toggleSidebar={() => sidebarRef.current?.toggle()} />
            <LayoutContainer id="modal-container">
            <Sidebar
              getState={getState}
              ref={sidebarRef}
              property="start"
              containerFixed
              responsive
              className="menu-sidebar"
            >
              <SidebarBody>
                <Menu
                  nextJs
                  className="sidebar-menu"
                  items={menu}
                  currentPath={router.pathname}
                  Link={Link}
                />
              </SidebarBody>
            </Sidebar>
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
