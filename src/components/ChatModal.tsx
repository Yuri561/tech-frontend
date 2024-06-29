import React, { useState} from 'react';

const qaList = [
  {
    question: "How do I reset the HVAC system?",
    answer: "To reset your HVAC system, turn off the thermostat, turn off the circuit breaker, wait for 30 seconds, and then turn it back on."
  },
  {
    question: "What does it mean if the HVAC system is leaking water?",
    answer: "If your HVAC system is leaking water, it might be due to a clogged condensate drain line. Check and clean the drain line to fix the issue."
  },
  {
    question: "How often should HVAC filters be changed?",
    answer: "HVAC filters should be changed every 1-3 months, depending on the type of filter and the environment."
  },
  {
    question: "What should I do if the HVAC system is not cooling?",
    answer: "If the HVAC system is not cooling, check if the thermostat is set correctly, ensure the air filter is clean, and verify that the condenser unit is not obstructed."
  },
  {
    question: "How can I improve HVAC efficiency?",
    answer: "To improve HVAC efficiency, regularly clean and replace filters, seal ducts, install a programmable thermostat, and schedule annual maintenance."
  },
  {
    question: "What does it mean if the HVAC system is making strange noises?",
    answer: "Strange noises from the HVAC system could indicate loose parts, debris in the ducts, or issues with the motor. It's best to have a technician inspect it."
  },
  {
    question: "How do I change the thermostat settings?",
    answer: "Refer to your thermostat's user manual for specific instructions. Generally, you can change the settings by accessing the menu and adjusting the temperature or mode."
  },
  {
    question: "What should I do if the HVAC system is not turning on?",
    answer: "Check if the thermostat is set to the correct mode and temperature. Ensure the circuit breaker is not tripped and the power switch near the unit is turned on."
  },
  {
    question: "Why is the HVAC system blowing warm air?",
    answer: "The HVAC system might blow warm air if the thermostat is set incorrectly, the air filter is dirty, or there is an issue with the refrigerant levels."
  },
  {
    question: "How do I maintain my HVAC system?",
    answer: "Regular maintenance includes changing filters, cleaning ducts and vents, inspecting the outdoor unit, and scheduling annual professional check-ups."
  }
];

const ChatModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<{ sender: string, text: string }[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentMessage.trim()) {
      const newMessages = [...messages, { sender: 'User', text: currentMessage }];
      setMessages(newMessages);
      const botResponse = getBotResponse(currentMessage);
      setMessages([...newMessages, { sender: 'Tech Support', text: botResponse }]);
      setCurrentMessage('');
    }
  };

  const getBotResponse = (message: string) => {
    const foundQA = qaList.find(qa => message.toLowerCase().includes(qa.question.toLowerCase()));
    return foundQA ? foundQA.answer : "I'm not sure about that. Could you please provide more details or contact support?";
  };

  if (!isOpen) return null;

  return (
    <div id="crud-modal" tabIndex={-1} aria-hidden="true" className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-4">
        <div className="relative bg-gray-800 rounded-lg shadow">
          <div className="flex items-center justify-between p-4 border-b border-gray-600 rounded-t">
            <h3 className="text-lg font-semibold text-white">Tech Support</h3>
            <button type="button" className="text-gray-400 hover:text-white rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center" onClick={onClose}>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 space-y-4">
            <div className="h-64 overflow-y-auto bg-gray-900 p-4 rounded-lg">
              {messages.map((message, index) => (
                <div key={index} className={`mb-2 p-2 rounded-lg ${message.sender === 'User' ? 'bg-blue-600 text-white self-end' : 'bg-gray-700 text-gray-200 self-start'}`}>
                  <strong>{message.sender}: </strong>{message.text}
                </div>
              ))}
            </div>
            <form className="flex space-x-2" onSubmit={handleSubmit}>
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                className="flex-1 p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message..."
              />
              <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white rounded-lg p-2">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
