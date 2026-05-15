import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const token = localStorage.getItem('token');

  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    navigate('/login');
  };

  const scrollToSection = (sectionId) => {

    setIsMenuOpen(false);

    if (location.pathname !== '/') {

      navigate('/');

      setTimeout(() => {

        const element = document.getElementById(sectionId);

        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }

      }, 100);

    } else {

      const element = document.getElementById(sectionId);

      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const getDashboardLink = () => {

    if (!user) return null;

    switch (user.role) {

      case 'student':
        return (
          <Link
            to="/student-dashboard"
            className="nav-link"
          >
            Dashboard
          </Link>
        );

      case 'teacher':
        return (
          <Link
            to="/teacher-dashboard"
            className="nav-link"
          >
            Dashboard
          </Link>
        );

      case 'parent':
        return (
          <Link
            to="/parent-dashboard"
            className="nav-link"
          >
            Dashboard
          </Link>
        );

      default:
        return null;
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">

      <div className="max-w-7xl mx-auto px-4">

        <div className="flex justify-between items-center h-16">

          <div className="flex items-center gap-8">

            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              Campus Guide 360
            </Link>

            <div className="hidden md:flex gap-6">

              <Link to="/" className="nav-link">
                Home
              </Link>

              <button
                onClick={() => scrollToSection('features')}
                className="nav-link"
              >
                Features
              </button>

              <button
                onClick={() => scrollToSection('about')}
                className="nav-link"
              >
                About
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className="nav-link"
              >
                Contact
              </button>

            </div>

          </div>

          <div className="hidden md:flex items-center gap-5">

            {token ? (
              <>

                {getDashboardLink()}

                <span className="text-gray-700">
                  Welcome, {user?.name}
                </span>

                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Logout
                </button>

              </>
            ) : (
              <>

                <Link to="/login" className="nav-link">
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded"
                >
                  Register
                </Link>

              </>
            )}

          </div>

          {/* Mobile Menu Button */}

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>

        </div>

      </div>

      {/* Mobile Menu */}

      {isMenuOpen && (

        <div className="md:hidden bg-white border-t p-4 space-y-4">

          <Link to="/" className="block">
            Home
          </Link>

          <button
            onClick={() => scrollToSection('features')}
            className="block"
          >
            Features
          </button>

          <button
            onClick={() => scrollToSection('about')}
            className="block"
          >
            About
          </button>

          <button
            onClick={() => scrollToSection('contact')}
            className="block"
          >
            Contact
          </button>

          {token ? (
            <>

              {getDashboardLink()}

              <button
                onClick={handleLogout}
                className="w-full bg-red-600 text-white p-2 rounded"
              >
                Logout
              </button>

            </>
          ) : (
            <>

              <Link to="/login" className="block">
                Login
              </Link>

              <Link to="/register" className="block">
                Register
              </Link>

            </>
          )}

        </div>
      )}

    </nav>
  );
};

export default Navbar;