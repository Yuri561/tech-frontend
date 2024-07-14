import React from 'react';
import ReactPlayer from 'react-player';

interface SafetyVideoProps {
  url: string;
  title: string;
  onEnd: () => void;
}

const SafetyVideo: React.FC<SafetyVideoProps> = ({ url, title, onEnd }) => {
  return (
    <div className="safety-video sm:px-2 sm:py-1 w-full h-full flex flex-col items-center">
      <h4 className="text-xl font-semibold mb-4 text-white">{title}</h4>
      <div className="w-full h-full aspect-w-16 aspect-h-9">
        <ReactPlayer
          url={url}
          controls
          onEnded={onEnd}
          width="100%"
          height="100%"
          className="rounded-2xl overflow-hidden"
        />
      </div>
    </div>
  );
};

export default SafetyVideo;
