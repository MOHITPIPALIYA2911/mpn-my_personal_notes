import image from "../../assetsCon/assets/img/illustrations/auth-basic-login-mask-light.png";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { triggerNotification } from "../message/Msg";
import logo from "../../img/mpnLogo.png";
import config from "../../config";

function Login() {
  const url = config.url;
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      window.location.href = "/home";
    }
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the email and password fields are empty
    if (!formData.email.trim() || !formData.password.trim()) {
      // Show an error message if any of the fields is blank
      triggerNotification("error", "Input field cannot be empty!!");
      return; // Stop form submission
    }

    // Call the API with formData
    try {
      await fetch(`${url}users/login`, {
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
            // console.log(data);
            localStorage.setItem("token", data.token);
            localStorage.setItem("email", data.email);
            localStorage.setItem("username", data.username);
            localStorage.setItem("name", data.name);
            // localStorage.setItem("name", data.email.user.email);
            console.log(data);
            window.location.href = "/home";
          } else {
            triggerNotification("error", "Please Enter a Valid Credential!!");
          }
        });
    } catch (error) {
      console.log(error);
      triggerNotification("error", "Some Error Occur!! Please Login After Some Time");
    }
  };

  return (
    <div>
      <div className="position-relative">
        <div className="authentication-wrapper authentication-basic container-p-y">
          <div className="authentication-inner py-4">
            <div className="card p-2">
              <div className="app-brand justify-content-center mt-3">
                <div className="app-brand-link gap-2">
                  <img className="h-16 bg-black rounded p-2 mt-2" src={logo} />
                </div>
              </div>
              <div className="card-body mt-2 pb-0">
                <h4 className="mb-2">Welcome to My Personal Notes! 👋</h4>
                <p className="mb-4">Please login to your account and start the adventure</p>
                <form className="mb-3" method="POST" onSubmit={handleSubmit}>
                  <div className="form-floating form-floating-outline mb-3">
                    <input type="text" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" autoFocus />
                    <label htmlFor="email">Email Address</label>
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
                    <button className="btn btn-primary d-grid w-100" type="submit">
                      Login
                    </button>
                  </div>
                </form>
                {/* in progress  30-04-24*/}
                {/* <span>
                  <Link to="/forgotpassadmn">
                    <span>Forgot Password?</span>
                  </Link>
                </span> */}
              </div>
              <hr />
              <p className="text-center">
                <span>New on our platform? </span>
                <a href="/signup">
                  <span>Create an account</span>
                </a>
              </p>
            </div>
            <img alt="mask" src={image} className="authentication-image d-none d-lg-block" data-app-dark-img="illustrations/auth-basic-login-mask-dark.html" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
