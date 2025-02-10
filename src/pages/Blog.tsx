import { useParams } from "react-router-dom";
import { BlogDetail } from "../component/BlogDetails";
import { useBlog } from "../hooks";
import { Skelton } from "../component/Skelton";

export const Blog = () => {
    const { id } = useParams(); // ✅ Get the blog ID from URL

    console.log("Blog ID from URL:", id); // Debugging: Check if ID is received

    if (!id) {
        return <div className="text-center text-red-500 mt-10">Error: Blog ID not found.</div>;
    }

    const { loading, blog } = useBlog({ id });

    if (loading) {
        return <div className="text-center text-gray-600 mt-10">Loading...</div>;
    }

    if (!blog) {
        return <div>
            <Skelton/>
        </div>;
    }

    return (
        <div>
            <BlogDetail blog={blog} />
        </div>
    );
};
