import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface TodoItem {
  id: string;
  text: string;
  description: string;
  completed: boolean;
}

const style = {
  tableRow: `border-b bg-dark-table-row`,
  tableCell: `p-4 text-white text-center items-center justify-center break-all `,
  tableActions: `flex items-center justify-center`,
  editButton: `p-2 ml-2 text-blue-500 hover:scale-125`,
  deleteButton: `p-2 ml-2 text-red-500 hover:scale-125`,
};

interface TodoItemProps {
  todo: TodoItem;
  index: number;
  onToggleCompletion: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  index,
  onToggleCompletion,
  onEdit,
  onDelete,
}) => {
  return (
    <tr className={style.tableRow}>
      <td className={style.tableCell}>{index + 1}</td>
      <td className={`${style.tableCell} truncate md:max-w-md`}>{todo.text}</td>
      <td className={`${style.tableCell} truncate md:max-w-md`}>
        {todo.description}
      </td>
      <td className={style.tableCell}>
        <div className="flex items-center justify-center ">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggleCompletion(todo.id)}
            className="mr-2"
          />
          <span
            className={`${
              todo.completed ? "text-green-600" : "text-yellow-600"
            } whitespace-nowrap`}
          >
            {todo.completed ? "Completed" : "In Progress"}
          </span>
        </div>
      </td>
      <td className={style.tableCell}>
        <div className={style.tableActions}>
          <button
            className={`${style.editButton} text-sm md:text-base`}
            onClick={() => onEdit(todo.id)}
          >
            <FaEdit />
          </button>
          <button
            className={`${style.deleteButton} text-sm md:text-base`}
            onClick={() => onDelete(todo.id)}
          >
            <FaTrash />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TodoItem;

