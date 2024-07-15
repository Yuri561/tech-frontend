import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

interface DocsUploadProps {
  workOrderId: string;
}

const DocsUpload: React.FC<DocsUploadProps> = ({ workOrderId }) => {
  const username = localStorage.getItem('username');
  const [document, setDocument] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setDocument(event.target.files[0]); // Capture the file from the input
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    if (!document) {
      console.error('No document selected');
      return;
    }

    console.log('Document submitted:', document);

    const formData = new FormData();
    formData.append('document', document);

    try {
      const result = await axios.post(`https://server-alpha-rose.vercel.app/upload/${workOrderId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Document submitted:', result.data);
    } catch (error) {
      console.error('Error uploading document:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="documents p-5 w-screen h-full bg-gray-900 text-white flex flex-col items-center overflow-y-hidden "
    >
      <header className="documents-header w-full max-w-7xxl mb-6 bg-gray-800 p-4 rounded-2xl flex justify-between items-center shadow-md">
        <h2 className="text-2xl font-semibold">Document Management</h2>
        <div className="user-info text-lg">Welcome, {username}</div>
      </header>
      <div className="documents-content w-full max-w-7xxl flex flex-col space-y-6">
        <div className="upload-section bg-gray-800 p-6 rounded-2xl shadow-md flex flex-col items-center">
          <p className="text-xl font-semibold mb-4">Upload your documents securely</p>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input type="file" onChange={handleFileChange} className="p-2 bg-gray-700 rounded-lg mb-4" />
            <button type="submit" className="button bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center space-x-2">
              <FontAwesomeIcon icon={faUpload} />
              <span>Upload Document</span>
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default DocsUpload;
