import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faClock, faHome, faToolbox, faPlusSquare, faSignOutAlt, faInfoCircle, faFileAlt, faTools, faReceipt } from '@fortawesome/free-solid-svg-icons';
import Loading from './Loading';
import 'flowbite';

const generalItems = [
  { icon: faTasks, text: 'Request', link: '/work-request' },
  { icon: faClock, text: 'Time', link: '/time-review' },
  { icon: faToolbox, text: 'Toolbox', link: '/tool-box' },
  { icon: faPlusSquare, text: 'Add', link: '/new-work-order-form' },
  { icon: faInfoCircle, text: 'Info', link: '/work-request' },
  { icon: faFileAlt, text: 'Docs', link: '/docs-upload' },
  { icon: faTools, text: 'Equipments', link: '/equipment' },
  { icon: faHome, text: 'Home', link: '/' },
  { icon: faReceipt, text: 'Generate', link: '/generate-receipt' },
  { icon: faSignOutAlt, text: 'Logout', link: '/login' },
];

interface SidebarProps {
  isAuthenticated: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isAuthenticated }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const items = isAuthenticated ? [...generalItems] : generalItems;

  const handleLinkClick = (link: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(link);
    }, 1000); // Simulate loading time
  };

  return (
    <>
      {loading && <Loading />} {/* Show loading animation */}
      <motion.div className="sidebar-wrapper hidden md:flex flex-col h-screen w-16 bg-gray-900 text-white p-2 shadow-lg border-r border-gray-800 z-50">
        <div className="sidebar-list flex flex-col space-y-4">
          {items.map((item, index) => (
            <motion.div
              key={index}
              className={`group sidebar-item p-2 rounded-full flex items-center justify-center relative ${location.pathname === item.link ? 'bg-blue-600' : 'bg-gray-800'} hover:bg-gray-700 transition duration-300 shadow`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <button data-tooltip-target={`tooltip-${index}`} data-tooltip-placement="right" type="button" onClick={() => handleLinkClick(item.link)} className="flex items-center justify-center relative  font-medium rounded text-sm px-4 text-center">
                <FontAwesomeIcon icon={item.icon} className="text-xl" />
              </button>
              <div id={`tooltip-${index}`} role="tooltip" className="absolute z-10 invisible inline-block px-4 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded shadow-sm opacity-0 tooltip dark:bg-gray-700 left-full ml-2">
                {item.text}
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="icon-sidebar md:hidden fixed bottom-0 left-0 w-full bg-gray-900 text-white p-2 flex justify-around shadow-lg z-50">
        {items.map((item, index) => (
          <div
            key={index}
            className={`sidebar-item p-2 rounded-full ${location.pathname === item.link ? 'bg-blue-600' : 'bg-gray-800'} hover:bg-gray-700 transition duration-300 shadow-lg relative group`}
          >
            <Link to="#" onClick={() => handleLinkClick(item.link)} className="flex justify-center relative">
              <FontAwesomeIcon icon={item.icon} className="text-xl" />
              <div className="absolute bottom-full mb-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="bg-gray-900 text-white text-xs font-medium p-1 rounded-lg shadow-md">
                  {item.text}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Sidebar;