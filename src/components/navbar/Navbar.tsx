import { NavLink } from "react-router-dom";
import { menus } from "./MenusData";
import "./Navbar.scss";
import { FC, useState } from "react";
import { useEcomContext } from "../../context/EcomContext";
import { FiShoppingCart } from "react-icons/fi";
import { Cart } from "../cart";

type NavbarProps = {
  setVisible?: () => void;
};

const Navbar: FC<NavbarProps> = ({ setVisible }) => {
  const { isDashboard, handleUserLogout, productsInCart } = useEcomContext();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <header>
      <nav>
        {isDashboard ? (
          <ul>
            {menus.dashboard?.map((menu) => {
              return (
                <li
                  onClick={() => {
                    setVisible && setVisible();
                    menu.label === "Log out" && handleUserLogout();
                  }}
                  key={menu.label}
                >
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
          <div className="d-flex p-2 horizontal-nav mx-auto align-items-center justify-content-between">
            <Cart open={open} setOpen={setOpen} />
            <NavLink to="/">
              <img height={50} src="/logo.png" alt="E shop " />
            </NavLink>
            <div className="navbar-menu-links">
              <NavLink to={"/"}>Home</NavLink>
              <NavLink to={"/products"}>Products</NavLink>
              <NavLink to={"user/login"}>Login</NavLink>
              <button className={"cart cart-btn"}>
                <FiShoppingCart />
                <span>{productsInCart?.length}</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
