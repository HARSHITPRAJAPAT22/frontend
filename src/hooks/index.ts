import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export interface Blog{
    "content": string,
    "title": string,
    "id": string,
    "author": {
        "name": string,
        "about" : string
    }
}
export const useBlog = ({ id }: { id: string }) => {
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);    
    const[about, setAbout] = useState("");

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const token = localStorage.getItem("token");
                console.log("Fetching blog with ID:", id);
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
                    headers: {
                        Authorization: token, // Attach the token
                    },
                });
                console.log("Blog fetched successfully:", response.data);
                setBlog(response.data);
                setAbout(response.data.user.about);
            } catch (error) {
                console.error("Error fetching blog:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchBlog();
    }, [id]);

    return { loading, blog,
        about
     };
};
export const useBlogs = ()=>{
    const[loading, setLoading] = useState(true);
    const[blogs, setBlogs] = useState<Blog[]>([]);
    const[ids, setIds] = useState();

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers :{
                Authorization : localStorage.getItem("token")
            }
        })
        .then(response=>{
            setBlogs(response.data);
            setIds(response.data.id);
            setLoading(false);
        })
        .catch((err)=>{
            alert("unable to load blogs");
            console.error(err);
        })
    }, []);

    return {
        loading,
        blogs,
        ids
    }
}