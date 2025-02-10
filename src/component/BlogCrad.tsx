import { useNavigate } from "react-router-dom";

interface BlogCardProps {
    id: string;
    authorName: string;
    title: string;
    content: string;
    publishDate: string;
}

export const BlogCard = ({ id, authorName, title, content, publishDate }: BlogCardProps) => {
    const navigate = useNavigate();

    return (
        <div
            id={id}
            className="bg-white shadow-lg rounded-lg p-6 m-4 w-full max-w-3xl border border-gray-200 transition-transform transform hover:scale-105 mx-auto cursor-pointer"
            onClick={() => {
                console.log("Navigating to Blog ID:", id); // Debugging: Check navigation ID
                navigate(`/blog/${id}`);
            }}
        >
            {/* Author Info */}
            <div className="text-gray-500 text-sm flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 font-medium text-lg">
                        {authorName[0].toUpperCase()}
                    </div>
                    <span className="font-semibold text-gray-700">{authorName}</span>
                </div>
                <span className="text-gray-400">
                    {new Date(publishDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    })}
                </span>
            </div>

            {/* Blog Title */}
            <h2 className="text-2xl font-bold text-gray-800 mb-3">{title}</h2>

            {/* Blog Content */}
            <p className="text-gray-600 text-sm mb-4">
                {content.slice(0, 150) + "..."}
            </p>
        </div>
    );
};
