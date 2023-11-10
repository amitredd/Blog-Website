import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({}); // State for validation errors

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!input.email) {
      validationErrors.email = 'Email is required';
    }
    if (!input.password) {
      validationErrors.password = 'Password is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      // Set validation errors if any
      setErrors(validationErrors);
    } else {
      try {
        const res = await axios.post('https://blog-quv1.onrender.com/api/v1/user/login', input);
        // Reset errors if successful
        setErrors({});
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', res.data.name);
        navigate('/');
        console.log(res.data.token);
      } catch (error) {
        setErrors({ message: error.response.data.message });
      }
    }
  };

  return (
    <>
      <div className="container shadow">
        <h2 className="text-center my-3">Log in to Your Account</h2>
        <div className="col-md-12 my-3 d-flex items-center justify-content-center">
          <div className="row">
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="mail" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  value={input.email}
                  onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                  id="mail"
                  className="form-control"
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
                  Login
                </button>
                {errors.message && <p className="text-danger">{errors.message}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

