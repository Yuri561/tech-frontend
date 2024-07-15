/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('technician'); // Default role
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (pin !== confirmPin) {
      setError('PIN and Confirm PIN do not match.');
      setLoading(false);
      return;
    }
    try {
      const result = await axios.post('https://server-alpha-rose.vercel.app/register', { username, email, role, pin });
      if (result.status === 201) {
        console.log('User successfully created');
        navigate('/login');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || 'An error occurred during registration.');
      } else {
        setError('Registration error. Please try again.');
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 text-white p-8 rounded shadow-lg w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-6" method='POST'>
          <h1 className="text-2xl font-bold text-center">Technician Register</h1>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              type="text"
              id="email"
              className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
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
          <div className="space-y-1 relative">
            <label htmlFor="confirmPin" className="block text-sm font-medium">Confirm PIN</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="confirmPin"
              className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded focus:ring-blue-500 focus:border-blue-500"
              placeholder="Confirm your PIN"
              value={confirmPin}
              onChange={(e) => setConfirmPin(e.target.value)}
              maxLength={4}
              required
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="role" className="block text-sm font-medium">Role</label>
            <select
              id="role"
              className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded focus:ring-blue-500 focus:border-blue-500"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="technician">Technician</option>
              <option value="admin">Admin</option>
              <option value="admin">Help Desk</option>
              <option value="office">Office Staff</option>
              <option value="manager">Manager</option>
              <option value="dispatcher">Dispatcher</option>
              <option value="customer">Customer</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 rounded font-medium"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Sign up'}
            </button>
          </div>
          <p className="text-center">Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Log in</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Register;
