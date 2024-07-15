import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface LoginProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [role, setRole] = useState('');


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await axios.post('https://server-alpha-rose.vercel.app/login', { username, pin, role });
      if (result.status === 200) {

        console.log('User successfully authenticated', result.data.usernames, result.data.role);
        localStorage.setItem('username', username);
        localStorage.setItem('role', role);
        setIsAuthenticated(true);
        setRole(result.data.role);
        navigate('/');
      } else {
        setError('Incorrect PIN. Please try again.');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.error || 'Login error. Please try again.';
        setError(errorMessage);
      } else {
        setError('Login error. Please try again.');
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 text-white p-8 rounded shadow-lg w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-2xl font-bold text-center">Technician Login</h1>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="space-y-1">
            <label htmlFor="username" className="block text-sm font-medium">Username</label>
            <input
              type="text"
              id="username"
              className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1 relative">
            <label htmlFor="pin" className="block text-sm font-medium">4-Digit PIN</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="pin"
              className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              maxLength={4}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-sm text-blue-500 hover:underline"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 rounded font-medium"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </div>
          <p className="text-center">Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Sign Up</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;