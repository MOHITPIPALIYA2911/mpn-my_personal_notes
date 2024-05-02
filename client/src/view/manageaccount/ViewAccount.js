import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import { useNavigate, useParams } from "react-router-dom";

import { triggerNotification } from "../../components/message/Msg";
import Spinner from "../../components/loadingbar/Spinner";
import config from "../../config";

const ViewAccount = () => {
  const { id } = useParams();
  const { token, email, username, name } = config;
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState("Active");
  const navigate = useNavigate();

  return (
    <>
      <Breadcrumb txt="Manage Account" subpath={["View My Account"]} />

      {loading ? (
        <Spinner />
      ) : (
        <div className="container-xxl flex-grow-1 container-p-y mt-12">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <div className="d-flex py-3 align-items-md-end align-items-sm-start align-items-center justify-content-md-between justify-content-start mx-4 flex-md-row flex-column gap-4">
                  <div className="user-profile-info ">
                    <h4>{name}</h4>
                    <ul className="list-inline mb-0 d-flex align-items-center flex-wrap justify-content-sm-start justify-content-center gap-2">
                      <li className="list-inline-item">
                        <i className="mdi mdi-account  form-icon me-1 mdi-20px"></i>
                        <span className="fw-medium">{username}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card mb-4">
            <div className="card-body row">
              <div className="col-md-6">
                <small className="card-text text-uppercase">About</small>
                <ul className="list-unstyled my-3 py-1">
                  <li className="d-flex align-items-center mb-3">
                    <i className="mdi mdi-account-outline mdi-24px"></i>
                    <span className="fw-medium mx-2">Full Name:</span> <span>{name}</span>
                  </li>
                  <li className="d-flex align-items-center mb-3">
                    <i className="mdi mdi-account-circle-outline mdi-24px"></i>
                    <span className="fw-medium mx-2">User Name:</span> <span>{username}</span>
                  </li>
                  <li className="d-flex align-items-center mb-3">
                    <i className="mdi mdi-check mdi-24px"></i>
                    <span className="fw-medium mx-2">Status:</span> <span>{studentData}</span>
                  </li>
                </ul>
              </div>
              <div className="col-md-6">
                <small className="card-text text-uppercase">Contacts</small>
                <ul className="list-unstyled my-3 py-1">
                  <li className="d-flex align-items-center mb-3">
                    <i className="mdi mdi-email-outline mdi-24px"></i>
                    <span className="fw-medium mx-2">Email:</span> <span>{email}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewAccount;
