import React, { useEffect, useState, useRef } from "react";

import { triggerNotification } from "../../components/message/Msg";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/loadingbar/Spinner";
import TableViewer from "../../components/tableViewer/TableViewer";
import config from "../../config";

const ViewNoteBin = () => {
  const url = config.url;
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = config.token;
  const navigate = useNavigate();

  //  ------For TableViewer ------
  const notesRef = useRef([]);
  notesRef.current = notes;
  const [rowData, setRowData] = useState([]);
  //  ------For TableViewer ------

  //----------------------------------------------- select / view notes table  -------------------------------------------------R
  // Fetch all courses
  const fetchNotes = async () => {
    setLoading(true);
    try {
      await fetch(`${url}noteslist`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            // Successful response, update the courses state
            setNotes(data.data.filter((note) => note.deletedNote === 1));
            // console.log(data.data);

            //  ------For TableViewer ------
            const notesData = data.data
              .filter((note) => note.deletedNote === 1)
              .map((note) => ({
                title: note.noteTitle,
                idNumber: note._id,
              }));
            setRowData(notesData);
            //  ------For TableViewer ------
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
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchNotes();
  }, [token]);

  // ---------------------------------------------------- Delete Note ---------------------------------------------------------D
  // Show a confirmation dialog
  const btnDeleteHandle = (deleteId, i) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to permanently delete note. Are you sure you want to proceed?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteNotes(deleteId, i);
      }
    });
  };

  //If confirm then delete Note
  const handleDeleteNotes = async (deleteId, i) => {
    setLoading(true);
    try {
      await fetch(`${url}noteslist/${deleteId}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            triggerNotification("success", "Note permanently deleted!.");

            //  ------For TableViewer ------
            const updatedNotes = [...notesRef.current];
            updatedNotes.splice(i, 1);
            setNotes(updatedNotes);

            const notesData = updatedNotes.map((note) => ({
              title: note.noteTitle,
              idNumber: note._id,
            }));
            setRowData(notesData);
            //  ------For TableViewer ------
          } else if (data.status === 401) {
            // Invalid Token
            triggerNotification("error", "Unauthenticated User");
          } else {
            // Internal Server Error or other HTTP errors
            triggerNotification("error", "Internal server error, Please try after some time!");
          }
        });
    } catch (error) {
      triggerNotification("error", "Error deleting note");
    }
    setLoading(false);
  };

  //----------------------------------------------- btnRestoreHandle note -------------------------------------------------D
  const btnRestoreHandle = async (restoreId, i) => {
    setLoading(true);
    try {
      await fetch(`${url}noteslist/restoredfrombin/${restoreId}`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            triggerNotification("success", "Note restored successfully.");

            //  ------For TableViewer ------
            const updatedNotes = [...notesRef.current];
            updatedNotes.splice(i, 1);
            setNotes(updatedNotes);

            const notesData = updatedNotes.map((note) => ({
              title: note.noteTitle,
              idNumber: note._id,
            }));
            setRowData(notesData);
            //  ------For TableViewer ------
          } else if (data.status === 401) {
            // Invalid Token
            triggerNotification("error", "Unauthenticated User");
          } else {
            // Internal Server Error or other HTTP errors
            triggerNotification("error", "Internal server error, Please try after some time!");
          }
        });
    } catch (error) {
      triggerNotification("error", "Error restoring note");
    }
    setLoading(false);
  };

  //  ------For TableViewer ------
  const colDefs = [
    {
      headerName: "#",
      width: 50,
      valueFormatter: (params) => {
        return `${parseInt(params.node.id) + 1}`;
      },
    },
    { headerName: "Note Title", field: "title", width: 750, filter: true },
  ];
  //  ------For TableViewer ------

  return (
    <>
      <Breadcrumb txt="Manage Notes" subpath={["View Notes Bin"]} />

      <div className="col-xxl">
        <div className="card mb-4">
          <div className="card-header d-flex align-items-center  row flex justify-between">
            <h5 className="mb-0 col-sm-3 ">View Notes Bin</h5>
          </div>
          {loading ? (
            <Spinner />
          ) : (
            <div className="px-3 pb-3  table-responsive">
              {/* ------For TableViewer ------ */}
              <TableViewer rowData={rowData} colDefs={colDefs} onDelete={btnDeleteHandle} onRestore={btnRestoreHandle} />
              {/* ------For TableViewer ------ */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewNoteBin;
