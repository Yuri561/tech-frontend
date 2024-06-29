import React, { useState, useRef, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import jsPDF from 'jspdf';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface WorkOrder {
  id: string;
  description: string;
}

const GenerateReceipt: React.FC = () => {
  const username: string = localStorage.getItem('username') || 'Guest';
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState<WorkOrder | null>(null);
  const [formState, setFormState] = useState({
    workOrder: '',
    techTitle: '',
    notes: '',
    workCompleted: false,
    notesAdded: false
  });
  const sigCanvas = useRef<SignatureCanvas>(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    
    const fetchWorkOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/workorders?assignedTo=${username}`);
        console.log('Fetched work orders:', response.data); // Debug log
        setWorkOrders(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching work orders:', error);
      }
    };
    fetchWorkOrders();
  }, [username]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { type, name, checked, value } = e.target as HTMLInputElement;
    setFormState(prevState => ({ ...prevState, [name]: type === 'checkbox' ? checked : value }));
    if (name === 'workOrder') {
      console.log('Selected work order ID:', value); // Debug log
      const selectedOrder = workOrders.find(order => order.id === value) || null;
      console.log('Selected work order details:', selectedOrder); // Debug log
      setSelectedWorkOrder(selectedOrder);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formState.workCompleted || !formState.notesAdded) {
      alert('Please complete all prerequisites before generating the receipt.');
      return;
    }

    const pdf = new jsPDF();
    pdf.text('Work Order Receipt', 10, 10);
    pdf.text(`Work Order: ${formState.workOrder}`, 10, 20);
    pdf.text(`Tech Title: ${formState.techTitle}`, 10, 30);
    pdf.text(`Notes: ${formState.notes}`, 10, 40);

    if (sigCanvas.current) {
      const imgData = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 10, 50, 180, 80);
    }

    pdf.save('receipt.pdf');
  };

  return (
    <div className="generate-receipt p-8 w-full h-full bg-gray-900 text-white flex flex-col items-center overflow-y-auto">
      <header className="page-header w-full max-w-5xl mb-6 bg-gray-800 p-4 rounded-2xl flex justify-between items-center shadow-md" data-aos="fade-down">
        <h2 className="text-2xl font-semibold">Generate Receipt</h2>
        <div className="user-info text-lg">Welcome, {username}</div>
      </header>
      <div className="generate-receipt-content w-full max-w-5xl flex flex-col space-y-6">
        <div className="bg-gray-800 p-6 rounded-2xl shadow-md" data-aos="fade-up">
          <label className="flex flex-col space-y-2">
            <span>Select Work Order:</span>
            <select
              name="workOrder"
              value={formState.workOrder}
              onChange={handleChange}
              className="p-2 bg-gray-700 rounded-lg"
            >
              <option value="">--Select Work Order--</option>
              {workOrders.map(order => (
                <option key={order.id} value={order.id}>
                  {order.description} ({order.id})
                </option>
              ))}
            </select>
          </label>
        </div>
        {selectedWorkOrder && (
          <>
            <div className="bg-gray-800 p-6 rounded-2xl shadow-md" data-aos="fade-up">
              <h3 className="text-xl font-semibold mb-2">Work Order: {selectedWorkOrder.id}</h3>
              <p className="text-lg">{selectedWorkOrder.description}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-2xl shadow-md" data-aos="fade-up">
              <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <label className="flex flex-col space-y-2">
                  <span>Tech Title:</span>
                  <input
                    type="text"
                    name="techTitle"
                    value={formState.techTitle}
                    onChange={handleChange}
                    required
                    className="p-2 bg-gray-700 rounded-lg"
                  />
                </label>
                <label className="flex flex-col space-y-2">
                  <span>Notes:</span>
                  <textarea
                    name="notes"
                    value={formState.notes}
                    onChange={handleChange}
                    required
                    className="p-2 bg-gray-700 rounded-lg"
                  />
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="workCompleted"
                    checked={formState.workCompleted}
                    onChange={handleChange}
                    className="bg-gray-700 rounded-lg"
                  />
                  <span className="text-lg">Work Completed</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="notesAdded"
                    checked={formState.notesAdded}
                    onChange={handleChange}
                    className="bg-gray-700 rounded-lg"
                  />
                  <span className="text-lg">Notes Added</span>
                </label>
                <div className="signature-pad">
                  <h3 className="text-lg font-semibold mb-2">Signature</h3>
                  <SignatureCanvas ref={sigCanvas} canvasProps={{ width: 400, height: 200, className: 'sigCanvas bg-gray-700 rounded-lg' }} />
                </div>
                <div className="flex justify-center mt-4">
                  <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-2xl hover:bg-blue-700 mb-7 transition duration-300 shadow text-lg">
                    Generate Receipt
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GenerateReceipt;
