import React from "react";

const DeleteModal = ({ title, message, deleteAction, closeModal }) => {
  const handleDelete = async () => {
    try {
      await deleteAction();
      closeModal();
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600/50 flex justify-center items-center z-50">
      <div className="w-full max-w-md bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h2>
        <p className="text-gray-700">{message}</p>
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
