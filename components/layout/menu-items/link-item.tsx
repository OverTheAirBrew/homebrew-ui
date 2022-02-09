import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import Link from "../../link";
import { MenuItemType } from "../sidebar";

interface ILinkItemProps {
  item: MenuItemType;
  currentPath: string;
}

const LinkItem: FC<ILinkItemProps> = ({ item, currentPath }) => {
  const linkClassName = `nav-link ${
    currentPath === item.link?.href ? "active" : ""
  }`;

  return (
    <li className="navbar-item">
      <Link href={item.link?.href || ""}>
        <a
          className={linkClassName}
          // target={item.link?.external ? "_blank" : ""}
        >
          {item.icon ? (
            <FontAwesomeIcon
              className="nav-icon"
              icon={item.icon}
              style={{ marginRight: "10px" }}
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
