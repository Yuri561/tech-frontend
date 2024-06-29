
import React from 'react';

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
}

interface WelcomeSectionProps {
  username: string;
  isClockedIn: boolean;
  elapsedTime: number;
  formatElapsedTime: (seconds: number) => string;
  weather: WeatherData | null;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ username, isClockedIn, elapsedTime, formatElapsedTime, weather }) => {
  return (
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
  );
};

export default WelcomeSection;
