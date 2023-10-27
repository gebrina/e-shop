import {
  FiUsers,
  FiGrid,
  FiLayers,
  FiShoppingBag,
  FiSlack,
  FiLogOut,
  FiShoppingCart,
  FiCreditCard,
} from "react-icons/fi";

type MenuLinks = {
  label: string;
  path: string;
  icon?: React.ReactNode;
};

type Menu = {
  dashboard?: MenuLinks[];
  default?: MenuLinks[];
};

export const menus: Menu = {
  dashboard: [
    {
      label: "Dashboard",
      path: "/dashboard/",
      icon: <FiGrid />,
    },
    {
      label: "Product Categories",
      path: "/dashboard/product-categories",
      icon: <FiSlack />,
    },
    {
      label: "Products",
      path: "/dashboard/products",
      icon: <FiLayers />,
    },
    {
      label: "Users",
      path: "/dashboard/users",
      icon: <FiUsers />,
    },
    {
      label: "Orders",
      path: "/dashboard/orders",
      icon: <FiShoppingBag />,
    },
    {
      label: "Products In Cart",
      path: "/dashboard/cart",
      icon: <FiShoppingCart />,
    },
    {
      label: "Biling",
      path: "/dashboard/payment",
      icon: <FiCreditCard />,
    },
    {
      label: "Log out",
      path: "/dashboard/login",
      icon: <FiLogOut />,
    },
  ],
};
