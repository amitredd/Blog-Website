import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function AddBlog() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
    description: "",
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Restricting title to a maximum of 50 characters
    if (name === "title" && value.length > 50) {
      return; // Do not update state if over the limit
    }

    setInput({ ...input, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.title || !input.description || !file) {
      setError("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("description", input.description);
    formData.append("thumbnail", file);

    try {
      const res = await axios.post("http://localhost:5000/api/v1/add/blog", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // alert(res.data.message);
      navigate("/");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="container shadow mt-5 p-4">
      <h2 className="text-center mb-4">Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title (Max 50 characters)
          </label>
          <input
            type="text"
            name="title"
            value={input.title}
            onChange={handleInputChange}
            className="form-control"
            id="title"
            placeholder="Blog Title"
            maxLength="50"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={input.description}
            onChange={handleInputChange}
            placeholder="Blog Description"
            className="form-control"
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="thumbnail" className="form-label">
            Thumbnail
          </label>
          <input
            name="thumbnail"
            type="file"
            onChange={handleFileChange}
            id="thumbnail"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary btn-block">
            Add Blog
          </button>
        </div>
      </form>
    </div>
  );
}
