import React from 'react';

interface TooltipProps {
  text: string;
}

const Tooltip: React.FC<TooltipProps> = ({ text }) => {
  return (
    <div className="sidebar-tooltip absolute z-10 inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-y-1/2 left-full ml-2">
      {text}
      <div className="tooltip-arrow" data-popper-arrow></div>
    </div>
  );
};

export default Tooltip;
