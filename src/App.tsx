import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { ProductCategory } from "./dashboard/product-category";

const App = () => {
  return (
    <div>
      <ProductCategory />
      <Card style={{ width: "300px" }}>
        <Button severity="danger">button</Button>
      </Card>
    </div>
  );
};

export default App;
