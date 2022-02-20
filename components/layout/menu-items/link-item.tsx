import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import { useAppContext } from '../../../lib/context';
import { isDesktop } from '../../../lib/is-desktop';
import Link from '../../link';
import { MenuItemType } from '../sidebar';

interface ILinkItemProps {
  item: MenuItemType;
  currentPath: string;
}

const LinkItem: FC<ILinkItemProps> = ({ item, currentPath }) => {
  const { sidebar } = useAppContext();

  const linkClassName = `nav-link ${
    currentPath === item.link?.href ? 'active' : ''
  }`;

  return (
    <li className="navbar-item">
      <Link href={item.link?.href || ''}>
        <a
          className={linkClassName}
          target={item.link?.external ? '_blank' : ''}
          onClick={() => (!isDesktop() ? sidebar.toggle() : undefined)}
        >
          {item.icon ? (
            <FontAwesomeIcon
              className="nav-icon"
              icon={item.icon}
              style={{ marginRight: '10px' }}
            />
          ) : (
            <></>
          )}
          <p>{item.title}</p>
        </a>
      </Link>
    </li>
  );
};

export default LinkItem;
