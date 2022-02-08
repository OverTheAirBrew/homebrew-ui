import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { useAppContext } from "../../lib/context";

interface INavbarMainProps {}

const NavbarMain: FC<INavbarMainProps> = () => {
  const { sidebar } = useAppContext();

  return (
    <nav
      className="main-header navbar navbar-expand navbar-white navbar-light"
      style={{ minHeight: "57px", maxHeight: "57px" }}
    >
      <ul className="navbar-nav">
        <li className="nav-item">
          <a
            className="nav-link"
            data-widget="pushmenu"
            href="#"
            role="button"
            onClick={() => {
              sidebar.toggle();
            }}
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
