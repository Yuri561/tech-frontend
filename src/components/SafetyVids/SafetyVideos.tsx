import React from 'react';
import ReactPlayer from 'react-player';

interface SafetyVideoProps {
  url: string;
  title: string;
  onEnd: () => void;
}

const SafetyVideo: React.FC<SafetyVideoProps> = ({ url, title, onEnd }) => {
  return (
    <div className="safety-video">
      <h4 className="text-xl font-semibold mb-4 text-white">{title}</h4>
      <ReactPlayer
        url={url}
        controls
        onEnded={onEnd}
        className="rounded-2xl overflow-hidden w-screen h-screen"
      />
    </div>
  );
};

export default SafetyVideo;
