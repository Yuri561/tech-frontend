import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import './styles/AddWork.css';
import { useNavigate } from 'react-router-dom';

// Get the current work order count from local storage
const getCurrentWorkOrderCount = () => {
  const count = localStorage.getItem('workOrderCount');
  return count ? parseInt(count, 10) : 0;
};

// Generate the next work order ID
const generateWorkOrderId = () => {
  const currentCount = getCurrentWorkOrderCount();
  const nextCount = currentCount + 1;
  localStorage.setItem('workOrderCount', nextCount.toString());
  return `W${String(nextCount).padStart(3, '0')}`;
};

const NewWorkOrderForm: React.FC = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    Id: generateWorkOrderId(),
    Description: '',
    Type: '',
    NTE: '',
    Date: '',
    AssignedTo: '',
    Status: '',
    Priority: '',
    Location: '',
    Notes: '',
    PO: ''
  });

  const [currentSection, setCurrentSection] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const newOrder = {
      Id: formState.Id,
      Description: formState.Description,
      Type: formState.Type,
      NTE: parseFloat(formState.NTE),
      AssignedTo: formState.AssignedTo,
      Status: formState.Status,
      Priority: parseInt(formState.Priority),
      Location: formState.Location,
      Notes: formState.Notes,
      PO: parseInt(formState.PO),
      Date: new Date(formState.Date),
    };

    try {
      const response = await axios.post('https://server-alpha-rose.vercel.app/workorders', newOrder);
      console.log('Work order has been created', response.data);
      navigate('/work-request');
    } catch (e) {
      console.error('Error creating work order:', e);
      setError('Error creating work order: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
    }
  };

  const sections = [
    {
      title: "Work Order Details",
      content: (
        <>
          <label className="flex flex-col space-y-2">
            <span>Work Order Number:</span>
            <input type="text" name="Id" value={formState.Id} onChange={handleChange} readOnly className="p-2 bg-gray-700 rounded-lg"/>
          </label>
          <label className="flex flex-col space-y-2">
            <span>Description:</span>
            <textarea name="Description" value={formState.Description} onChange={handleChange} required className="p-2 bg-gray-700 rounded-lg"/>
          </label>
          <label className="flex flex-col space-y-2">
            <span>Type:</span>
             <select name="Type" value={formState.Type} onChange={handleChange} className="p-2 bg-gray-700 rounded-lg">
              <option value="default">Select type...</option>
              <option value="HVAC">HVAC</option>
              <option value="REF">Refrigeration</option>
              <option value="GM">General Maintanance</option>
            </select>
          </label>
          <label className="flex flex-col space-y-2">
            <span>NTE:</span>
            <input type="number" name="NTE" value={formState.NTE} onChange={handleChange} required className="p-2 bg-gray-700 rounded-lg"/>
          </label>
        </>
      )
    },
    {
      title: "Assignment Details",
      content: (
        <>
          <label className="flex flex-col space-y-2">
            <span>Request Date:</span>
            <input type="date" name="Date" value={formState.Date} onChange={handleChange} required className="p-2 bg-gray-700 rounded-lg"/>
          </label>
          <label className="flex flex-col space-y-2">
            <span>Assigned To:</span>
            <input type="text" name="AssignedTo" value={formState.AssignedTo} onChange={handleChange} required className="p-2 bg-gray-700 rounded-lg"/>
          </label>
          <label className="flex flex-col space-y-2">
            <span>Status:</span>
            <select name="Status" value={formState.Status} onChange={handleChange} className="p-2 bg-gray-700 rounded-lg">
              <option value="default">Select status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </label>
        </>
      )
    },
    {
      title: "Priority and Location",
      content: (
        <>
          <label className="flex flex-col space-y-2">
            <span>Priority:</span>
            <select name="Priority" value={formState.Priority} onChange={handleChange} required className="p-2 bg-gray-700 rounded-lg">
              <option value="default">Select priority</option>
              <option value="1">High</option>
              <option value="2">Medium</option>
              <option value="3">Low</option>
            </select>
          </label>
          <label className="flex flex-col space-y-2">
            <span>Location:</span>
            <input type="text" name="Location" value={formState.Location} onChange={handleChange} required className="p-2 bg-gray-700 rounded-lg"/>
          </label>
        </>
      )
    },
    {
      title: "Comments",
      content: (
        <>
          <label className="flex flex-col space-y-2">
            <span>Comments (comma-separated):</span>
            <input type="text" name="Notes" value={formState.Notes} onChange={handleChange} className="p-2 bg-gray-700 rounded-lg"/>
          </label>
          <label className="flex flex-col space-y-2">
            <span>PO:</span>
            <input type="text" name="PO" value={formState.PO} onChange={handleChange} className="p-2 bg-gray-700 rounded-lg"/>
          </label>
        </>
      )
    }
  ];

  const username = localStorage.getItem('username');

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="new-work-order-form-container p-6 w-full h-full bg-gray-900 text-white flex flex-col items-center"
    >
      <header className="page-header w-full max-w-9xl mb-6 bg-gray-800 p-4 rounded-2xl flex justify-between items-center shadow-md">
        <h1 className="font-semibold sm: text-xl">New Work Order</h1>
        <div className="user-info text-lg">Welcome, {username}</div>
      </header>
      <div className="form-wrapper w-full max-w-9xl   bg-gray-800 p-3 rounded-2xl shadow-md flex-1">
        <form className="new-work-order-form flex flex-col space-y-4 h-full" onSubmit={handleSubmit} method="post">
          <h3 className="text-xl font-semibold mb-4">{sections[currentSection].title}</h3>
          <div className="flex flex-col space-y-4 flex-1">
            {sections[currentSection].content}
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-between w-full mt-4">
            <button type="button" onClick={handlePrev} className="bg-gray-500 text-white py-2 px-4  mb-4 rounded-2xl hover:bg-gray-700 transition duration-300 shadow">
              &larr;
            </button>
            <button type="button" onClick={handleNext} className="bg-gray-500 text-white py-2 px-4 mb-4 rounded-2xl hover:bg-gray-700 transition duration-300 shadow">
              &rarr;
            </button>
          </div>
          {currentSection === sections.length - 1 && (
            <button type="submit" className="mt-4 mb-4 bg-blue-500 text-white py-2 px-4 rounded-2xl hover:bg-blue-700 transition duration-300 shadow">
              {loading ? (
                <div className="w-full bg-gray-800 rounded-full h-4 mb-4">
                  <div className="bg-blue-500 h-4 rounded-full animate-progress-bar"></div>
                </div>
              ) : (
                'Submit'
              )}
            </button>
          )}
        </form>
      </div>
    </motion.div>
  );
};

export default NewWorkOrderForm;
