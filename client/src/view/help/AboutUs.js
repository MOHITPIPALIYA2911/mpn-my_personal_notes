import React from "react";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";

const AboutUs = () => {
  return (
    <>
      <Breadcrumb txt="Help" subpath={["About Me"]} />

      <div className="col-xxl">
        <div className="card mb-4">
          <div className="card-header d-flex align-items-center row flex justify-between">
            <h5 className="mb-0 col-sm-3">About Me</h5>
          </div>
          <div className="row flex justify-center">
            <div className="px-3 pb-3 text-center col-md-6 card mb-5">
              <div className="mb-3 pt-4">
                <img src="https://serenesys.info/static/media/mohit-profile-pic.07cb456042d3ac086dc0.png" alt="Mohit Pipaliya" className="rounded-full h-32 w-32 mx-auto" />
                <h1 className="text-3xl font-bold mt-2">Mohit Pipaliya</h1>
              </div>

              <p className="text-center">
                A BCA graduate with a score of 9 out of 10, deeply passionate about both management and software development. Committed to continuous learning, navigating the intricate intersection of academia and software development. Embracing
                challenges with resilience, leveraging every experience to propel towards innovation and success.
              </p>

              <p className="text-center">Experienced in real-life projects: React Native (3 months), React.js (10 months), Express.js (3 months).</p>

              <div className="mt-4">
                <p>Contact me:</p>
                <span>
                  <a href="https://www.linkedin.com/in/mohit-g-pipaliya/" target="_blank" rel="noopener noreferrer">
                    <i className="mdi mdi-linkedin self-center"></i>
                    <span className="self-center pt-1"> Mohit Pipaliya</span>
                  </a>
                </span>
                <br />
                <span>
                  <i className="mdi mdi-email"></i> Email: pipaliyamohit4g@gmail.com
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
