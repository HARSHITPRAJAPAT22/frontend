import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePublish = async () => {
    if (!title || !content) {
      alert("Title and content cannot be empty!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not authenticated. Please log in.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog`, // ✅ Adjusted API endpoint
        { title, content,
            published : true
         },
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", response.data); // ✅ Log response

      if (response.status === 200 || response.status === 201) {
        alert("Blog Published Successfully!");
        navigate(`/blogs`);
      } else {
        alert("Failed to publish the blog.");
      }
    } catch (error: any) {
      console.error("Publish error:", error.response?.data);
      alert(
        `Error: ${error.response?.status} - ${
          error.response?.data?.message || "Something went wrong."
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-green-100 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-3xl border border-gray-200 transition-all hover:shadow-md">
        <input
          type="text"
          placeholder="Enter blog title..."
          className="w-full p-3 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mb-4 shadow-sm"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Write your thoughts here..."
          className="w-full h-60 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none mb-4 shadow-sm"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          onClick={handlePublish}
          disabled={loading}
          className={`w-full bg-blue-600 text-white p-3 rounded-lg text-lg font-semibold transition-all ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700 hover:scale-105"
          }`}
        >
          {loading ? "Publishing..." : "Publish"}
        </button>
      </div>
    </div>
  );
};
