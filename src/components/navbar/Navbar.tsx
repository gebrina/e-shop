import { NavLink, useLocation } from "react-router-dom";
import { menus } from "./MenusData";
import "./Navbar.scss";
import { FC, useRef, useState } from "react";
import { useEcomContext } from "../../context/EcomContext";
import { FiShoppingCart } from "react-icons/fi";
import { Cart } from "../cart";

type NavbarProps = {
  setVisible?: () => void;
};

const Navbar: FC<NavbarProps> = ({ setVisible }) => {
  const { isDashboard, handleUserLogout, productsInCart, currentUser } =
    useEcomContext();

  const [open, setOpen] = useState<boolean>(false);
  const { pathname } = useLocation();

  const handleLoginStatus = () => {
    currentUser?.access_token && handleUserLogout();
  };

  const isMobileRef = useRef(false);

  if (navigator.userAgent.match(/mobile/i)) {
    isMobileRef.current = true;
  } else {
    isMobileRef.current = false;
  }

  return (
    <header
      style={{ backgroundColor: isDashboard ? "transparent" : "aliceblue" }}
    >
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
                    <span>{menu.icon}</span>
                    <span> {menu.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        ) : (
          <>
            {!isMobileRef.current ? (
              <div className="d-flex p-2  horizontal-nav mx-auto align-items-center justify-content-between">
                <Cart open={open} setOpen={setOpen} />
                <NavLink to="/">
                  <img height={50} src="/logo.png" alt="E shop " />
                </NavLink>
                <div className="navbar-menu-links">
                  <NavLink to={"/"}>Home</NavLink>
                  <NavLink to={"/products"}>Products</NavLink>
                  <NavLink onClick={handleLoginStatus} to={"user/login"}>
                    {currentUser?.access_token ? "Log out" : "Log In"}
                  </NavLink>
                  <button
                    onClick={() => setOpen(true)}
                    className={`cart ${
                      pathname.includes("cart") &&
                      !open &&
                      "bg-dark rounded text-white"
                    }`}
                  >
                    <FiShoppingCart />
                    <span className="text-dark">{productsInCart?.length}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="mob-header">
                <Cart open={open} setOpen={setOpen} />
                <div className="mob-logo">
                  <NavLink to="/">
                    <img height={50} src="/logo.png" alt="E shop " />
                  </NavLink>

                  <button
                    onClick={() => setOpen(true)}
                    className={`cart ${
                      pathname.includes("cart") &&
                      !open &&
                      "bg-dark rounded text-white"
                    }`}
                  >
                    <FiShoppingCart />
                    <span className="text-dark">{productsInCart?.length}</span>
                  </button>
                </div>
                <div className="mob-menu-links">
                  <NavLink to={"/"}>Home</NavLink>
                  <NavLink to={"/products"}>Products</NavLink>
                  <NavLink onClick={handleLoginStatus} to={"user/login"}>
                    {currentUser?.access_token ? "Log out" : "Log In"}
                  </NavLink>
                </div>
              </div>
            )}
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
