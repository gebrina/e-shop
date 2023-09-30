import { NavLink } from "react-router-dom";
import { menus } from "./MenusData";
import "./Navbar.scss";
const Navbar = () => {
  return (
    <header>
      <nav>
        <ul>
          {menus.map((menu) => {
            return (
              <li key={menu.label}>
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
      </nav>
    </header>
  );
};

export default Navbar;
