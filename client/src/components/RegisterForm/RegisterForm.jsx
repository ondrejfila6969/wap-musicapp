import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [info, setInfo] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setInfo('');

    if (!formData.username || !formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      // Použití axios.post
      // Adresa tvého backendového API endpointu pro registraci
      const response = await axios.post('http://localhost:3000/api/auth/register', formData, { // Nahraď PORT portem tvého backendu
        headers: {
          'Content-Type': 'application/json',
        }
      });

      // S axios je odpověď přímo v response.data
      setInfo(response.data.message || 'Registration successful! You can now sign in.');
      setFormData({ username: '', email: '', password: '' });
      // Můžeš uživatele přesměrovat na přihlašovací stránku po krátké prodlevě
      // setTimeout(() => navigate('/signin'), 2000);

    } catch (err) {
      console.error('Registration error:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.request) {
        setError('No response from server. Please check your connection.');
      } else {
        setError('An error occurred during registration. Please try again.');
      }
    }
  };

  return (
    <div className="flex justify-left items-center sm:w-1/2 w-full px-4 pb-12 sm:pb-0">
      <div className="sonus-bg-linear-gradient bg-opacity-50 p-8 rounded-3xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-white mb-6">Register</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block mb-1 text-sm text-gray-300">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="w-full px-4 py-2 bg-[#2e2e2e] rounded-full focus:outline-none text-white"
              required
              value={formData.username}
              onChange={handleInput}
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 text-sm text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full px-4 py-2 bg-[#2e2e2e] rounded-full focus:outline-none text-white"
              required
              value={formData.email}
              onChange={handleInput}
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-sm text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full px-4 py-2 bg-[#2e2e2e] rounded-full focus:outline-none text-white"
              required
              value={formData.password}
              onChange={handleInput}
            />
          </div>

          {error && <p className="text-sm text-red-400 text-center">{error}</p>}
          {info && <p className="text-sm text-green-400 text-center">{info}</p>}

          <button
            type="submit"
            className="bg-gradient-to-r from-gray-900 to-green-900 rounded-full py-2 font-semibold text-white hover:opacity-90 transition cursor-pointer mt-2"
          >
            Register
          </button>

          <p className="text-sm text-center text-gray-300 mt-2">
            Do you already have an account?{" "}
            <Link to={"/signin"}>
              <span className="text-blue-400 underline hover:text-blue-300">Sign In</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;