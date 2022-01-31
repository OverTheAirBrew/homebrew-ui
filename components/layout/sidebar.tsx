import { Menu } from '@paljs/ui/Menu';
import { SidebarBody, Sidebar as PalSidebar } from '@paljs/ui/Sidebar';
import { FC } from 'react';
import Link from 'next/link';
import { MenuItemType } from '@paljs/ui';

interface ISidearProps {
  items: MenuItemType[];
  currentPath: string;
}

const Sidebar: FC<ISidearProps> = (props) => {
  return (
    <PalSidebar
      property="start"
      containerFixed
      responsive
      className="menu-sidebar"
    >
      <SidebarBody>
        <Menu
          nextJs
          className="sidebar-menu"
          items={props.items}
          currentPath={props.currentPath}
          Link={Link}
        />
      </SidebarBody>
    </PalSidebar>
  );
};

export default Sidebar;
