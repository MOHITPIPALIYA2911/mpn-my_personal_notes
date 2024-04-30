import React, { useState } from "react";
import { triggerNotification } from "../../components/message/Msg";
import config from "../../config";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const token = config.token;

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
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

    // Check if the username and password fields are empty
    if (!formData.newPassword.trim() || !formData.oldPassword.trim() || !formData.confirmPassword.trim()) {
      triggerNotification("error", "Input field cannot be empty!!");
      return;
    }

    try {
      await fetch(`${process.env.REACT_APP_BASE_URL}${config.user_type === "admin" ? "admin" : config.user_type === "teacher" && "teacher"}/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
        },

        body: JSON.stringify({
          password: formData.oldPassword,
          confirm_password: formData.confirmPassword,
          new_password: formData.newPassword,
        }),
      })
        .then(function (response) {
          return response.json();
        })
        .then(async function (data) {
          console.log(data);
          if (data.status === 200) {
            triggerNotification("success", "Password Updated Successfully!");
            // navigate("/home");
            setFormData({
              oldPassword: "",
              newPassword: "",
              confirmPassword: "",
            });
          } else {
            triggerNotification("error", `${data.msg ? data.msg : "Please Enter a Valid Credential!!"}`);
          }
        });
    } catch (error) {
      console.log(error);
      triggerNotification("error", "Some Error Occur!! Please Try After Some Time");
    }
  };
  return (
    <>
      {/* <div>
        <h2>Settings</h2>
        <hr />
      </div> */}
      <div className="position-relative">
        <div className="authentication-wrapper authentication-basic container-p-y flex flex-col">
          <div className="authentication-inner">
            <div className="card p-2">
              <div className="card-body mt-2 pb-0">
                <h4 className="mb-2">Change Password</h4>
                <p className="mb-4">Secure Your Account with a New Password</p>
                <form className="mb-3" method="POST" onSubmit={handleSubmit}>
                  {/* old Password */}
                  <div className="mb-3">
                    <div className="form-password-toggle">
                      <div className="input-group input-group-merge">
                        <div className="form-floating form-floating-outline">
                          <input
                            type="password"
                            id="oldPassword"
                            className="form-control"
                            name="oldPassword"
                            value={formData.oldPassword}
                            onChange={handleChange}
                            placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                            aria-describedby="oldPassword"
                          />
                          <label htmlFor="oldPassword">Old Password</label>
                        </div>
                        <span className="input-group-text cursor-pointer">
                          <i className="mdi mdi-eye-off-outline"></i>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* new Password */}
                  <div className="mb-3">
                    <div className="form-password-toggle">
                      <div className="input-group input-group-merge">
                        <div className="form-floating form-floating-outline">
                          <input
                            type="password"
                            id="newPassword"
                            className="form-control"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                            aria-describedby="newPassword"
                          />
                          <label htmlFor="newPassword">New Password</label>
                        </div>
                        <span className="input-group-text cursor-pointer">
                          <i className="mdi mdi-eye-off-outline"></i>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* confirmPassword */}
                  <div className="mb-3">
                    <div className="">
                      <div className="input-group input-group-merge">
                        <div className="form-floating form-floating-outline">
                          <input type="text" id="confirmPassword" className="form-control" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" aria-describedby="confirmPassword" />
                          <label htmlFor="confirmPassword">Confirm Password</label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* change pass btn */}
                  <div className="mb-3">
                    <button className="btn btn-primary d-grid w-100" type="submit">
                      Change Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="h-44 w-0"></div>
        </div>
      </div>
    </>
  );
};

export default Settings;
