import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import styled from 'styled-components';
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

const BrandImage = styled.img`
  float: left;
  line-height: 0.8;
  margin-left: 0.8rem;
  margin-right: 0.9rem;
  margin-top: -3px;
  max-height: 33px;
  max-width: 33px;
`;

export type MenuItemType = RequireOnlyOne<ItemType, 'link' | 'group'>;

interface ISidebarProps {
  menuItems: MenuItemType[];
}

const Sidebar: FC<ISidebarProps> = ({ menuItems }) => {
  const router = useRouter();

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Link href="#">
        <a className="brand-link">
          <BrandImage src="/OTA_Logo_SocialCircle.svg" alt="logo" />

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
                return <MenuItemGroup key={mi.title} item={mi} />;
              }

              return (
                <LinkItem
                  key={mi.title}
                  item={mi}
                  currentPath={router.pathname}
                />
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
