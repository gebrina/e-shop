import { useState } from "react";
import PCForm from "./PCForm";
import { DashButtons } from "../common";
import { Action } from "../common/Buttons";

const ProductCategory = () => {
  const [action, setAction] = useState<Action>();

  const handleClick = () => {
    if (action) {
      setAction(undefined);
    } else {
      setAction("add");
    }
  };
  return (
    <section className="my-3">
      <DashButtons
        title="Product Categories"
        text=""
        action={action}
        onClick={handleClick}
      />
      {action && <PCForm action={action} />}
      <div className="bg-light"></div>
    </section>
  );
};

export default ProductCategory;
