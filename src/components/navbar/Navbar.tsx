import { NavLink } from "react-router-dom";
import { menus } from "./MenusData";
import "./Navbar.scss";
import { FC } from "react";
import { useEcomContext } from "../../context/useEcomContext";

type NavbarProps = {
  setVisible?: () => void;
};
const Navbar: FC<NavbarProps> = ({ setVisible }) => {
  const { isDashboard } = useEcomContext();

  return (
    <header>
      <nav>
        {isDashboard ? (
          <ul>
            {menus.map((menu) => {
              return (
                <li onClick={() => setVisible && setVisible()} key={menu.label}>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "active menu-link" : "menu-link"
                    }
                    to={menu.path}
                  >
                    <li>{menu.icon}</li>
                    {menu.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        ) : (
          <ul>
            <h1>Navigation bar</h1>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
