import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faPlus, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'react-tooltip';

const TimeReview: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const username = localStorage.getItem('username');
  const timeEntries = [
    { date: '2024-06-03', startTime: '09:00', endTime: '17:00', totalHours: 8, taskDescription: 'Project Work' },
    { date: '2024-06-04', startTime: '09:00', endTime: '17:00', totalHours: 8, taskDescription: 'Client Meeting' },
    { date: '2024-06-05', startTime: '09:00', endTime: '17:00', totalHours: 8, taskDescription: 'Development' },
    { date: '2024-06-06', startTime: '09:00', endTime: '17:00', totalHours: 8, taskDescription: 'Code Review' },
    { date: '2024-06-07', startTime: '09:00', endTime: '17:00', totalHours: 8, taskDescription: 'Documentation' },
  ];

  return (
    <div className="time-review p-0 max-w-9xl w-full h-full bg-gray-900 text-white flex flex-col items-center overflow-hidden">
      <header data-aos="fade-down" className="page-header w-full mb-4 bg-gray-800 p-4 rounded flex justify-between items-center">
        <h2 className="text-2xl font-semibold flex items-center">
          <FontAwesomeIcon icon={faClock} className="mr-2" />
          Time Review
        </h2>
        <div className="user-info text-lg">Welcome, {username}</div>
      </header>
      <div data-aos="fade-up" className="time-entry-form w-full max-w-9xl bg-gray-800 p-6 rounded flex flex-col items-center flex-grow overflow-hidden">
        <div className="flex justify-between items-center w-full">
          <h3 className="text-xl font-semibold mb-4">Manage Time Entries</h3>
          <div className="flex space-x-4">
            <FontAwesomeIcon
              icon={faPlus}
              className="text-white cursor-pointer hover:text-blue-500 transition"
              data-tooltip-id="addTooltip"
              data-tooltip-content="Add Time Entry"
            />
            <FontAwesomeIcon
              icon={faPaperPlane}
              className="text-white cursor-pointer hover:text-blue-500 transition sm: px-3 sm: text-sm sm: font-small"
              data-tooltip-id="submitTooltip"
              data-tooltip-content="Submit Time"
            />
            <Tooltip id="addTooltip" place="top" effect="solid" />
            <Tooltip id="submitTooltip" place="top" effect="solid" />
          </div>
        </div>
        <div className="time-table-container w-full overflow-x-auto overflow-y-auto flex-grow mb-4">
          {timeEntries.length === 0 ? (
            <div className="text-center text-gray-400">No time entries available.</div>
          ) : (
            <table className="time-table w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-900">
                  <th className="p-3">Date</th>
                  <th className="p-3">Start Time</th>
                  <th className="p-3">End Time</th>
                  <th className="p-3">Total Hours</th>
                  <th className="p-3">Task Description</th>
                  <th className="p-3">Edit</th>
                  <th className="p-3">Delete</th>
                </tr>
              </thead>
              <tbody>
                {timeEntries.map((entry, index) => (
                  <tr key={index} className="odd:bg-gray-700 even:bg-gray-800">
                    <td className="p-3">{entry.date}</td>
                    <td className="p-3">{entry.startTime}</td>
                    <td className="p-3">{entry.endTime}</td>
                    <td className="p-3">{entry.totalHours}</td>
                    <td className="p-3">{entry.taskDescription}</td>
                    <td className="p-3">
                      <button className="bg-green-500 text-white py-1 px-2 md:py-2 md:px-4 rounded hover:bg-green-700 transition">Edit</button>
                    </td>
                    <td className="p-3">
                      <button className="bg-red-500 text-white py-1 px-2 md:py-2 md:px-4 rounded hover:bg-red-700 transition">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeReview;
