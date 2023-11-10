import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!input.username) {
      validationErrors.username = 'Name is required';
    }
    if (!input.email || !validateEmail(input.email)) {
      validationErrors.email = 'Enter a valid email address';
    }
    if (input.password.length < 8) {
      validationErrors.password = 'Password should be at least 8 characters';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const res = await axios.post('https://blog-quv1.onrender.com/api/v1/user/register', input);
        navigate('/login');
        // alert(res.data.message);
      } catch (error) {
        alert(error.response.data.message); // message from the server
      }
    }
  };

  // Email validation function
  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <>
      <div className="container shadow">
        <h2 className="text-center my-3">Sign Up Here</h2>
        <div className="col-md-12 my-3 d-flex items-center justify-content-center">
          <div className="row">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="fullname" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  name="username"
                  value={input.username}
                  onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                  className="form-control"
                  id="fullname"
                  placeholder="Enter Name"
                />
                {errors.username && <p className="text-danger">{errors.username}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="mail" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  value={input.email}
                  onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                  className="form-control"
                  id="mail"
                  placeholder="Enter Email"
                />
                {errors.email && <p className="text-danger">{errors.email}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="pass" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                  className="form-control"
                  id="pass"
                  placeholder="Enter Password"
                />
                {errors.password && <p className="text-danger">{errors.password}</p>}
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-primary btn-block">
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
