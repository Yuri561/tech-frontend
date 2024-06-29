import React, { useState, useEffect } from 'react';
import axios from 'axios';


interface WorkOrder {
  rtuInformation: string;
  maintenanceHistory: string[];
  Id: string;
  Description: string;
  Type: string;
  NTE: number;
  Date: string;
  AssignedTo: string;
  Status: string;
  Priority: number;
  Location: string;
  Notes: string;
  PO: number;
}

const Equipment: React.FC = () => {
  const username: string = localStorage.getItem('username') || 'Guest';
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState<WorkOrder | null>(null);
  const [formState, setFormState] = useState({
    workPerformed: '',
    recommendations: '',
    labor: '',
    materialUsed: ''
  });

  useEffect(() => {
    const fetchWorkOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/workorders?assignedTo=${username}`);
        console.log('Fetched work orders:', response.data);
        setWorkOrders(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching work orders:', error);
        setWorkOrders([]);
      }
    };

    fetchWorkOrders();
  }, [username]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formState);
    setFormState({
      workPerformed: '',
      recommendations: '',
      labor: '',
      materialUsed: ''
    });
  };

  const handleWorkOrderSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    console.log('Selected Work Order ID:', selectedId);
    const selectedOrder = workOrders.find(order => order.Id === selectedId) || null;
    setSelectedWorkOrder(selectedOrder);
  };

  return (
    <div
      
      className="equipment p-8 w-full h-full bg-gray-900 text-white flex flex-col items-center overflow-y-auto"
    >
      <header className="page-header w-full max-w-5xl mb-6 bg-gray-800 p-4 rounded-2xl flex justify-between items-center shadow-md">
        <h2 className="text-2xl font-semibold">Equipment Details</h2>
        <div className="user-info text-lg">Welcome, {username}</div>
      </header>
      <div className="equipment-content w-full max-w-5xl flex flex-col space-y-6">
        <div className="bg-gray-800 p-6 rounded-2xl shadow-md">
          <label className="flex flex-col space-y-2">
            <span>Select Work Order:</span>
            <select onChange={handleWorkOrderSelect} className="p-2 bg-gray-700 rounded-lg">
              <option value="">--Select Work Order--</option>
              {workOrders.map((order) => (
                <option key={order.Id} value={order.Id}>
                  {order.Description} ({order.Id})
                </option>
              ))}
            </select>
          </label>
        </div>
        {selectedWorkOrder && (
          <>
            <div className="bg-gray-800 p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold mb-2">Work Order: {selectedWorkOrder.Id}</h3>
              <p className="text-lg">{selectedWorkOrder.Description}</p>
              <h4 className="text-lg font-semibold mt-4">RTU Information</h4>
              <p className="text-lg">{selectedWorkOrder.rtuInformation}</p>
              <h4 className="text-lg font-semibold mt-4">Maintenance History</h4>
              <ul className="list-disc list-inside">
                {(selectedWorkOrder.maintenanceHistory || []).map((entry, index) => (
                  <li key={index} className="text-lg">{entry}</li>
                ))}
              </ul>
              <h4 className="text-lg font-semibold mt-4">Additional Notes</h4>
              <p className="text-lg">{selectedWorkOrder.Notes}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-2xl shadow-md">
              <form onSubmit={handleSubmit} className="equipment-form flex flex-col space-y-4">
                <label className="flex flex-col space-y-2">
                  <span>Work Performed:</span>
                  <textarea name="workPerformed" value={formState.workPerformed} onChange={handleChange} className="p-2 bg-gray-700 rounded-lg"/>
                </label>
                <label className="flex flex-col space-y-2">
                  <span>Recommendations:</span>
                  <textarea name="recommendations" value={formState.recommendations} onChange={handleChange} className="p-2 bg-gray-700 rounded-lg"/>
                </label>
                <label className="flex flex-col space-y-2">
                  <span>Labor:</span>
                  <input type="text" name="labor" value={formState.labor} onChange={handleChange} className="p-2 bg-gray-700 rounded-lg"/>
                </label>
                <label className="flex flex-col space-y-2">
                  <span>Material Used:</span>
                  <input type="text" name="materialUsed" value={formState.materialUsed} onChange={handleChange} className="p-2 bg-gray-700 rounded-lg"/>
                </label>
                <div className="flex justify-between w-full mt-4">
                  <button type="button" className="bg-gray-500 text-white py-2 px-4 rounded-2xl hover:bg-gray-700 transition duration-300 shadow">
                    <span className="material-icons">arrow_back</span>
                  </button>
                  <button type="button" className="bg-gray-500 text-white py-2 px-4 rounded-2xl hover:bg-gray-700 transition duration-300 shadow">
                    <span className="material-icons">arrow_forward</span>
                  </button>
                </div>
                <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-2xl hover:bg-blue-700 transition duration-300 shadow">Submit</button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Equipment;
