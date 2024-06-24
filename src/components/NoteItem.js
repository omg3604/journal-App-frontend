import React from "react";
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import "./NoteItem.css";

export default function NoteItem(props) {
  const context = useContext(noteContext);
  const { deleteNote } = context;

  const { note, updateNote } = props;
  //console.log(note.expdate);

  return (
    <>
      <div class="card my-3 p-0">
        <div class="card-header font-bold" style={{backgroundColor:"#A5D7E8"}}><h4>{note.course}</h4></div>
        <div class="card-body">
          <div class="card-title "><h5>{note.title}</h5></div>
          <p class="card-text">
            {note.content}
          </p>
        </div>
        
        <div className="d-flex card-header">
        <hr></hr>
          <button
                    className="btn btn-primary mx-2 btn-rounded navbtn" style={{ backgroundColor: "#19376D", borderColor: "#19376D" }}
                    onClick={() => {
                      updateNote(note);
                    }}
                  >
                    {" "}
                    <i className="fa-solid fa-pen-to-square fa-sm px-1"></i>{" "}
                    Edit
                  </button>

                  <button
                    className="btn btn-primary mx-2 btn-rounded navbtn" style={{ backgroundColor: "#19376D", borderColor: "#19376D" }}
                    onClick={() => {
                      deleteNote(note._id);
                      props.showAlert("success", "Note deleted successfully");
                    }}
                  >
                    {" "}
                    <i className="fa-solid fa-trash fa-sm px-1"></i> Delete
                  </button>
          </div>
      </div>

      {/* <div className="col-md-3">
        <div className=" card notecard text-center my-3">
          <div
            className="card-header d-flex justify-content-between align-items-center rounded"
            style={{ backgroundColor: "#A5D7E8" }}
          >
            <h5 className="card-title text-start">{note.course}</h5>
            <div className="dropdown">
              <a
                type="button"
                id="dropdownMenuicon"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-ellipsis-v fa-lg text-dark px-1"></i>
              </a>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuicon">
                <li>
                  <button
                    className="dropdown-item text-center"
                    onClick={() => {
                      updateNote(note);
                    }}
                  >
                    {" "}
                    <i className="fa-solid fa-pen-to-square fa-sm px-1"></i>{" "}
                    Edit
                  </button>
                </li>

                <li>
                  <button
                    className="dropdown-item text-center"
                    onClick={() => {
                      deleteNote(note._id);
                      props.showAlert("success", "Note deleted successfully");
                    }}
                  >
                    {" "}
                    <i className="fa-solid fa-trash fa-sm px-1"></i> Delete
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="card-body" style={{ backgroundColor: "white" }}>
            <h3 className="card-text">{note.title}</h3>
            <p className="card-text">{note.content}</p>
          </div>
        </div>
      </div> */}
    </>
  );
}
