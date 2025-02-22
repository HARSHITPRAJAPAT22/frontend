import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const PublishBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [authorName, setAuthorName] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("No token found. User not authenticated.");
          return;
        }

        const response = await axios.get(`${BACKEND_URL}/api/v1/blog`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserId(response.data.id);
        setAuthorName(response.data.name || "Unknown"); // Fallback if name is missing
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    setUserId(null);
    setAuthorName(null);
    navigate("/signin"); // Redirect to login page
  };

  // Ensure a valid author name
  const displayName = authorName?.trim() || "Unknown";
  const avatarLetter = displayName[0]?.toUpperCase() || "U";

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md p-4 border-b border-gray-200 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4">
        
        {/* Blog Title */}
        <Link to="/" className="text-2xl font-bold text-blue-900 hover:text-blue-700 transition">
          BlogSpace
        </Link>

        {/* Right Section (Publish Button + User Menu) */}
        <div className="flex items-center space-x-6">
          {/* User Avatar & Dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center space-x-2 focus:outline-none"
              aria-label="Open user menu"
            >
              {/* Avatar */}
              <div className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white font-bold rounded-full text-lg">
                {avatarLetter}
              </div>
            </button>

            {/* Dropdown Menu */}
            {menuOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-300 shadow-lg rounded-lg py-2">
                <p className="px-4 py-2 text-gray-700 text-sm font-semibold">{displayName}</p>
                <hr />
                <button
                  onClick={() => navigate(`/profile/${userId}`)}
                  className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 text-sm"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 text-sm"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
