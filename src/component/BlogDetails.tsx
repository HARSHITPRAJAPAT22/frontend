import { useEffect, useState } from "react";
import { Blog } from "../hooks";
import { BlogBar } from "./BlogBar";
import { Skelton } from "./Skelton";


export const BlogDetail = ({ blog }: { blog: Blog }) => {
  if (!blog) {
    return (
      <div>
        <Skelton />
      </div>
    );
  }
  const[name, setName] = useState("Guest");
  useEffect(()=>{
    setName(localStorage.getItem('userName') ||"U");
  }, []);
 
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center px-4 py-10">
      
      {/* Blog Bar at the Top */}
      <BlogBar authorName={name} />

      {/* Blog Card Below the Bar */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl border border-gray-200 flex mt-14">
        
        {/* Left Side - Blog Content */}
        <div className="flex-1 pr-6">
          {/* Blog Title */}
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{blog.title}</h2>

          {/* Publish Date */}
          <span className="block text-gray-400 text-sm mb-4">
                {new Date(new Date()).toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          })}
           </span>

          {/* Blog Content */}
          <p className="text-gray-600 text-lg leading-relaxed">{blog.content}</p>
        </div>

        {/* Right Side - Author Info */}
        <div className="w-40 flex flex-col items-center text-gray-500 text-sm border-l border-gray-300 pl-4">
          {/* Avatar */}
          <div className="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-200 rounded-full">
            <span className="font-medium text-gray-700">
              {blog.author.name ? blog.author.name[0].toUpperCase() : "U"}
            </span>
          </div>

          {/* Author Name */}
          <span className="font-semibold text-gray-700 mt-2">{blog.author.name || "Unknown"}</span>

          {/* Author Bio */}
          <p className="text-xs text-gray-500 mt-2 italic text-center">
            {blog.author.about}
          </p>
        </div>

      </div>
    </div>
  );
};
