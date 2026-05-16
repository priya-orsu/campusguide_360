import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Login = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student'
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const handleInputChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (error) setError('');
  };

  const handleLogin = async (e) => {

    e.preventDefault();

    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {

      const response = await fetch(`${API_URL}/api/auth/login`,
        {      
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {

        localStorage.setItem('token', data.token);

        localStorage.setItem(
          'user',
          JSON.stringify({
            ...data.user,
            role: formData.role
          })
        );

        if (formData.role === 'student') {
          navigate('/student-dashboard');
        }
        else if (formData.role === 'teacher') {
          navigate('/teacher-dashboard');
        }
        else {
          navigate('/parent-dashboard');
        }

      } else {

        setError(data.message || 'Invalid Credentials');

      }

    } catch (err) {

      console.error(err);

      setError('Network error. Please try again.');

    } finally {

      setIsLoading(false);

    }
  };

  return (

    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">

      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">

        <div className="text-center mb-8">

          <h2 className="text-3xl font-extrabold text-gray-900">
            Login to Campus Guide 360
          </h2>

          <p className="mt-2 text-sm text-gray-600">
            Welcome back! Please sign in to your account
          </p>

        </div>

        {error && (

          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">

            {error}

          </div>

        )}

        <form
          className="space-y-5"
          onSubmit={handleLogin}
        >

          {/* Email */}

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              disabled={isLoading}
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />

          </div>

          {/* Password */}

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              disabled={isLoading}
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />

          </div>

          {/* Role */}

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Role
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              disabled={isLoading}
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >

              <option value="student">
                Student
              </option>

              <option value="teacher">
                Teacher
              </option>

              <option value="parent">
                Parent
              </option>

            </select>

          </div>

          {/* Submit Button */}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >

            {isLoading ? (

              <>

                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >

                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />

                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 
                    0 0 5.373 0 12h4zm2 
                    5.291A7.962 7.962 0 
                    014 12H0c0 3.042 
                    1.135 5.824 3 7.938l3-2.647z"
                  />

                </svg>

                Signing in...

              </>

            ) : (

              'Login'

            )}

          </button>

        </form>

        {/* Register Link */}

        <div className="mt-6 text-center">

          <p className="text-sm text-gray-600">

            Don't have an account?{' '}

            <Link
              to="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Register here
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;