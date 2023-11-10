import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      const res = await axios.get("http://localhost:5000/api/v1/get/allblogs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBlogs(res.data);
    };
    fetchAllBlogs();
  }, []);

  return (
    <>
      <main className="my-5">
        <div className="container shadow-lg">
          <section className="text-center">
            <h2 className="mb-5 my-3">
              <strong>Your Blog's</strong>
            </h2>
            <div className="row">
              {blogs && blogs.length > 0 ? (
                blogs.map((item) => {
                  return (
                    <div className="col-lg-4 col-md-12 mb-4" key={item._id}>
                      <div className="card">
                        <div
                          className="bg-image hover-overlay ripple"
                          data-mdb-ripple-color="light"
                        >
                          <img
                            src={`http://localhost:5000/${item.thumbnail}`}
                            alt=""
                            className="img-fluid"
                            style={{ width: "100%", height: "200px", objectFit: "cover" }}
                          ></img>
                          <Link to={`/blog/${item._id}`}>
                            <div
                              className="mask"
                              style={{ backgroundColor: "rgba(251,251,0.15" }}
                            ></div>
                          </Link>
                        </div>
                        <div className="card-body">
                          <h5 className="card-title">{item.title}</h5>
                          <p className="card-text">
                            {item.description.length > 100
                              ? `${item.description.substring(0, 100)}...`
                              : item.description}
                          </p>
                          <Link to={`/blog/${item._id}`} className="btn btn-primary">
                            Go to Full Post
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <h2>No Posts Yet</h2>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
