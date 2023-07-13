import React, { FormEvent } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";

interface TodoFormProps {
  input: string;
  description: string;
  editMode: boolean;
  onInputChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onSave: () => void;
  onEditModeChange: (value: boolean) => void; // Add this prop to handle edit mode change
}

const style = {
  form: `flex flex-col md:flex-row gap-2 md:gap-4`,
  input: `bg-gray-200 p-2 w-full md:w-3/4 text-xl text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500`,
  button: `p-2 bg-purple-500 text-slate-100 rounded hover:bg-purple-600 transition-colors duration-300`,
};

const TodoForm: React.FC<TodoFormProps> = ({
  input,
  description,
  editMode,
  onInputChange,
  onDescriptionChange,
  onSave,
  onEditModeChange,
}) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave();
    onEditModeChange(false); // Reset edit mode to "add mode"
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <input
        className={style.input}
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        type="text"
        placeholder={editMode ? "Edit Task" : "Add Task"}
      />
      <input
        className={style.input}
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        type="text"
        placeholder="Description"
      />
      <button type="submit" className={style.button}>
        {editMode ? (
          <FaEdit size={30} className="inline" />
        ) : (
          <AiOutlinePlus size={30} className="inline" />
        )}
      </button>
    </form>
  );
};

export default TodoForm;
