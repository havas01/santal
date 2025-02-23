import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Post from "./Post";
import { useLocation } from "react-router";
import axiosInstance from "../assets/Axios";

const Posts = () => {
    const location = useLocation();
    let city = new URLSearchParams(location.search).get("city") || "";
    city = city.charAt(0).toUpperCase() + city.slice(1);

    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);

    const fetchPosts = async () => {
        try {
            setPosts((await axiosInstance.get("/posts", { params: { city } })).data);
        } catch (error) {
            console.error("Error fetching posts", error);
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setSelectedPost(null);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div className="relative">

            <button
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => navigate("/")}>
                Dashboard
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {posts.map((ele, index) => (
                    <div key={index} onClick={() => setSelectedPost(ele)}>
                        <Post details={ele} />
                    </div>
                ))}
            </div>

            {selectedPost && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    onClick={() => setSelectedPost(null)}
                >
                    <div
                        className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full relative scale-110"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
                            onClick={() => setSelectedPost(null)}
                        >
                            ✖
                        </button>
                        <Post details={selectedPost} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Posts;
