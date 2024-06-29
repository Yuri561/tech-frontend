import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AOS from 'aos';
import Chart from 'react-apexcharts';

import 'aos/dist/aos.css';

interface Member {
  name: string;
  email: string;
  phone: string;
  image: string;
  bgColor: string;
}

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
}

const Home: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isClockedIn, setIsClockedIn] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [isChatModalOpen, setIsChatModalOpen] = useState<boolean>(false);
  const [isIvrModalOpen, setIsIvrModalOpen] = useState<boolean>(false);

  const role = localStorage.getItem('role') || 'employee'; // Default to 'employee' if role is undefined

  const [weather, setWeather] = useState<WeatherData>({ main: { temp: 0, humidity: 0 } });

  const toggleClockedIn = () => {
    setIsClockedIn(prevState => !prevState);
    if (!isClockedIn) {
      const id = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 1);
      }, 1000);
      setIntervalId(id);
    } else {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
    });

    const fetchWeather = async () => {
      try {
        const apiKey = "897cb7af93dc77cc8639d0935e34a4d6";
        console.log(import.meta.env.VITE_OPENWEATHERMAP_API_KEY);
        if (!apiKey) {
          throw new Error('OpenWeatherMap API key is not defined');
        }

        console.log('API Key:', apiKey); // Check if API key is loaded correctly
        const city = 'Fayetteville';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

        const response = await axios.get(apiUrl);
        setWeather(response.data);
        console.log(response.data); // Debug log
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    fetchWeather();
  }, []);

  const formatElapsedTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  const username = localStorage.getItem('username') || 'User';

  console.log('Logged in as:', username, 'with role:', role); // Debug log

  return (
    <div className="flex h-screen w-full bg-gray-900 text-white">
      <main className="flex-grow p-2 md:p-6 overflow-auto rounded">
        <section className="mb-6 rounded">
          <div className="bg-gray-800 p-4 md:p-6 rounded">
            <div className="flex justify-between items-center">
              <h1 className="text-xl md:text-3xl text-white">Hi, {username}!</h1>
              <span className={`text-xl md:text-2xl ${isClockedIn ? 'text-red-500' : 'text-white'}`}>
                {isClockedIn ? formatElapsedTime(elapsedTime) : new Date().toLocaleTimeString()}
              </span>
            </div>
            {weather && weather.main && (
              <p className="text-sm md:text-lg text-white">
                Welcome Home! The air quality is good & fresh. You can go out today.
                <span className="block mt-2 text-xs md:text-sm text-white">
                  {weather.main.temp}°F - Fuzzy cloudy weather
                </span>
              </p>
            )}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 rounded">
          <div className="bg-gray-800 p-4 rounded">
            <h2 className="text-lg md:text-xl mb-2 flex items-center text-white"><i className="fas fa-car mr-2"></i>Travel</h2>
            <div className="flex items-center justify-between">
              <span className="text-white">{isClockedIn ? 'Travel' : 'Home'}</span>
              <button className="bg-blue-500 p-2 rounded text-white" onClick={toggleClockedIn}>Toggle</button>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded">
            <h2 className="text-lg md:text-xl mb-2 flex items-center text-white"><i className="fas fa-temperature-high mr-2"></i>Temperature</h2>
            <div className="flex flex-col items-start rounded">
              <div className="flex items-center mb-2">
                <i className="fas fa-temperature-high mr-2 text-white"></i>
                <span className="text-white">{weather ? `${weather.main.temp}°F` : 'Loading...'}</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-tint mr-2 text-white"></i>
                <span className="text-white">{weather ? `${weather.main.humidity}% Humidity` : 'Loading...'}</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded">
            <h2 className="text-lg md:text-xl mb-2 flex items-center text-white"><i className="fas fa-comments mr-2"></i>Tech Support</h2>
            <div className="flex items-center justify-between">
              <span className="text-white">OFF</span>
              <button className="bg-blue-500 p-2 rounded text-white" onClick={() => setIsChatModalOpen(true)}>Chat</button>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded">
            <h2 className="text-lg md:text-xl mb-2 flex items-center text-white"><i className="fas fa-lightbulb mr-2"></i>Service Channel</h2>
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

        <section className="bg-gray-800 p-4 md:p-6 rounded mb-4" data-aos="zoom-in">
          <h2 className="text-xl md:text-2xl mb-4 text-white"><i className="fas fa-users mr-2"></i>Members</h2>
          <div className="flex flex-wrap gap-2 md:gap-4">
            {[
              { name: 'Dispatcher', email: 'dispatcher@example.com', phone: '123-456-7890', image: './images/dispatch.jpeg', bgColor: 'bg-red-500' },
              { name: 'Purchasing Department', email: 'purchasing@example.com', phone: '123-456-7891', image: './images/purchasing.png', bgColor: 'bg-green-500' },
              { name: 'Area Manager', email: 'areamanager@example.com', phone: '123-456-7892', image: './images/area.jpg', bgColor: 'bg-blue-500' },
              { name: 'Team Supervisor', email: 'teamsupervisor@example.com', phone: '123-456-7893', image: 'https://via.placeholder.com/150?text=Team+Supervisor', bgColor: 'bg-yellow-500' },
              { name: 'Vendor Relations', email: 'vendorrelations@example.com', phone: '123-456-7894', image: 'https://via.placeholder.com/150?text=Vendor+Relations', bgColor: 'bg-purple-500' },
              { name: 'Team Chat', email: 'teams@example.com', phone: '123-456-7894', image: 'https://via.placeholder.com/150?text=Team+Chat', bgColor: 'bg-pink-500' },
              { name: 'Human Resources', email: 'hr@example.com', phone: '123-456-7894', image: 'https://via.placeholder.com/150?text=Human+Resources', bgColor: 'bg-teal-500' },
              { name: 'IT Support', email: 'itsupport@example.com', phone: '123-456-7895', image: 'https://via.placeholder.com/150?text=IT+Support', bgColor: 'bg-orange-500' },
              { name: 'Operations Manager', email: 'operations@example.com', phone: '123-456-7896', image: 'https://via.placeholder.com/150?text=Operations+Manager', bgColor: 'bg-indigo-500' },
            ].map((member) => (
              <button key={member.name} className={`${member.bgColor} p-2 md:p-4 rounded text-left`} onClick={() => setSelectedMember(member)}>
                <span className="text-white">{member.name}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="bg-gray-800 p-4 md:p-2 md:h-80 rounded" data-aos="zoom-in">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl md:text-2xl text-white">TechTrack</h2>
            <div className="text-lg md:text-xl text-white">
              <span>Track: {username}</span>
            </div>
          </div>
          <div className="p-5 rounded h-80 w-full">
            <Chart options={{
              chart: {
                type: 'bar',
                height: 350,
                toolbar: {
                  show: true,
                  tools: {
                    download: true,
                    selection: true,
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: true,
                    reset: true
                  },
                },
                foreColor: '#000'
              },
              plotOptions: {
                bar: {
                  horizontal: false,
                  columnWidth: '55%',
                  colors: {
                    backgroundBarOpacity: 1,
                  }
                }
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
              },
              xaxis: {
                categories: ['Completed', 'Pending', 'Needs Attention', 'In Progress', 'Delayed', 'Cancelled', 'On Hold'],
                labels: {
                  style: {
                    colors: '#ffffff'
                  }
                }
              },
              yaxis: {
                title: {
                  text: 'Tasks',
                  style: {
                    color: '#ffffff'
                  }
                },
                labels: {
                  style: {
                    colors: '#ffffff'
                  }
                }
              },
              fill: {
                opacity: 1,
                colors: ['#FFC1CC', '#C1FFC1', '#C1D9FF', '#FFF1C1', '#D1C1FF', '#FFC1F1', '#C1FFF1']
              },
              tooltip: {
                theme: 'dark',
                y: {
                  formatter: function (val) {
                    return val.toString();
                  }
                }
              },
              legend: {
                position: 'top',
                horizontalAlign: 'center',
                labels: {
                  colors: '#ffffff'
                }
              }
            }} series={[
              {
                name: 'Tasks',
                data: [44, 55, 41, 37, 22, 43, 26]
              }
            ]} type="bar" width="100%" height="100%" className='w-full h-full' />
          </div>
        </section>
      </main>

      {selectedMember && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50" data-aos="zoom-in">
          <div className="bg-gray-800 p-6 rounded-lg text-white w-80 md:w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg md:text-xl font-semibold text-white">{selectedMember.name}</h2>
              <button className="text-gray-500 hover:text-white" onClick={() => setSelectedMember(null)}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="mb-4">
              <img src={selectedMember.image} alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-4" />
              <p className="text-white">Email: {selectedMember.email}</p>
              <p className="text-white">Phone: {selectedMember.phone}</p>
            </div>
            <div>
              <textarea className="w-full p-2 border border-gray-700 bg-gray-700 rounded-lg text-white" rows={3} placeholder="Send a message"></textarea>
              <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg">Send</button>
            </div>
          </div>
        </div>
      )}

      <div className={`fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 ${isChatModalOpen ? 'block' : 'hidden'}`}>
        <div className="bg-gray-800 p-6 rounded-lg text-white w-80 md:w-96">
          <button className="text-gray-500 hover:text-white" onClick={() => setIsChatModalOpen(false)}>Close</button>
          {/* Chat modal content */}
        </div>
      </div>

      <div className={`fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 ${isIvrModalOpen ? 'block' : 'hidden'}`}>
        <div className="bg-gray-800 p-6 rounded-lg text-white w-80 md:w-96">
          <button className="text-gray-500 hover:text-white" onClick={() => setIsIvrModalOpen(false)}>Close</button>
          {/* IVR modal content */}
        </div>
      </div>
    </div>
  );
};

export default Home;
