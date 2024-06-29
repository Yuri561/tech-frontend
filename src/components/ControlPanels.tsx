import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faTemperatureHigh, faCar, faComments, faTint } from '@fortawesome/free-solid-svg-icons';

interface ControlPanelsProps {
  role: string;
  toggleClockedIn: () => void;
  isClockedIn: boolean;
  setIsChatModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsIvrModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  weather: {
    main: {
      temp: number;
      humidity: number;
    };
  } | null;
}

const ControlPanels: React.FC<ControlPanelsProps> = ({ toggleClockedIn, isClockedIn, setIsChatModalOpen, setIsIvrModalOpen, weather }) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 rounded">
      <div className="bg-gray-800 p-4 rounded">
        <h2 className="text-lg md:text-xl mb-2 flex items-center text-white"><FontAwesomeIcon icon={faCar} className="mr-2" />Travel</h2>
        <div className="flex items-center justify-between">
          <span className="text-white">{isClockedIn ? 'Travel' : 'Home'}</span>
          <button className="bg-blue-500 p-2 rounded text-white" onClick={toggleClockedIn}>Toggle</button>
        </div>
      </div>
      <div className="bg-gray-800 p-4 rounded">
        <h2 className="text-lg md:text-xl mb-2 flex items-center text-white"><FontAwesomeIcon icon={faTemperatureHigh} className="mr-2" />Temperature</h2>
        <div className="flex flex-col items-start rounded">
          <div className="flex items-center mb-2">
            <FontAwesomeIcon icon={faTemperatureHigh} className="mr-2 text-white" />
            <span className="text-white">{weather ? `${weather.main.temp}°F` : 'Loading...'}</span>
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faTint} className="mr-2 text-white" />
            <span className="text-white">{weather ? `${weather.main.humidity}% Humidity` : 'Loading...'}</span>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 p-4 rounded">
        <h2 className="text-lg md:text-xl mb-2 flex items-center text-white"><FontAwesomeIcon icon={faComments} className="mr-2" />Tech Support</h2>
        <div className="flex items-center justify-between">
          <span className="text-white">OFF</span>
          <button className="bg-blue-500 p-2 rounded text-white" onClick={() => setIsChatModalOpen(true)}>Chat</button>
        </div>
      </div>
      <div className="bg-gray-800 p-4 rounded">
        <h2 className="text-lg md:text-xl mb-2 flex items-center text-white"><FontAwesomeIcon icon={faLightbulb} className="mr-2" />Service Channel</h2>
        <div className="flex items-center justify-between">
          <button
            data-modal-target="crud-modal"
            data-modal-toggle="crud-modal"
            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            onClick={() => setIsIvrModalOpen(true)}
          >
            Check In
          </button>
        </div>
      </div>
    </section>
  );
};

export default ControlPanels;
