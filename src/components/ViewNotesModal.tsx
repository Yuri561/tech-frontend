// ViewNotesModal.tsx
import React from 'react';

interface ViewNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  notes: string;
}

const ViewNotesModal: React.FC<ViewNotesModalProps> = ({ isOpen, onClose, notes }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 rounded">
      <div className="relative bg-gray-800 bg-opacity-75 rounded-lg shadow dark:bg-gray-700 p-4 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">View Notes</h3>
          <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={onClose}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="p-4 bg-white rounded">
          <p className=" text-gray-900 dark:text-black">{notes}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewNotesModal;
