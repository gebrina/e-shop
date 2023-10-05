import { useState } from "react";
import { DashButtons } from "../common";
import { Action } from "../common/Buttons";
import ProductForm from "./ProductForm";

const Product = () => {
  const [action, setAction] = useState<Action>();

  const handleClick = () => {
    if (action) {
      setAction(undefined);
    } else {
      setAction("add");
    }
  };

  return (
    <section className="mt-2">
      <DashButtons
        action={action}
        title="Product"
        text=""
        onClick={handleClick}
      />
      {action && <ProductForm action={action} />}
    </section>
  );
};

export default Product;
