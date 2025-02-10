import { BlogCard } from "../component/BlogCrad";
import { BlogBar } from "../component/BlogBar";
import { Skelton } from "../component/Skelton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return <div>
        <Skelton/>
    </div>
  }

  return (

    <div className="bg-gray-100 min-h-screen">
        
      {/* Blog Bar (Show only if blogs exist) */}
      {blogs.length > 0 && <BlogBar authorName={blogs[0]?.author?.name || "Unknown"} />}

      {/* Blog Content */}
      <div className="pt-20 flex flex-col items-center">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogCard
              id={blog.id}
              key={blog.id}
              authorName={blog.author?.name || "Unknown"}
              title={blog.title}
              content={blog.content}
              publishDate={blog.publishDate || "N/A"}
            />
          ))
        ) : (
          <p className="text-gray-500 text-lg">No blogs found.</p>
        )}
      </div>

    </div>
  );
};
