import { Button } from "primereact/button";
import { Card } from "primereact/card";

const App = () => {
  return (
    <div>
      <Card style={{ width: "300px" }}>
        <Button severity="danger">button</Button>
      </Card>
    </div>
  );
};

export default App;
