// import { } from 'admin-lte'
// const {Item} = Sidebar

import { FC } from 'react';
import { useAppContext } from '../../lib/context';
import Footer from './footer';
import NavbarMain from './navbar';
import Page from './page';
import Sidebar, { MenuItemType } from './sidebar';

const menuItems: MenuItemType[] = [
  {
    title: 'Brewing',
    icon: 'burn',
    link: {
      href: '/brewing',
    },
  },
  {
    title: 'Fermenting',
    icon: 'redo-alt',
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
    icon: 'burn',
    link: {
      href: '/equipment/kettle',
    },
  },
  {
    title: 'Fermenter',
    icon: 'utensil-spoon',
    link: {
      href: '/equipment/fermenter',
    },
  },
  {
    title: 'Sensors',
    icon: 'thermometer-full',
    link: {
      href: '/equipment/sensors',
    },
  },
  {
    title: 'Actors',
    icon: 'toggle-on',
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
    icon: 'cog',
    link: {
      href: '/admin/settings',
    },
  },
  {
    title: 'Plugins',
    icon: 'plug',
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
    icon: 'info-circle',
    link: {
      href: '/help/about',
    },
  },
  {
    title: 'Github',
    icon: 'github',
    link: {
      href: 'https://github.com/overtheairbrew',
      external: true,
    },
  },
  {
    title: 'Development Docs',
    icon: 'book-open',
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
