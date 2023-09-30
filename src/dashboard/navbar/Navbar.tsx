import { useState } from "react";
import Sidbar from "../../components/Sidbar";
import { Card } from "primereact/card";
const Navbar = () => {
  const [visible, setVisible] = useState(true);

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  return (
    <header>
      <nav>
        <button onClick={toggleVisibility} className="btn btn-success">
          Text
        </button>
      </nav>
      <Card title="Lorem Title">
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum
          praesentium quisquam corrupti suscipit veritatis perferendis quo
          dolores! Saepe quisquam odit, similique vel fugiat iure molestias
          adipisci aperiam consequuntur dolorum repudiandae culpa quibusdam et
          blanditiis laudantium explicabo, veritatis laborum quidem?
          Consequuntur ad et, autem doloremque voluptatem laboriosam quasi.
          Obcaecati, optio odit.
        </p>
      </Card>
      <Sidbar visible={visible} setVisible={toggleVisibility} />
    </header>
  );
};

export default Navbar;
