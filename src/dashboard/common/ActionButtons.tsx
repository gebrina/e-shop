import { FC } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";

type ActionButtonsProps = {
  handleDelete: () => void;
  handleUpdate: () => void;
};

const ActionButtons: FC<ActionButtonsProps> = ({
  handleDelete,
  handleUpdate,
}) => {
  return (
    <div>
      <FiEdit className="text-success action-button" onClick={handleUpdate} />
      <FiTrash className="text-danger action-button" onClick={handleDelete} />
    </div>
  );
};

export default ActionButtons;
