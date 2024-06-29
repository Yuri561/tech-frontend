import React from 'react';
import './styles/Loading.css';

const Loading: React.FC = () => {
  return (
    <div className="loading-overlay">
      <div className="bounce"></div>
      <p className="loading-text">Be right there...</p>
    </div>
  );
};

export default Loading;
