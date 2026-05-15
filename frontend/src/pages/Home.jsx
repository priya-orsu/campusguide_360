import { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  // Check login status
  const isLoggedIn = !!localStorage.getItem('token');

  const [activeSection, setActiveSection] = useState('home');

  const [showPopup, setShowPopup] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const scrollToSection = (sectionId) => {

    setActiveSection(sectionId);

    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  const handleInputChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    console.log(formData);

    const phoneNumber = '+919515179732';

    const whatsappMessage =
      `New contact message from Campus Guide 360:%0A%0A` +
      `Name: ${formData.name}%0A` +
      `Email: ${formData.email}%0A` +
      `Message: ${formData.message}`;

    const whatsappUrl =
      `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

    window.open(whatsappUrl, '_blank');

    setShowPopup(true);

    setFormData({
      name: '',
      email: '',
      message: ''
    });

    setTimeout(() => {
      setShowPopup(false);
    }, 5000);
  };

  // Dashboard Link Function
  const getDashboardLink = () => {

    if (!user) return '/login';

    switch (user.role) {

      case 'student':
        return '/student-dashboard';

      case 'teacher':
        return '/teacher-dashboard';

      case 'parent':
        return '/parent-dashboard';

      default:
        return '/login';
    }
  };

  return (

    <div className="min-h-screen overflow-x-hidden bg-white">

      {/* Popup */}

      {showPopup && (

        <div className="fixed top-5 right-5 z-50">

          <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3">

            <span>
              Message sent successfully!
            </span>

            <button
              onClick={() => setShowPopup(false)}
            >
              ✕
            </button>

          </div>

        </div>
      )}

      {/* Hero Section */}

      <section
        id="home"
        className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white py-24"
      >

        <div className="container mx-auto px-4">

          <div className="flex flex-col md:flex-row items-center">

            <div className="md:w-1/2 mb-10">

              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">

                Transforming Education Through

                <span className="text-yellow-300">
                  {' '}Digital Innovation
                </span>

              </h1>

              <p className="text-xl mb-8 opacity-90">

                Campus Guide 360 connects students,
                parents and teachers in a single platform.

              </p>

              {!isLoggedIn ? (

                <div className="flex flex-wrap gap-4">

                  <Link
                    to="/register"
                    className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg"
                  >
                    Get Started
                  </Link>

                  <button
                    onClick={() => scrollToSection('about')}
                    className="border-2 border-white py-3 px-8 rounded-lg"
                  >
                    Learn More
                  </button>

                </div>

              ) : (

                <Link
                  to={getDashboardLink()}
                  className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg inline-block"
                >
                  Go To Dashboard
                </Link>

              )}

            </div>

            <div className="md:w-1/2">

              <img
                src="https://images.unsplash.com/photo-1522881193457-37ae97c905bf"
                alt="Campus"
                className="rounded-2xl shadow-2xl"
              />

            </div>

          </div>

        </div>

      </section>

      {/* Features */}

      <section
        id="features"
        className="py-20 bg-gray-50"
      >

        <div className="container mx-auto px-4">

          <div className="text-center mb-16">

            <h2 className="text-4xl font-bold text-gray-800 mb-4">

              Powerful Features

            </h2>

            <p className="text-xl text-gray-600">

              Tailored dashboards for students,
              parents and teachers.

            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {/* Student */}

            <div className="bg-white p-8 rounded-2xl shadow-lg">

              <div className="text-5xl mb-5">
                🎓
              </div>

              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                Student Dashboard
              </h3>

              <ul className="space-y-2 text-gray-600">

                <li>✓ View Marks</li>
                <li>✓ Semester Results</li>
                <li>✓ Timetable PDFs</li>
                <li>✓ Performance Tracking</li>

              </ul>

            </div>

            {/* Teacher */}

            <div className="bg-white p-8 rounded-2xl shadow-lg">

              <div className="text-5xl mb-5">
                👨‍🏫
              </div>

              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                Teacher Dashboard
              </h3>

              <ul className="space-y-2 text-gray-600">

                <li>✓ Add Student Marks</li>
                <li>✓ Upload Timetables</li>
                <li>✓ Manage Students</li>
                <li>✓ View Analytics</li>

              </ul>

            </div>

            {/* Parent */}

            <div className="bg-white p-8 rounded-2xl shadow-lg">

              <div className="text-5xl mb-5">
                👨‍👩‍👧
              </div>

              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                Parent Dashboard
              </h3>

              <ul className="space-y-2 text-gray-600">

                <li>✓ Child Performance</li>
                <li>✓ Semester Results</li>
                <li>✓ Academic Monitoring</li>
                <li>✓ Student Progress</li>

              </ul>

            </div>

          </div>

        </div>

      </section>

      {/* About */}

      <section
        id="about"
        className="py-20 bg-white"
      >

        <div className="container mx-auto px-4">

          <div className="grid md:grid-cols-2 gap-10 items-center">

            <div>

              <h2 className="text-4xl font-bold text-gray-800 mb-6">

                About Campus Guide 360

              </h2>

              <p className="text-lg text-gray-600 mb-5">

                Campus Guide 360 is a complete educational management platform
                for students, parents and teachers.

              </p>

              <p className="text-lg text-gray-600">

                It improves communication, academic tracking,
                and timetable management inside institutions.

              </p>

            </div>

            <img
              src="https://images.unsplash.com/photo-1523580494863-6f3031224c94"
              alt="About"
              className="rounded-2xl shadow-xl"
            />

          </div>

        </div>

      </section>

      {/* Contact */}

      <section
        id="contact"
        className="py-20 bg-gray-100"
      >

        <div className="container mx-auto px-4">

          <div className="text-center mb-12">

            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Contact Us
            </h2>

          </div>

          <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
                required
              />

              <textarea
                rows="5"
                name="message"
                placeholder="Enter Message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
                required
              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Home;