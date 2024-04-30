import React, { useState, useEffect } from "react";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";

import { triggerNotification } from "../../components/message/Msg";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/loadingbar/Spinner";
import config from "../../config";
import moment from "moment";

const AddNotes = () => {
  const token = config.token;
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  // ------------------------------------- Input Field state management -------------------------------
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContents, setNoteContents] = useState("");
  const [dates, setDates] = useState({
    createdAt: "",
    lastUpdate: "",
  });

  const handleNoteTitleChange = (e) => {
    setNoteTitle(e.target.value);
  };
  const handleNoteContentsChange = (data) => {
    setNoteContents(data);
  };

  //-------------------------------------- clear form data --------------------------------------r
  const clearForm = () => {
    setNoteTitle("");
    setNoteContents("");

    if (id) {
      navigate("/viewnotes");
    }
  };

  // ----------------------------------------- set updated value in field if It's edit request -----------------------------------------R
  const updateFieldValueSet = async () => {
    setLoading(true);
    try {
      await fetch(`${process.env.REACT_APP_BASE_URL}noteslist/${decodeURIComponent(atob(id))}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            const responseData = data.data;
            setNoteContents(responseData.note);
            setNoteTitle(responseData.noteTitle);
            setDates({
              createdAt: responseData.createdAt,
              lastUpdate: responseData.lastUpdate,
            });
          } else if (data.status === 401) {
            // Invalid token
            triggerNotification("error", "Unauthenticated user");
          } else {
            // Handle other errors
            triggerNotification("error", "Internal server error, Please try after some time!!");
          }
        });
    } catch (error) {
      triggerNotification("error", "Error fetching note.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id !== undefined) {
      updateFieldValueSet();
    }
  }, [id]);

  // ---------------------------------------------- create / add Notes ----------------------------------------------------c
  // Function to create a new Notes
  const createNote = async () => {
    try {
      if (!noteContents.trim() || !noteTitle.trim()) {
        triggerNotification("error", "Input fields cannot be empty!!");
        return; // Stop form submission
      }

      // Validate required fields before making the API request
      fetch(`${process.env.REACT_APP_BASE_URL}noteslist${id ? "/" + decodeURIComponent(atob(id)) : ""}`, {
        method: `${id ? "PUT" : "POST"}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          noteTitle: noteTitle,
          note: noteContents,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            // Notes created successfully
            console.log(token);
            triggerNotification("success", `Note ${id ? "updated" : "created"} successfully.`);

            setNoteContents("");
            setNoteTitle("");
            navigate("/viewnotes");
          } else if (data.status === 400) {
            // Handle validation errors
            triggerNotification("error", "Validation Error.");
          } else if (data.status === 401) {
            // Handle unauthorized (invalid token)
            triggerNotification("error", "Unauthenticated user");
          } else {
            // Handle other server errors
            triggerNotification("error", "Internal server error.");
          }
        })
        .catch((error) => {
          // Handle fetch error here
          console.log(error);
          triggerNotification("error", "Fetch error");
        });
    } catch (error) {
      console.error("Error creating Notes:", error);
      triggerNotification("error", "An error occurred while creating the Notes.");
    }
  };
  return (
    <>
      <Breadcrumb txt="Manage Notes" subpath={["Add Note"]} />
      {/* form view */}
      <div className="col-xxl">
        <div className="card mb-4">
          <div className="card-header d-flex align-items-center ">
            <h5 className="mb-0">Add Note</h5>
          </div>

          <div className="card-body">
            <form>
              {loading ? (
                <Spinner />
              ) : (
                <>
                  {id && (
                    <div className="mb-4">
                      <div className="row px-4 mb-2">
                        <div className="col-md-6">
                          <span className="text-sm font-bold">Created At: </span>
                          <span>{moment(dates.createdAt).format("MMMM Do YYYY, h:mm:ss a")} </span>
                        </div>
                        <div className="col-md-6">
                          <span className="text-sm  font-bold">Last Updated At: </span>
                          <span>{moment(dates.updatedAt).format("MMMM Do YYYY, h:mm:ss a")} </span>
                        </div>
                      </div>
                      <hr className="m-0 p-0" />
                    </div>
                  )}
                  {/* Note Title */}
                  <div className="form-floating form-floating-outline mb-4">
                    <input type="text" className="form-control" name="amnttitle" id="amnttitle" placeholder="Note Title" value={noteTitle} onChange={handleNoteTitleChange} />
                    <label htmlFor="amnttitle"> Note Title</label>
                  </div>
                </>
              )}

              <div className={loading ? "d-none" : "d-block"}>
                {/* Notes Content */}
                <label htmlFor="amntcontent" className="mb-2">
                  Notes Contents
                </label>
                <CKEditor
                  name="amntcontent"
                  editor={ClassicEditor}
                  data={noteContents}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    handleNoteContentsChange(data);
                  }}
                />

                {/* submit */}
                <div className="mt-3 justify-content-end">
                  <div className="col-sm-10">
                    <button type="button" className="btn btn-primary" onClick={createNote}>
                      Save Note
                    </button>
                    {/* clear | calcel */}
                    <button type="button" className="btn ml-2 btn-secondary" onClick={clearForm}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNotes;
