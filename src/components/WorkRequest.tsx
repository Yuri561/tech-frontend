import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'aos/dist/aos.css';
import AOS from 'aos';
import './styles/WorkRequest.css';
import Notes from './Notes';

const WorkRequest: React.FC = () => {
  const username = localStorage.getItem('username');
  const [workEntries, setWorkEntries] = useState<{ _id: string, Id: string, Description: string, Type: string, NTE: string, Date: string, AssignedTo: string, Status: string, Priority: string, Location: string, Notes: string, PO: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS animations with a duration of 1000ms
    fetchWorkOrders();
  }, []);

  const fetchWorkOrders = async () => {
    setLoading(true);
    try {
      const username = localStorage.getItem('username'); // Adjust based on your implementation
      const response = await axios.get('http://localhost:5000/workorders', {
        params: { assignedTo: username }
      });
      setWorkEntries(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching work orders:', error);
    }
    setLoading(false);
  };

  const deleteWorkOrder = async (_id: string) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/workorders/${_id}`);
      fetchWorkOrders(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting work order:', error);
    }
    setLoading(false);
  };

  return (
    <div
      data-aos="fade-in"
      className="work-request p-10 w-full h-full bg-gray-900 text-white flex flex-col items-center"
    >
      <header data-aos="fade-down" className="page-header w-full mb-6 bg-gray-800 p-4 rounded flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Work Request</h2>
        <div className="user-info text-lg">Welcome, {username}</div>
      </header>
      <div data-aos="fade-up" className="work-entry-form w-full h-full bg-gray-800 p-6 rounded flex flex-col items-center">
        <h3 className="text-xl font-semibold mb-6">Manage Work Entries</h3>
        <div className="work-table-container w-full overflow-x-auto mb-6">
          {loading ? (
            <div className="w-full bg-gray-900 rounded-full h-4 mb-4">
              <div className="bg-blue-900 h-4 rounded-full animate-progress-bar"></div>
            </div>
          ) : (
            <table className="work-table w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-900">
                  <th className="p-3">ID</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">NTE</th>
                  <th className="p-3">Request Date</th>
                  <th className="p-3">Assigned To</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Priority</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Notes</th>
                  <th className="p-3">PO</th>
                  <th className="p-3">Edit</th>
                  <th className="p-3">Delete</th>
                </tr>
              </thead>
              <tbody>
                {workEntries.map((entry, index) => (
                  <tr key={index} className="odd:bg-gray-800 even:bg-gray-900" data-aos="fade-up">
                    <td className="p-3">{entry.Id}</td>
                    <td className="p-3">{entry.Description}</td>
                    <td className="p-3">{entry.Type}</td>
                    <td className="p-3">{entry.NTE}</td>
                    <td className="p-3">{new Date(entry.Date).toLocaleDateString()}</td>
                    <td className="p-3">{entry.AssignedTo}</td>
                    <td className="p-3">{entry.Status}</td>
                    <td className="p-3">{entry.Priority}</td>
                    <td className="p-3">{entry.Location}</td>
                    <td className="p-3">{entry.Notes}</td>
                    <td className="p-3">{entry.PO}</td>
                    <td className="p-3">
                      <button className="button bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700" onClick={() => {<Notes isOpen={true} onClose={() => {}} initialNotes="" onSave={() => {}} /> }}>Edit</button>
                    </td>
                    <td className="p-3">
                      <button className="button bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700" onClick={() => deleteWorkOrder(entry._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div  className="button-group flex justify-center space-x-4">
          <button className="button bg-blue-500 md:text-lg text-white py-2 px-4 rounded hover:bg-blue-700" onClick={fetchWorkOrders}>Refresh</button>
          <Link to='/new-work-order-form' className="button bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Add Work Entry</Link>
          <button className="button bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Submit Work</button>
        </div>
      </div>
    </div>
  );
};

export default WorkRequest;
