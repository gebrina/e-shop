import { Sidebar } from "primereact/sidebar";
import { FC } from "react";
import Navbar from "./navbar/Navbar";

type SidebarProps = {
  visible: boolean;
  setVisible: () => void;
};

const Sidbar: FC<SidebarProps> = ({ visible, setVisible }) => {
  return (
    <div>
      <Sidebar
        header="E-Shop Dashboard"
        visible={visible}
        onHide={() => setVisible()}
      >
        <Navbar />
      </Sidebar>
    </div>
  );
};

export default Sidbar;
