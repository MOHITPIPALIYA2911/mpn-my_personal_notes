import React from "react";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";

const HowToUse = () => {
  return (
    <>
      <Breadcrumb txt="Help" subpath={["How To Use"]} />

      <div className="col-xxl">
        <div className="card mb-4">
          <div className="card-header d-flex align-items-center row flex justify-between">
            <h5 className="mb-0 col-sm-3">How To Use</h5>
          </div>

          <div className="px-3 pb-3">
            <div className="card mb-3">
              <div className="card-body">
                <h6>Accessibility</h6>
                <p>
                  This app is designed to be responsive and accessible across various devices, including mobile phones, tablets, and laptops. We strive to ensure that all users, regardless of their device, can use our app comfortably and efficiently.
                </p>
              </div>
            </div>

            <div className="card mb-3">
              <div className="card-body">
                <h6>Manage Notes</h6>
                <ul className="list-disc">
                  <li>To add a note, navigate to "Manage Notes" and click on "Add Note." Enter a title and the content of your note.</li>
                  <li>
                    You can add:
                    <ul className="list-disc">
                      <li>text</li>
                      <li>images</li>
                      <li>links</li>
                      <li>tables</li>
                      <li>quotes</li>
                      <li>media</li>
                      <li>and more to your note</li>
                    </ul>
                  </li>
                </ul>
                <p>
                  To view all notes, click on "View Notes" under "Manage Notes." Here, you can see a list of all your notes with options to delete or view each note. Clicking on "View" will allow you to see the note with its creation and last updated
                  dates or update the note.
                </p>
              </div>
            </div>

            <div className="card mb-3">
              <div className="card-body">
                <h6>Bin</h6>
                <ul className="list-disc">
                  <li>
                    Deleted notes can be found in the "Bin" under "Manage Notes." Here, you can restore a note back to the "View Notes" section or permanently delete it by clicking on{" "}
                    <button className="btn btn-sm btn-icon btn-danger">
                      <span className="tf-icons mdi-18px mdi mdi-delete"></span>
                    </button>{" "}
                    permanent delete button.
                  </li>
                </ul>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h6>Manage Account</h6>
                <ul className="list-disc">
                  <li>To view your account information, navigate to "Manage Account" and click on "View My Account."</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowToUse;
