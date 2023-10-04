import { Button } from "primereact/button";
import { FC } from "react";
import { FiArrowLeft, FiEdit, FiPlus } from "react-icons/fi";

export type Action = "add" | "update" | undefined;

type DashboardButtonsProps = {
  action: Action;
  text: string;
  onClick: () => void;
};

const DashboardButtons: FC<DashboardButtonsProps> = ({
  action,
  onClick,
  text,
}) => {
  return (
    <section className="right-items">
      {!action ? (
        <Button onClick={onClick} className="btn center-items btn-success">
          {action == "update" ? (
            <>
              <FiEdit />
              <span>Update </span>
            </>
          ) : (
            <>
              <FiPlus />

              <span>Add </span>
            </>
          )}
        </Button>
      ) : (
        <Button className="btn center-items btn-danger" onClick={onClick}>
          <FiArrowLeft /> {text || "Cancel"}
        </Button>
      )}
    </section>
  );
};

export default DashboardButtons;
