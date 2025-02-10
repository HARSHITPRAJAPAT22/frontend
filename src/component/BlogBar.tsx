import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export const BlogBar = ({ authorName }: { authorName: string | null }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Blog Title */}
        <Link to="/" className="text-2xl font-bold text-blue-900">
          BlogSpace
        </Link>

        {/* Author Section */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center space-x-2 focus:outline-none"
            aria-label="Open user menu"
          >
            {/* Avatar */}
            <div className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white font-bold rounded-full">
              {avatarLetter}
            </div>
          </button>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 shadow-lg rounded-md py-2">
              <p className="px-4 py-2 text-gray-700 text-sm font-semibold">{displayName}</p>
              <hr />
              <button className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 text-sm">
                Profile
              </button>
              <Link  to="/publish"  className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-200 hover:shadow-md hover:border-gray-400 border-transparent text-sm  transition-all block">
              Publish
              </Link>

              <Link  to="/signin" onClick={()=>{
                localStorage.removeItem("token");
              }} className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-200 hover:shadow-md hover:border-gray-400 border-transparent text-sm  transition-all block">
              Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
