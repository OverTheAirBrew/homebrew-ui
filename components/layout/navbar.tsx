import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';

interface INavbarMainProps {
  closeSidebar: () => void;
}

const NavbarMain: FC<INavbarMainProps> = ({ closeSidebar }) => {
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a
            className="nav-link"
            data-widget="pushmenu"
            href="#"
            role="button"
            onClick={closeSidebar}
          >
            <FontAwesomeIcon icon={faBars} />
          </a>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto"></ul>
    </nav>
  );
};

export default NavbarMain;
