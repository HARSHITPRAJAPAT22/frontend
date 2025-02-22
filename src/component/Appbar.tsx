import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Icons for mobile menu

export const Appbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-900">
            BlogSpace
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Desktop Navigation */}
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

          {/* Desktop Auth Buttons */}
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

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-16 left-0 w-full bg-white shadow-md transition-all duration-300 ${
          mobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <Link to="/blogs" className="block px-6 py-3 text-gray-700 hover:bg-gray-100">
          Blogs
        </Link>
        <Link to="/about" className="block px-6 py-3 text-gray-700 hover:bg-gray-100">
          About
        </Link>
        <Link to="/contact" className="block px-6 py-3 text-gray-700 hover:bg-gray-100">
          Contact
        </Link>
        <hr />
        <Link
          to="/signin"
          className="block px-6 py-3 text-blue-900 font-semibold border-t border-gray-200 hover:bg-gray-100 transition"
        >
          Sign In
        </Link>
        <Link
          to="/signup"
          className="block px-6 py-3 bg-blue-900 text-white font-semibold hover:bg-blue-700 transition"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
};
