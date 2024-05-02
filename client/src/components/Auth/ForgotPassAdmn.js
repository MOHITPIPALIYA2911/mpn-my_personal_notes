import React, { useEffect, useState } from "react";
import image from "../../assetsCon/assets/img/illustrations/auth-basic-login-mask-light.png";
import { Link, useNavigate } from "react-router-dom";
import { triggerNotification } from "../message/Msg";
import Swal from "sweetalert2";
import config from "../../config";

const ForgotPassAdmn = () => {
  const url = config.url;
  const navigate = useNavigate();

  //------------------------------------- state management ---------------------------------------------
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState({
    otpSent: false,
    otpValue: "",
    otpAccepted: false,
  });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangeOtp = (e) => {
    setOtp((prevData) => ({
      ...prevData,
      otpValue: e.target.value,
    }));
  };
  const handleChangePass = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeRePass = (e) => {
    setConfirmPassword(e.target.value);
  };

  // ------------------------------ send emain id to find corresponding account ------------------------------C
  const btnConfirmEmail = () => {
    const validateEmail = (email) => {
      // Regular expression for a valid email format
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailRegex.test(email);
    };
    if (!validateEmail(email)) {
      triggerNotification("error", "Please enter a valid email address");
      return; // Stop form submission
    }

    Swal.fire({
      title: "Confirm Email Address",
      text: `Is this your correct email address? We'll send you a confirmation code to: ${email}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, send code!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleSendEmail();
      }
    });
  };
  const handleSendEmail = async () => {
    try {
      await fetch(`${url}admin/password-reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      })
        .then(function (response) {
          return response.json();
        })
        .then(async function (data) {
          console.log(data);
          if (data.status === 200) {
            setOtp({
              otpSent: true,
              otpValue: "",
              otpAccepted: false,
            });
            triggerNotification("success", "OTP sent successfully!");
          } else {
            triggerNotification("error", "Please enter a valid email address!!");
          }
        });
    } catch (error) {
      console.log(error);
      triggerNotification("error", "An error occurred. Please try again later.");
    }
  };

  // --------------------------------------------- inputed otp submit ---------------------------------------------C
  const btnSubmitOtp = async () => {
    try {
      await fetch(`${url}admin/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          otp: otp.otpValue,
        }),
      })
        .then(function (response) {
          return response.json();
        })
        .then(async function (data) {
          console.log(data);
          if (data.status === 200) {
            setOtp((prevData) => ({
              ...prevData,
              otpAccepted: true,
            }));
          } else {
            triggerNotification("error", "Please enter a valid otp!!");
          }
        });
    } catch (error) {
      console.log(error);
      triggerNotification("error", "An error occurred. Please try again later.");
    }
  };

  // ---------------------------------- submit change password form ---------------------------------------------C
  const btnSubmitForm = async () => {
    try {
      await fetch(`${url}admin/set-new-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          otp: otp.otpValue,
          password: password,
          confirm_password: confirmPassword,
        }),
      })
        .then(function (response) {
          return response.json();
        })
        .then(async function (data) {
          console.log(data);
          if (data.status === 200) {
            triggerNotification("success", "Password updated successfully.");
            navigate("/login");
          } else {
            triggerNotification("error", data.msg ? data.msg : "Please enter valid credentials");
          }
        });
    } catch (error) {
      console.log(error);
      triggerNotification("error", "An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <div>
        <div className="position-relative">
          <div className="authentication-wrapper authentication-basic container-p-y">
            <div className="authentication-inner py-4">
              <div className="card p-2">
                <div className="app-brand justify-content-center mt-3">
                  <a href="/" className="app-brand-link gap-2">
                    <img className="app-brand-text demo text-heading fw-bold w-48 " src="" />
                  </a>
                </div>
                <div className="card-body mt-2 pb-0 ">
                  <div className="text-center">
                    <h4 className="mb-2">Forgot Password</h4>
                    <p className="mb-4">
                      {otp.otpSent && !otp.otpAccepted
                        ? "Check your email for a text message with your code. Your code is 6 characters in length."
                        : otp.otpAccepted
                        ? "Enter a new password and re-enter it to confirm."
                        : "Enter your email and we'll send you a otp to reset your password."}
                    </p>
                  </div>
                  <div className="mb-3">
                    <div className="form-floating form-floating-outline mb-3">
                      <input type="text" className="form-control" id="email" name="email" value={email} disabled={otp.otpSent} onChange={handleChangeEmail} placeholder="Enter your email" autoFocus />
                      <label htmlFor="email">Email</label>
                    </div>
                    {otp.otpSent && !otp.otpAccepted && (
                      <div className="form-floating form-floating-outline mb-3">
                        <input type="text" className="form-control" id="otp" name="otp" value={otp.otpValue} onChange={handleChangeOtp} placeholder="Enter your otp" autoFocus />
                        <label htmlFor="otp">OTP</label>
                      </div>
                    )}
                    {otp.otpAccepted && (
                      <>
                        {/* new pass */}
                        <div className="form-floating form-floating-outline mb-3">
                          <input type="text" className="form-control" id="password" name="password" value={password} onChange={handleChangePass} placeholder="Enter a new password" autoFocus />
                          <label htmlFor="password">New Password</label>
                        </div>

                        {/* re-enter new pass */}
                        <div className="form-floating form-floating-outline mb-3">
                          <input type="password" className="form-control" id="repassword" name="repassword" value={confirmPassword} onChange={handleChangeRePass} placeholder="Re-enter your new password" autoFocus />
                          <label htmlFor="repassword">Re-enter Password</label>
                        </div>
                      </>
                    )}

                    {/* submit */}
                    <div className="mb-3">
                      <button disabled={!email} onClick={otp.otpSent && !otp.otpAccepted ? btnSubmitOtp : otp.otpAccepted ? btnSubmitForm : btnConfirmEmail} className="btn btn-primary d-grid w-100" type="submit">
                        {otp.otpSent && !otp.otpAccepted ? "Continue" : otp.otpAccepted ? "Submit" : "Send login otp"}
                      </button>
                    </div>
                  </div>
                </div>
                <hr />
                <p className="text-center">
                  <Link to="/login">
                    <span>Back to login?</span>
                  </Link>
                </p>
              </div>
              <img alt="mask" src={image} className="authentication-image d-none d-lg-block" data-app-dark-img="illustrations/auth-basic-login-mask-dark.html" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassAdmn;
