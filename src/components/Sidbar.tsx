import { Sidebar } from "primereact/sidebar";
import { useState } from "react";

const Sidbar = () => {
  const [visible, setVisible] = useState(true);

  return (
    <div>
      <Sidebar visible={visible} onHide={() => setVisible(false)} fullScreen>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla quia
        laudantium nesciunt dignissimos praesentium expedita id! Obcaecati dicta
        nulla inventore dolorum, aliquid aut iusto eum fuga, ea excepturi sed
        maiores perspiciatis aperiam totam. Eius sapiente officia porro. Quis,
        maxime temporibus beatae quos, praesentium optio nihil corrupti facere
        minima, accusamus maiores consequuntur hic quas quo perspiciatis
        doloremque magnam animi ipsum fugiat dolores cupiditate? Enim pariatur
        et corrupti explicabo eligendi quos ipsam officia, nostrum assumenda
        perferendis quibusdam exercitationem nobis ab aspernatur expedita? Ut
        inventore delectus doloremque pariatur, quod vel autem a labore
        repudiandae deserunt eum fugit sed qui ullam doloribus, enim
        praesentium?
      </Sidebar>
    </div>
  );
};

export default Sidbar;
