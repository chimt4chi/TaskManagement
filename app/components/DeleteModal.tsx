import React from "react";
import { GiCancel } from "react-icons/gi";

interface DeleteModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const style = {
  modal: `fixed top-0 left-0 w-full h-full flex items-center justify-center`,
  modalContent: `bg-gray-700 rounded-lg p-4 max-w-md w-full`,
  modalHeader: `flex items-center justify-between mb-4 text-black`,
  modalTitle: `text-lg font-bold text-white`,
  modalCloseButton: `text-red-600 hover:text-red-800`,
  modalBody: `mb-4 text-white`,
  modalActions: `flex justify-end`,
  form: `flex flex-col md:flex-row gap-2 md:gap-4`,
  input: `bg-gray-200 p-2 w-full md:w-3/4 text-xl text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500`,
  button: `p-4 ml-2 bg-purple-500 text-slate-100 rounded hover:bg-purple-600 transition-colors duration-300`,
};

const DeleteModal: React.FC<DeleteModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <div className={style.modalHeader}>
          <h3 className={style.modalTitle}>Confirm Deletion</h3>
          <button className={style.modalCloseButton} onClick={onCancel}>
            <GiCancel className="text-4xl" />
          </button>
        </div>
        <div className={style.modalBody}>
          <p>Are you sure you want to delete this task?</p>
        </div>
        <div className={style.modalActions}>
          <button className={style.button} onClick={onConfirm}>
            Delete
          </button>
          <button className={style.button} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
