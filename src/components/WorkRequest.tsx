// WorkRequest.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'aos/dist/aos.css';
import AOS from 'aos';
import NotesModal from './NotesModal'; // Import NotesModal
import ViewNotesModal from './ViewNotesModal'; // Import ViewNotesModal
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faNoteSticky } from '@fortawesome/free-solid-svg-icons';

const WorkRequest: React.FC = () => {
  const username = localStorage.getItem('username');
  const [workEntries, setWorkEntries] = useState<{ _id: string, Id: string, Description: string, Type: string, NTE: string, Date: string, AssignedTo: string, Status: string, Priority: string, Location: string, Notes: string, PO: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedWorkOrderId, setSelectedWorkOrderId] = useState<string | null>(null);
  const [selectedNotes, setSelectedNotes] = useState<string>('');
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [isViewNotesModalOpen, setIsViewNotesModalOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS animations with a duration of 1000ms
    fetchWorkOrders();
  }, []);

  const fetchWorkOrders = async () => {
    setLoading(true);
    try {
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
      await axios.delete(`http://localhost:5000/workorders/${_id}`);
      fetchWorkOrders(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting work order:', error);
    }
    setLoading(false);
  };

  const handleEditClick = (workOrderId: string, notes: string) => {
    setSelectedWorkOrderId(workOrderId);
    setSelectedNotes(notes);
    setIsNotesModalOpen(true);
  };

  const handleViewClick = (notes: string) => {
    setSelectedNotes(notes);
    setIsViewNotesModalOpen(true);
  };

  const handleSaveNotes = async (workOrderId: string, notes: string) => {
    try {
      await axios.put(`http://localhost:5000/workorders/${workOrderId}`, { Notes: notes });
      setIsNotesModalOpen(false);
      fetchWorkOrders(); // Refresh the list after updating notes
    } catch (error) {
      console.error('Error updating notes:', error);
    }
  };

  return (
    <div
      data-aos="fade-in"
      className="work-request p-0 max-w-9xl w-full h-full bg-gray-900 text-white flex flex-col items-center overflow-auto"
    >
      <header data-aos="fade-down" className="page-header w-full mb-4 bg-gray-800 p-4 rounded flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Work Request</h2>
        <div className="user-info text-lg">Welcome, {username}</div>
      </header>
      <div data-aos="fade-up" className="work-entry-form w-full bg-gray-800 p-6 rounded flex flex-col items-center overflow-auto">
        <h3 className="text-xl font-semibold mb-4">Manage Work Entries</h3>
        <div className="work-table-container w-full overflow-x-auto mb-4">
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
                  <th className="p-3">View</th>
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
                    <td className="p-3 cursor-pointer"><FontAwesomeIcon icon={faNoteSticky} onClick={() => handleViewClick(entry.Notes)}/></td>
                    <td className="p-3">{entry.PO}</td>
                    <td className="p-3">
                      <button className="button bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700" onClick={() => handleEditClick(entry._id, entry.Notes)}>
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    </td>
                    <td className="p-3">
                      <button className="button bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" onClick={() => handleViewClick(entry.Notes)}>
                        <FontAwesomeIcon icon={faEye} />
                      </button>
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
        <div className="button-group flex justify-center space-x-4 my-4">
          <button className="bg-blue-500 text-white py-1 sm:py-2 px-2 sm:px-4 rounded-lg hover:bg-blue-700 transition duration-300 shadow" onClick={fetchWorkOrders}>Refresh</button>
          <Link to='/new-work-order-form' className="bg-blue-500 text-white py-1 sm:py-2 px-2 sm:px-4 rounded-lg hover:bg-blue-700 transition duration-300 shadow">Add Work Entry</Link>
          <button className="bg-blue-500 text-white py-1 sm:py-2 px-2 sm:px-4 rounded-lg hover:bg-blue-700 transition duration-300 shadow">Submit Work</button>
        </div>
      </div>
      <NotesModal
        isOpen={isNotesModalOpen}
        onClose={() => setIsNotesModalOpen(false)}
        initialNotes={selectedNotes}
        workOrderId={selectedWorkOrderId}
        onSave={handleSaveNotes}
      />
      <ViewNotesModal
        isOpen={isViewNotesModalOpen}
        onClose={() => setIsViewNotesModalOpen(false)}
        notes={selectedNotes}
      />
    </div>
  );
};

export default WorkRequest;
