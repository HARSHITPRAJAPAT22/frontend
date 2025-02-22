import { useState } from 'react';
import { BlogBar } from '../component/BlogBar';
import axios from 'axios';
import { BACKEND_URL } from '../config';

const AboutAuthor = () => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId"); // Retrieve user ID from localStorage

    if (!userId) {
      alert("User ID is missing. Please log in again.");
      return;
    }

    try {
      await axios.put(`${BACKEND_URL}/api/v1/user/about`, {
        userId,
        about: bio, // Send the bio from state
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Failed to update bio:", error);
      alert("Failed to update bio. Please try again later.");
    }
  };

  return (
    <div className="mt-20 p-10 w-1/2 mx-auto text-center bg-gray-100 rounded-lg shadow-lg">
      <BlogBar authorName={name} />
      <h1 className="text-2xl font-bold text-gray-800">About the Author</h1>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-5">
          <label className="text-lg font-semibold">
            Name:
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required
              className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <label className="text-lg font-semibold">
            Bio:
            <textarea 
              value={bio} 
              onChange={(e) => setBio(e.target.value)} 
              required
              className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 min-h-[100px]"
            />
          </label>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg text-lg font-medium hover:bg-blue-600 transition">
            Submit
          </button>
        </form>
      ) : (
        <div className="bg-white p-5 rounded-lg shadow-md mt-5">
          <h2 className="text-xl font-semibold text-blue-500">{name}</h2>
          <p className="text-gray-700 text-lg mt-2">{bio}</p>
        </div>
      )}
    </div>
  );
};

export default AboutAuthor;
