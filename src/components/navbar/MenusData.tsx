import {
  FiUsers,
  FiGrid,
  FiLayers,
  FiShoppingBag,
  FiSlack,
} from "react-icons/fi";
type Menu = {
  inDashboard?: boolean;
  label: string;
  path: string;
  icon?: React.ReactNode;
};
export const menus: Menu[] = [
  {
    inDashboard: true,
    label: "Dashboard",
    path: "/dashboard/",
    icon: <FiGrid />,
  },
  {
    inDashboard: true,
    label: "Product Categories",
    path: "/dashboard/product-categories",
    icon: <FiSlack />,
  },
  {
    inDashboard: true,
    label: "Products",
    path: "/dashboard/products",
    icon: <FiLayers />,
  },
  {
    inDashboard: true,
    label: "Users",
    path: "/dashboard/users",
    icon: <FiUsers />,
  },
  {
    inDashboard: true,
    label: "Orders",
    path: "/dashboard/orders",
    icon: <FiShoppingBag />,
  },
];
