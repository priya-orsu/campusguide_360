import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUsers
} from 'react-icons/fa';

const Register = () => {

  const [selectedRole, setSelectedRole] = useState('student');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    studentId: '',
    department: '',
    mobile: '',
    parentPhone: ''
  });

  const [error, setError] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Handle Input Change

  const handleInputChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (error) setError('');
  };

  // Form Validation

  const validateForm = () => {

    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }

    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      setError('Enter a valid email');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (selectedRole === 'student') {

      if (!formData.studentId.trim()) {
        setError('Student ID is required');
        return false;
      }

      if (!formData.department.trim()) {
        setError('Department is required');
        return false;
      }

      if (!formData.parentPhone.trim()) {
        setError('Parent mobile number is required');
        return false;
      }

      if (!formData.mobile.trim()) {
        setError('Student mobile number is required');
        return false;
      }
    }

    if (selectedRole === 'teacher') {

      if (!formData.department.trim()) {
        setError('Department is required');
        return false;
      }
    }

    if (selectedRole === 'parent') {

      if (!formData.mobile.trim()) {
        setError('Mobile number is required');
        return false;
      }
    }

    return true;
  };

  // Submit Form

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {

      let userData = {
        role: selectedRole,
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password
      };

      // Student Data

      if (selectedRole === 'student') {

        userData.student_id = formData.studentId.trim();

        userData.department = formData.department.trim();

        userData.parent_mobile = formData.parentPhone.trim();

        userData.mobile = formData.mobile.trim();
      }

      // Teacher Data

      if (selectedRole === 'teacher') {

        userData.department = formData.department.trim();
      }

      // Parent Data

      if (selectedRole === 'parent') {

        userData.mobile = formData.mobile.trim();
      }

      const response = await fetch(
        'http://localhost:5000/api/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();

      if (response.ok) {

        navigate('/login');

      } else {

        setError(
          data.message ||
          data.error ||
          'Registration failed'
        );
      }

    } catch (err) {

      console.error(err);

      setError('Network error. Please try again.');

    } finally {

      setIsLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">

        {/* Header */}

        <div className="text-center mb-8">

          <h2 className="text-3xl font-extrabold text-gray-900">
            Register for Campus Guide 360
          </h2>

          <p className="mt-2 text-sm text-gray-600">
            Create your account to continue
          </p>

        </div>

        {/* Error */}

        {error && (

          <div className="mb-4 px-4 py-3 rounded bg-red-100 border border-red-400 text-red-700">

            {error}

          </div>
        )}

        {/* Role Selection */}

        <div className="mb-6">

          <label className="block text-sm font-medium text-gray-700 mb-3">

            I am a:

          </label>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Student */}

            <button
              type="button"
              onClick={() => setSelectedRole('student')}
              className={`p-4 rounded-lg border transition-all duration-300 ${
                selectedRole === 'student'
                  ? 'bg-indigo-100 border-indigo-500 shadow-md'
                  : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
              }`}
            >

              <div className="flex flex-col items-center">

                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                  selectedRole === 'student'
                    ? 'bg-indigo-600'
                    : 'bg-gray-400'
                }`}>

                  <FaUserGraduate className="text-white text-xl" />

                </div>

                <span className="font-medium text-gray-700">
                  Student
                </span>

              </div>

            </button>

            {/* Parent */}

            <button
              type="button"
              onClick={() => setSelectedRole('parent')}
              className={`p-4 rounded-lg border transition-all duration-300 ${
                selectedRole === 'parent'
                  ? 'bg-indigo-100 border-indigo-500 shadow-md'
                  : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
              }`}
            >

              <div className="flex flex-col items-center">

                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                  selectedRole === 'parent'
                    ? 'bg-indigo-600'
                    : 'bg-gray-400'
                }`}>

                  <FaUsers className="text-white text-xl" />

                </div>

                <span className="font-medium text-gray-700">
                  Parent
                </span>

              </div>

            </button>

            {/* Teacher */}

            <button
              type="button"
              onClick={() => setSelectedRole('teacher')}
              className={`p-4 rounded-lg border transition-all duration-300 ${
                selectedRole === 'teacher'
                  ? 'bg-indigo-100 border-indigo-500 shadow-md'
                  : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
              }`}
            >

              <div className="flex flex-col items-center">

                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                  selectedRole === 'teacher'
                    ? 'bg-indigo-600'
                    : 'bg-gray-400'
                }`}>

                  <FaChalkboardTeacher className="text-white text-xl" />

                </div>

                <span className="font-medium text-gray-700">
                  Teacher
                </span>

              </div>

            </button>

          </div>

        </div>

        {/* Form */}

        <form
          className="space-y-4"
          onSubmit={handleSubmit}
        >

          {/* Full Name */}

          <div>

            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name *
            </label>

            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              disabled={isLoading}
            />

          </div>

          {/* Email */}

          <div>

            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address *
            </label>

            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              disabled={isLoading}
            />

          </div>

          {/* Student Fields */}

          {selectedRole === 'student' && (

            <>

              <div>

                <label
                  htmlFor="studentId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Student ID *
                </label>

                <input
                  type="text"
                  id="studentId"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                  disabled={isLoading}
                />

              </div>

              <div>

                <label
                  htmlFor="department"
                  className="block text-sm font-medium text-gray-700"
                >
                  Department *
                </label>

                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                  disabled={isLoading}
                >

                  <option value="">
                    Select Department
                  </option>

                  <option value="CSE">CSE</option>

                  <option value="ECE">ECE</option>

                  <option value="IT">IT</option>

                  <option value="AIML">AIML</option>

                  <option value="DS">DS</option>

                </select>

              </div>

              <div>

                <label
                  htmlFor="parentPhone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Parent Mobile Number *
                </label>

                <input
                  type="tel"
                  id="parentPhone"
                  name="parentPhone"
                  value={formData.parentPhone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                  disabled={isLoading}
                />

              </div>

              <div>

                <label
                  htmlFor="mobile"
                  className="block text-sm font-medium text-gray-700"
                >
                  Student Mobile Number *
                </label>

                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                  disabled={isLoading}
                />

              </div>

            </>
          )}

          {/* Teacher Fields */}

          {selectedRole === 'teacher' && (

            <div>

              <label
                htmlFor="department"
                className="block text-sm font-medium text-gray-700"
              >
                Department *
              </label>

              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
                disabled={isLoading}
              >

                <option value="">
                  Select Department
                </option>

                <option value="CSE">CSE</option>

                <option value="ECE">ECE</option>

                <option value="IT">IT</option>

                <option value="AIML">AIML</option>

                <option value="DS">DS</option>

              </select>

            </div>
          )}

          {/* Parent Fields */}

          {selectedRole === 'parent' && (

            <div>

              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-gray-700"
              >
                Mobile Number *
              </label>

              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
                disabled={isLoading}
              />

            </div>
          )}

          {/* Passwords */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>

              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password *
              </label>

              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
                disabled={isLoading}
              />

            </div>

            <div>

              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password *
              </label>

              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
                disabled={isLoading}
              />

            </div>

          </div>

          {/* Submit */}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >

            {isLoading
              ? 'Creating Account...'
              : 'Create Account'}

          </button>

        </form>

        {/* Login Link */}

        <div className="mt-6 text-center">

          <p className="text-sm text-gray-600">

            Already have an account?{' '}

            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Login here
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Register;