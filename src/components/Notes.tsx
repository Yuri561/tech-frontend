import React, { useState, useEffect } from 'react';

interface NotesProps {
  isOpen: boolean;
  onClose: () => void;
  initialNotes: string;
  onSave: (notes: string) => void;
}

const Notes: React.FC<NotesProps> = ({ isOpen, onClose, initialNotes, onSave }) => {
  const [notes, setNotes] = useState(initialNotes);

  useEffect(() => {
    if (isOpen) {
      setNotes(initialNotes);
    }
  }, [isOpen, initialNotes]);

  const handleSave = () => {
    onSave(notes);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-2xl shadow-md w-full max-w-lg relative">
        <h3 className="text-xl font-semibold mb-4">Notes</h3>
        <textarea
          className="w-full p-4 bg-gray-700 text-white rounded-lg"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <div className="mt-4 flex justify-end space-x-4">
          <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notes;
