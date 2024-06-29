// src/pages/Ivr.tsx

import React from 'react';

const Ivr: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className='bg-blue-900'>
      <div
        id="crud-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-gray-900 bg-opacity-75"
      >
        <div className="relative p-4 w-full max-w-lg max-h-full">
          <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 bg-blue-900">
              <h3 className="text-lg  text-center mx-auto font-semibold text-gray-900 dark:text-white">
                IVR Service Channel Login
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={onClose}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <form className="p-4 md:p-5 space-y-4 bg-gray-900">
              <div>
                <label
                  htmlFor="po-number"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  PO Number
                </label>
                <input
                  type="text"
                  name="po-number"
                  id="po-number"
                  className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Enter PO Number"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="work-order"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Work Order Details
                </label>
                <textarea
                  id="work-order"
                  rows={3}
                  className="block p-2.5 w-full text-sm text-white bg-gray-700 rounded-lg border border-gray-600 focus:ring-primary-600 focus:border-primary-600"
                  placeholder="Describe the work order details"
                  required
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="vendor-name"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Vendor Name
                </label>
                <input
                  type="text"
                  name="vendor-name"
                  id="vendor-name"
                  className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Enter Vendor Name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="contact-info"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Contact Information
                </label>
                <input
                  type="text"
                  name="contact-info"
                  id="contact-info"
                  className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Enter Contact Information"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="priority-level"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Priority Level
                </label>
                <select
                  id="priority-level"
                  className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                >
                  <option value="">Select Priority Level</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="additional-notes"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Additional Notes
                </label>
                <textarea
                  id="additional-notes"
                  rows={3}
                  className="block p-2.5 w-full text-sm text-white bg-gray-700 rounded-lg border border-gray-600 focus:ring-primary-600 focus:border-primary-600"
                  placeholder="Enter any additional notes"
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ivr;
