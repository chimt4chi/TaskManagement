import React from "react";
import { GiCancel } from "react-icons/gi";

interface EditModalProps {
  input: string;
  description: string;
  onInputChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

const style = {
  modal: `fixed top-0 left-0 w-full h-full flex items-center justify-center`,
  modalContent: `bg-gray-700 rounded-lg p-4 max-w-md w-full`,
  modalHeader: `flex items-center justify-between mb-4 text-black`,
  modalTitle: `text-lg font-bold`,
  modalCloseButton: `text-red-600 hover:text-red-800`,
  modalBody: `mb-4 text-black`,
  modalActions: `flex justify-end`,
  form: `flex flex-col md:flex-row gap-2 md:gap-4`,
  input: `bg-gray-200 p-2 w-full md:w-3/4 text-xl text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500`,
  button: `p-4 ml-2 bg-purple-500 text-slate-100 rounded hover:bg-purple-600 transition-colors duration-300`,
};

const EditModal: React.FC<EditModalProps> = ({
  input,
  description,
  onInputChange,
  onDescriptionChange,
  onSave,
  onCancel,
}) => {
  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <div className={style.modalHeader}>
          <h3 className={style.modalTitle}>Edit Task & Description</h3>
          <button
            onClick={onCancel}
            className="text-red-600 hover:text-red-800"
          >
            <GiCancel className="text-4xl" />
          </button>
        </div>
        <div className={style.modalBody}>
          <form className={style.form} onSubmit={onSave}>
            <input
              id="task"
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              type="text"
              placeholder="Edit Task"
              className={style.input}
            />
            <input
              id="desc"
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              type="text"
              placeholder="Edit Description"
              className={style.input}
            />
          </form>
        </div>
        <div className={style.modalActions}>
          <button className={style.button} onClick={onSave}>
            Save
          </button>
          <button className={style.button} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
