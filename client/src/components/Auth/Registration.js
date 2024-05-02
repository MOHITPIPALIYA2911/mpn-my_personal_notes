import image from "../../assetsCon/assets/img/illustrations/auth-basic-register-mask-light.png";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { triggerNotification } from "../message/Msg";
import logo from "../../img/mpnLogo.png";
import config from "../../config";

function Registration() {
  const url = config.url;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    name: "",
  });

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // --------------------------------------- Require field validation ---------------------------------------
    if (!formData.username.trim() || !formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      // Show an error message if any of the fields is blank
      triggerNotification("error", "Input fields cannot be empty!!");
      return; // Stop form submission
    }

    // --------------------------------------- Email validation ---------------------------------------
    const validateEmail = (email) => {
      // Regular expression for a valid email format
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailRegex.test(email);
    };
    if (!validateEmail(formData.email)) {
      triggerNotification("error", "Please enter a valid email address");
      return; // Stop form submission
    }

    // --------------------------------------- privacy policy & terms validation ---------------------------------------
    if (!isCheckboxChecked) {
      triggerNotification("error", "Please accept privacy policy & terms");
      return; // Stop form submission
    }

    // Call the API with formData
    console.log(JSON.stringify(formData));
    try {
      await fetch(`${url}users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then(function (response) {
          return response.json();
        })
        .then(async function (data) {
          console.log(data);
          if (data.status === 200) {
            triggerNotification("success", "User Signup Successfully");
            setFormData({
              email: "",
              username: "",
              password: "",
              name: "",
            });
            navigate("/login");
          } else {
            triggerNotification("error", `${data.message}`);
          }
        });
    } catch (error) {
      triggerNotification("error", "Some Error Occur!! Please Signin After Some Time ");
    }
  };
  return (
    <div>
      {/* <Css />
      <Script /> */}
      <div className="position-relative">
        <div className="authentication-wrapper authentication-basic container-p-y">
          <div className="authentication-inner py-4">
            <div className="card p-2">
              <div className="app-brand justify-content-center mt-3">
                <a href="" className="app-brand-link gap-2">
                  <img className="h-16 bg-black rounded p-2 mt-2 " src={logo} />
                </a>
              </div>
              <div className="card-body mt-1">
                <h4 className="mb-6 text-center">My Personal Notes User Registration! 👋</h4>
                <form className="mb-3" method="POST" onSubmit={handleSubmit}>
                  <div className="form-floating form-floating-outline mb-3">
                    <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" autoFocus />
                    <label htmlFor="name">Full Name</label>
                  </div>
                  <div className="form-floating form-floating-outline mb-3">
                    <input type="text" className="form-control" id="username" name="username" value={formData.username} onChange={handleChange} placeholder="Enter your username" autoFocus />
                    <label htmlFor="username">User Name</label>
                  </div>
                  <div className="form-floating form-floating-outline mb-3">
                    <input type="text" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" />
                    <label htmlFor="email">Email</label>
                  </div>
                  <div className="mb-3">
                    <div className="form-password-toggle">
                      <div className="input-group input-group-merge">
                        <div className="form-floating form-floating-outline">
                          <input
                            type="password"
                            id="password"
                            className="form-control"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                            aria-describedby="password"
                          />
                          <label htmlFor="password">Password</label>
                        </div>
                        <span className="input-group-text cursor-pointer">
                          <i className="mdi mdi-eye-off-outline"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="terms-conditions" name="terms" checked={isCheckboxChecked} onChange={() => setIsCheckboxChecked(!isCheckboxChecked)} />

                      <label className="form-check-label" htmlFor="terms-conditions">
                        I agree to
                        <a> privacy policy & terms</a>
                      </label>
                    </div>
                  </div>
                  <div className="mb-3">
                    <button className="btn btn-primary d-grid w-100" type="submit">
                      Sign Up
                    </button>
                  </div>
                </form>

                <p className="text-center">
                  <span>Already have an account? </span>
                  <Link to="/">
                    <span>Sign in instead</span>
                  </Link>
                </p>
              </div>
            </div>
            <img alt="mask" src={image} className="authentication-image d-none d-lg-block" data-app-dark-img="illustrations/auth-basic-login-mask-dark.html" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
