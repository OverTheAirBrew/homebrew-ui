// import { } from 'admin-lte'
// const {Item} = Sidebar

import { brands, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FC } from 'react';
import { useAppContext } from '../../lib/context';
import Footer from './footer';
import NavbarMain from './navbar';
import Page from './page';
import Sidebar, { MenuItemType } from './sidebar';

const menuItems: MenuItemType[] = [
  {
    title: 'Brewing',
    icon: solid('burn'),
    link: {
      href: '/brewing',
    },
  },
  {
    title: 'Fermenting',
    icon: solid('redo-alt'),
    link: {
      href: '/fermenting',
    },
  },
  {
    title: 'Equipment',
    group: true,
  },
  {
    title: 'Kettle',
    icon: solid('burn'),
    link: {
      href: '/equipment/kettles',
    },
  },
  {
    title: 'Fermenter',
    icon: solid('utensil-spoon'),
    link: {
      href: '/equipment/fermenters',
    },
  },
  {
    title: 'Sensors',
    icon: solid('thermometer-full'),
    link: {
      href: '/equipment/sensors',
    },
  },
  {
    title: 'Actors',
    icon: solid('toggle-on'),
    link: {
      href: '/equipment/actors',
    },
  },
  {
    title: 'Admin',
    group: true,
  },
  {
    title: 'Settings',
    icon: solid('cog'),
    link: {
      href: '/admin/settings',
    },
  },
  {
    title: 'Plugins',
    icon: solid('plug'),
    link: {
      href: '/admin/plugins',
    },
  },
  {
    title: 'Help',
    group: true,
  },
  {
    title: 'About',
    icon: solid('info-circle'),
    link: {
      href: '/help/about',
    },
  },
  {
    title: 'Github',
    icon: brands('github'),
    link: {
      href: 'https://github.com/overtheairbrew',
      external: true,
    },
  },
  {
    title: 'Development Docs',
    icon: solid('book-open'),
    link: {
      href: 'https://overtheair-homebrew.readthedocs.io/en/latest/',
      external: true,
    },
  },
];

interface IAppLayoutProps {}

const AppLayout: FC<IAppLayoutProps> = ({ children }) => {
  const { sidebar } = useAppContext();

  return (
    <div
      className={`sidebar-mini layout-fixed ${
        sidebar.show ? '' : 'sidebar-collapse'
      }`}
    >
      <NavbarMain />
      <Sidebar menuItems={menuItems} />
      <Page>{children}</Page>
      <Footer />
    </div>
  );
};

export default AppLayout;
