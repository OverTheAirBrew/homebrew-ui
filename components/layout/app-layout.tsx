// import { } from 'admin-lte'
// const {Item} = Sidebar

import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faBookOpen,
  faBurn,
  faCog,
  faInfoCircle,
  faPlug,
  faRedoAlt,
  faThermometerFull,
  faToggleOn,
  faUtensilSpoon,
} from "@fortawesome/free-solid-svg-icons";
import { FC } from "react";
import { useAppContext } from "../../lib/context";
import Footer from "./footer";
import NavbarMain from "./navbar";
import Page from "./page";
import Sidebar, { MenuItemType } from "./sidebar";

const menuItems: MenuItemType[] = [
  {
    title: "Brewing",
    icon: faBurn,
    link: {
      href: "/brewing",
    },
  },
  {
    title: "Fermenting",
    icon: faRedoAlt,
    link: {
      href: "/fermenting",
    },
  },
  {
    title: "Equipment",
    group: true,
  },
  {
    title: "Kettle",
    icon: faBurn,
    link: {
      href: "/equipment/kettle",
    },
  },
  {
    title: "Fermenter",
    icon: faUtensilSpoon,
    link: {
      href: "/equipment/fermenter",
    },
  },
  {
    title: "Sensors",
    icon: faThermometerFull,
    link: {
      href: "/equipment/sensors",
    },
  },
  {
    title: "Actors",
    icon: faToggleOn,
    link: {
      href: "/equipment/actors",
    },
  },
  {
    title: "Admin",
    group: true,
  },
  {
    title: "Settings",
    icon: faCog,
    link: {
      href: "/admin/settings",
    },
  },
  {
    title: "Plugins",
    icon: faPlug,
    link: {
      href: "/admin/plugins",
    },
  },
  {
    title: "Help",
    group: true,
  },
  {
    title: "About",
    icon: faInfoCircle,
    link: {
      href: "/help/about",
    },
  },
  {
    title: "Github",
    icon: faGithub,
    link: {
      href: "https://github.com/overtheairbrew",
      external: true,
    },
  },
  {
    title: "Development Docs",
    icon: faBookOpen,
    link: {
      href: "https://overtheair-homebrew.readthedocs.io/en/latest/",
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
        sidebar.show ? "" : "sidebar-collapse"
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
