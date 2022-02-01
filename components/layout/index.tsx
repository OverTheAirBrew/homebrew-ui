import icons from '@paljs/icons';
import { Menu, Sidebar, SidebarBody, SidebarRefObject, Toastr, ToastrRef } from '@paljs/ui';
import {
  Layout, LayoutColumn, LayoutColumns, LayoutContainer,
  LayoutContent, LayoutFooter
} from '@paljs/ui/Layout';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import react, { Fragment, useEffect, useRef, useState } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { toastrService } from '../../lib/toastr-service';
import SimpleLayout from '../simple-layout';
import themes from '../themes';
import Header from './header';
import { menu } from './menu';

const getDefaultTheme = (): DefaultTheme['name'] => {
  if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
    return localStorage.getItem('theme') as DefaultTheme['name'];
  } else {
    const hours = new Date().getHours();
    return hours > 6 && hours < 19 ? 'default' : 'dark';
  }
};

const AppLayout: react.FC<{
  breweryName: string;
}> = ({ children, breweryName }) => {
  const router = useRouter();

  const sidebarRef = useRef<SidebarRefObject>(null)
  const [theme, setTheme] = useState<DefaultTheme['name']>('default');

  const getState = (state?:'hidden' | 'visible' | 'compacted' | 'expanded') => {
    // setSeeHeader(state !== 'compacted')
  }

  const changeTheme = (newTheme: DefaultTheme['name']) => {
    setTheme(newTheme);
    typeof localStorage !== 'undefined' && localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const localTheme = getDefaultTheme();
    if (localTheme !== theme && theme === 'default') {
      setTheme(localTheme);
    }
  }, []);

  const toastRef = useRef<ToastrRef>(null);
  toastrService.setRef(toastRef)

  return (
    <Fragment>
      <ThemeProvider theme={themes(theme, 'ltr')}>
        <Fragment>
          <SimpleLayout />
          <Layout evaIcons={icons} dir="ltr" className='main-content'>
            <Header breweryName={breweryName} toggleSidebar={() => sidebarRef.current?.toggle()} />
            <Toastr ref={toastRef} />
            <LayoutContainer style={{paddingTop: '4.75rem'}}>
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
                  <LayoutColumn className="main-content">
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
