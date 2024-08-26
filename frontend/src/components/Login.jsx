import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', formData);
      localStorage.setItem('token', res.data.token);

      // Redirect based on user role
      if (res.data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/home');
      }
    } catch (err) {
      console.error(err.response.data);
      if (err.response && err.response.data.message === 'User not found') {
        setError('No account found with this email');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side with the form */}
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Sign in to your account
          </h2>
          <form className="mt-8 space-y-6" onSubmit={onSubmit}>
            {error && (
              <div className="text-red-500 text-sm mb-4 text-center">
                {error}
              </div>
            )}
            <div className="space-y-4">
              <div>
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={onChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={onChange}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
            <div className="text-sm text-center mt-4">
              Don't have an account?{' '}
              <button
                type="button"
                className="text-indigo-600 hover:text-indigo-500"
                onClick={() => navigate('/register')}
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right side with the image */}
      <div className="flex-1 bg-cover bg-center" style={{ backgroundImage: 'url(../images/vintage_book.png)' }}>
        {/* Optional additional content */}
      </div>
    </div>
  );
};

export default Login;
