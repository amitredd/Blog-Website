import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SingleBlog() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = useState({ title: "", thumbnail: "", description: "" });

  useEffect(() => {
    const fetchSingleBlog = async () => {
      try {
        const res = await axios.get(`https://blog-quv1.onrender.com/api/v1/get/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setBlog(res.data);
      } catch (error) {
        // Handle error or set a default state for blog if no data is retrieved
        console.error("Error fetching blog:", error);
        setBlog({ title: "Blog Not Found", thumbnail: "", description: "The blog you are looking for does not exist." });
      }
    };
    fetchSingleBlog();
  }, [id]);

  return (
    <div className="container my-5">
      <div className="card shadow">
        <img src={`https://blog-quv1.onrender.com/${blog.thumbnail}`} className="card-img-top" alt="Blog Thumbnail" />
        <div className="card-body">
          <h1 className="card-title">{blog.title}</h1>
          <p className="card-text">{blog.description}</p>
          <button onClick={() => navigate("/")} className="btn btn-primary">
            Back to Posts
          </button>
        </div>
      </div>
    </div>
  );
}

// onClick={()=>Navigate("/")} 