import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const DocsUpload: React.FC = () => {
  const username = localStorage.getItem('username');

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
          <input type="file" className="p-2 bg-gray-700 rounded-lg mb-4"/>
          <button className="button bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center space-x-2">
            <FontAwesomeIcon icon={faUpload} />
            <span>Upload Document</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default DocsUpload;
