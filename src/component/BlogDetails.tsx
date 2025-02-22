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

  const [name, setName] = useState("Guest");

  useEffect(() => {
    setName(localStorage.getItem("userName") || "U");
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center px-4 py-10">
      {/* Blog Bar at the Top */}
      <BlogBar authorName={name} />

      {/* Blog Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl border border-gray-200 mt-14">
        
        {/* 📱 Small Screens - Flex Layout (Column) */}
        <div className="flex flex-col lg:hidden">
          {/* Author Info (Above Title in Small Screens) */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full">
              <span className="font-medium text-gray-700">
                {blog.author.name ? blog.author.name[0].toUpperCase() : "U"}
              </span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">{blog.author.name || "Unknown"}</span>
              <p className="text-xs text-gray-500 italic">{blog.author.about || "No bio available."}</p>
            </div>
          </div>

          {/* Blog Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{blog.title}</h2>

          {/* Publish Date */}
          <span className="block text-gray-400 text-sm mb-4">
            {new Date().toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>

          {/* Blog Content */}
          <p className="text-gray-600 text-base leading-relaxed">{blog.content}</p>
        </div>

        {/* 🖥️ Large Screens - Table Layout */}
        <table className="hidden lg:table w-full border-collapse border border-gray-300">
          <tbody>
            {/* Author Row */}
            <tr className="border border-gray-300">
              <td className="p-3 font-semibold text-gray-700">Author</td>
              <td className="p-3 flex items-center space-x-3">
                <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full">
                  <span className="font-medium text-gray-700">
                    {blog.author.name ? blog.author.name[0].toUpperCase() : "U"}
                  </span>
                </div>
                <span>{blog.author.name || "Unknown"}</span>
              </td>
            </tr>

            {/* Publish Date Row */}
            <tr className="border border-gray-300">
              <td className="p-3 font-semibold text-gray-700">Published On</td>
              <td className="p-3 text-gray-500">
                {new Date().toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </td>
            </tr>

            {/* Title Row */}
            <tr className="border border-gray-300">
              <td className="p-3 font-semibold text-gray-700">Title</td>
              <td className="p-3 font-bold text-gray-800">{blog.title}</td>
            </tr>

            {/* Content Row */}
            <tr className="border border-gray-300">
              <td className="p-3 font-semibold text-gray-700 align-top">Content</td>
              <td className="p-3 text-gray-600 text-base leading-relaxed">{blog.content}</td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
  );
};
