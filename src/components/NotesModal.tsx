// NotesModal.tsx
import React, { useState } from 'react';

interface NotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialNotes: string;
  workOrderId: string;
  onSave: (workOrderId: string, notes: string) => void;
}

const NotesModal: React.FC<NotesModalProps> = ({ isOpen, onClose, initialNotes, workOrderId, onSave }) => {
  const [notes, setNotes] = useState(initialNotes);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(workOrderId, notes);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-gray-800 rounded shadow dark:bg-gray-700 p-4 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Edit Notes</h3>
          <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={onClose}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full p-2 border border-gray-300 rounded text-black"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
          <button type="submit" className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">Save</button>
        </form>
      </div>
    </div>
  );
};

export default NotesModal;
