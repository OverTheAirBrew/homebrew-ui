import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { FC } from 'react';
import { RequireOnlyOne } from '../../lib/require-one-of';
import MenuItemGroup from './menu-items/group';
import LinkItem from './menu-items/link-item';

interface ItemType {
  title: string;
  link: {
    href: string;
    external?: boolean;
  };
  group: boolean;
  icon?: IconProp;
}

export type MenuItemType = RequireOnlyOne<ItemType, 'link' | 'group'>;

interface ISidebarProps {
  menuItems: MenuItemType[];
}

const Sidebar: FC<ISidebarProps> = ({ menuItems }) => {
  const router = useRouter();

  return (
    <aside className="main-sidebar main-sidebar-custom sidebar-dark-primary elevation-4">
      <Link href="#">
        <a className="brand-link">
          <img
            src="/OTA_Logo_SocialCircle.svg"
            className="brand-image img-circle elevation-3"
          />

          <span className="brand-text font-weight-light">
            Over The Air Brew
          </span>
        </a>
      </Link>
      <div className="sidebar">
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {menuItems.map((mi) => {
              if (mi.group) {
                return <MenuItemGroup item={mi} />;
              }

              return <LinkItem item={mi} currentPath={router.pathname} />;
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
