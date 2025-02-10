import { Link } from "react-router-dom";

export const Appbar = () => {
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-900">
            BlogSpace
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6">
            <Link to="/blogs" className="text-gray-600 hover:text-blue-900 font-medium transition">
              Blogs
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-900 font-medium transition">
              About
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-900 font-medium transition">
              Contact
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex space-x-4">
            <Link
              to="/signin"
              className="px-4 py-2 text-blue-900 font-semibold border border-blue-900 rounded-lg hover:bg-blue-900 hover:text-white transition"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
