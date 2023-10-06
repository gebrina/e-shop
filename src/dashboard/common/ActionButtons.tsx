import { FC } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";

type ActionButtonsProps = {
  handleDelete: (id: string) => void;
  handleUpdate: (value: any) => void;
};

const ActionButtons: FC<ActionButtonsProps> = ({
  handleDelete,
  handleUpdate,
}) => {
  return (
    <div>
      <FiEdit
        className="text-success action-button"
        onClick={(value: any) => handleUpdate(value)}
      />
      <FiTrash
        className="text-danger action-button"
        onClick={(value: any) => handleDelete(value.id)}
      />
    </div>
  );
};

export default ActionButtons;
