import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHammer, faScrewdriver, faWrench, faToolbox, faClipboardList, faThermometer,
  faFaucet, faFireExtinguisher, faSnowflake, faFan, faLightbulb, faPlug,
  faTape, faRuler, faHardHat, faBolt, faBroom, faBrush, faFirstAid,
  faGasPump, faGlasses, faPencilRuler, faArrowRight, faArrowLeft, faPlus, faPaperPlane
} from '@fortawesome/free-solid-svg-icons';
import MultipleChoiceQuiz from './MultipleChoiceQuiz';
import SafetyVideo from './SafetyVids/SafetyVideos';
import { Tooltip } from 'react-tooltip';

interface Tool {
  name: string;
  description: string;
  icon: any;
  category: string;
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Quiz {
  questions: Question[];
}

const ToolBox: React.FC = () => {
  const [showQuizzes, setShowQuizzes] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<any | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const username = localStorage.getItem('username') || 'Guest';

  const tools: Tool[] = [
    { name: 'Hammer', description: 'Used for driving nails into, or pulling nails from, some other object.', icon: faHammer, category: 'Hand Tools' },
    { name: 'Screwdriver', description: 'A tool for driving screws or bolts with special slots.', icon: faScrewdriver, category: 'Hand Tools' },
    { name: 'Wrench', description: 'Used to provide grip and mechanical advantage in applying torque to turn objects.', icon: faWrench, category: 'Hand Tools' },
    { name: 'Toolbox', description: 'A container to organize and carry tools.', icon: faToolbox, category: 'Storage' },
    { name: 'Clipboard', description: 'Used to hold papers and provide a writing surface.', icon: faClipboardList, category: 'Office Supplies' },
    { name: 'Thermometer', description: 'Used to measure temperature.', icon: faThermometer, category: 'Measurement Tools' },
    { name: 'Pipe Wrench', description: 'A wrench used for turning soft iron pipes and fittings.', icon: faFaucet, category: 'Hand Tools' },
    { name: 'Fire Extinguisher', description: 'A device for extinguishing fires.', icon: faFireExtinguisher, category: 'Safety Equipment' },
    { name: 'Air Conditioner', description: 'Device used for cooling.', icon: faSnowflake, category: 'HVAC' },
    { name: 'Fan', description: 'A device that creates a current of air.', icon: faFan, category: 'HVAC' },
    { name: 'Lightbulb', description: 'An electric light.', icon: faLightbulb, category: 'Electrical' },
    { name: 'Plug', description: 'A device for making an electrical connection.', icon: faPlug, category: 'Electrical' },
    { name: 'Tape Measure', description: 'A flexible ruler used to measure distance.', icon: faTape, category: 'Measurement Tools' },
    { name: 'Ruler', description: 'A tool used to measure lengths.', icon: faRuler, category: 'Measurement Tools' },
    { name: 'Hard Hat', description: 'A helmet worn to protect the head from injuries.', icon: faHardHat, category: 'Safety Equipment' },
    { name: 'Multimeter', description: 'An instrument used to measure electrical properties.', icon: faBolt, category: 'Electrical' },
    { name: 'Broom', description: 'A tool for sweeping.', icon: faBroom, category: 'Cleaning' },
    { name: 'Paint Brush', description: 'A tool used for painting.', icon: faBrush, category: 'Painting' },
    { name: 'First Aid Kit', description: 'A collection of supplies and equipment for medical treatment.', icon: faFirstAid, category: 'Safety Equipment' },
    { name: 'Gas Can', description: 'A container for storing gasoline.', icon: faGasPump, category: 'Safety Equipment' },
    { name: 'Safety Glasses', description: 'Protective eyewear.', icon: faGlasses, category: 'Safety Equipment' },
    { name: 'Pencil and Ruler', description: 'Tools for drawing and measuring.', icon: faPencilRuler, category: 'Office Supplies' }
  ];

  const categories = Array.from(new Set(tools.map(tool => tool.category)));

  const handleVideoEnd = () => {
    setShowQuiz(true);
  };

  const safetyVideos = [
    { title: 'Workplace Safety - Protect Your Hands', url: 'https://www.youtube.com/watch?v=gUIOJcKaOVA' },
    { title: 'Fire Safety Tips', url: 'https://www.youtube.com/watch?v=Hz6r_v3pq1s' },
    { title: 'Office Ergonomics: Positioning Your Monitor', url: 'https://www.youtube.com/watch?v=riD8Xt8r1MQ' },
    { title: 'Ladder Safety Basics', url: 'https://www.youtube.com/watch?v=XbEL_447oHg' },
    { title: 'Hearing Protection at Work', url: 'https://www.youtube.com/watch?v=ehV9d7gabfc' },
    { title: 'Electrical Safety in the Workplace', url: 'https://www.youtube.com/watch?v=RYYqEEBpggs' },
    { title: 'Slips, Trips, and Falls Prevention', url: 'https://www.youtube.com/watch?v=uS1EDn708mQ' },
    { title: 'Personal Protective Equipment (PPE)', url: 'https://www.youtube.com/watch?v=bE6pySftAJc' },
    { title: 'Back Safety and Proper Lifting Techniques', url: 'https://www.youtube.com/watch?v=k1n5ECgByxY' },
    { title: 'Emergency Evacuation Procedures', url: 'https://www.youtube.com/watch?v=3aLWlDY_G9w' }
  ];

  const openVideoModal = (video: any) => {
    setCurrentVideo(video);
    setShowVideoModal(true);
    setShowQuiz(false); // Reset the quiz state
  };

  const quiz: Quiz = {
    questions: [
      {
        question: 'What is the purpose of a fire extinguisher?',
        options: ['To start a fire', 'To extinguish a fire', 'To create smoke', 'To signal for help'],
        correctAnswer: 1
      },
      // Add more questions here
    ]
  };

  return (
    <div className="toolbox p-4 sm:p-8 w-full h-full bg-gray-900 text-white flex flex-col items-center">
      <header className="page-header w-full max-w-7xl mb-6 bg-gray-800 p-4 sm:p-6 rounded-2xl flex justify-between items-center shadow-md">
        <h2 className="text-xl sm:text-2xl font-semibold">ToolBox</h2>
        <div className="user-info text-sm sm:text-lg">Welcome, {username}</div>
      </header>
      <div className="toolbox-content w-full max-w-7xl flex flex-col space-y-6 overflow-auto">
        {showQuizzes ? (
          <div className="section bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-md">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-white">Monthly Safety Quizzes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {safetyVideos.map((video, index) => (
                <div className="card bg-gray-700 p-4 rounded-2xl shadow hover:bg-gray-600 transition duration-300" key={index}>
                  <strong className="text-sm sm:text-lg text-white">{video.title}</strong>
                  <p className="text-gray-300">Watch the video and take the quiz.</p>
                  <button
                    className="mt-4 bg-blue-500 text-white py-1 sm:py-2 px-2 sm:px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                    onClick={() => openVideoModal(video)}
                  >
                    Watch Video
                  </button>
                </div>
              ))}
            </div>
            <FontAwesomeIcon icon={faArrowLeft} className="cursor-pointer mt-6" onClick={() => setShowQuizzes(false)} />
          </div>
        ) : (
          <div className="section bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-md">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 flex justify-between items-center">
              <span>Available Tools</span>
              <FontAwesomeIcon icon={faArrowRight} className="cursor-pointer" onClick={() => setShowQuizzes(true)} />
            </h3>
            <div className="dropdown mb-4">
              <select
                className="bg-gray-700 text-white p-2 rounded"
                onChange={(e) => setSelectedCategory(e.target.value)}
                value={selectedCategory || ''}
              >
                <option value="">Select a Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>
            {selectedCategory && (
              <table className="min-w-full bg-gray-700 rounded-2xl overflow-hidden shadow-md">
                <thead>
                  <tr>
                    <th className="p-4 bg-gray-800 text-left">Tool</th>
                    <th className="p-4 bg-gray-800 text-left">Description</th>
                    <th className="p-4 bg-gray-800 text-left">Icon</th>
                  </tr>
                </thead>
                <tbody>
                  {tools.filter(tool => tool.category === selectedCategory).map((tool, index) => (
                    <tr key={index} className="border-b border-gray-600 hover:bg-gray-600 transition duration-300">
                      <td className="p-4">{tool.name}</td>
                      <td className="p-4">{tool.description}</td>
                      <td className="p-4"><FontAwesomeIcon icon={tool.icon} className="text-xl" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div className="flex justify-center space-x-4 my-4">
              <FontAwesomeIcon
                icon={faPlus}
                className="text-white cursor-pointer hover:text-green-500 transition"
                data-tooltip-id="addTooltip"
                data-tooltip-content="Add Tool"
              />
              <FontAwesomeIcon
                icon={faPaperPlane}
                className="text-white cursor-pointer hover:text-blue-500 transition"
                data-tooltip-id="submitTooltip"
                data-tooltip-content="Submit Tools"
              />
              <Tooltip id="addTooltip" place="top" effect="solid" />
              <Tooltip id="submitTooltip" place="top" effect="solid" />
            </div>
          </div>
        )}
      </div>

      {showVideoModal && currentVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-4 sm:p-2 rounded-2xl shadow-md w-full max-w-3xl relative">
            {!showQuiz ? (
              <SafetyVideo url={currentVideo.url} title={currentVideo.title} onEnd={handleVideoEnd} />
            ) : (
              <div className="quiz-content">
                <MultipleChoiceQuiz quiz={quiz} setScore={() => {}} />
              </div>
            )}
            <button className="absolute top-4 right-4 text-white" onClick={() => setShowVideoModal(false)}>X</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolBox;
