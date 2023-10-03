import { Button } from "primereact/button";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import PCForm from "./PCForm";

const ProductCategory = () => {
  const [action, setAction] = useState();

  return (
    <section className="my-3">
      <div className="right-items">
        <Button
          onClick={() => setAction("new")}
          className="btn btn-success  center-items"
        >
          <FiPlus />
          <span>Category</span>
        </Button>
      </div>
      {action && <PCForm action={action} />}
      <div className="bg-light"></div>
    </section>
  );
};

export default ProductCategory;
