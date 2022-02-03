import { FC } from 'react';
import { MenuItemType } from '../sidebar';

interface IMenuItemGroupProps {
  item: MenuItemType;
}

const MenuItemGroup: FC<IMenuItemGroupProps> = ({ item }) => {
  return <li className="nav-header">{item.title}</li>;
};

export default MenuItemGroup;
