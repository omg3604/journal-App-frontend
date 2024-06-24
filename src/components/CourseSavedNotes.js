import React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import userContext from "../context/user/userContext";
import NoteItem from "./NoteItem";
import Spinner from "./Spinner";
import { courseOptions } from "../data";
import Select from "react-select";
import NoteItem2 from "./NoteItem2";

function CourseSavedNotes(props) {
  // For maintaining the user data on the navbar upon reload also

  const context = useContext(noteContext);
  let navigate = useNavigate();
  const { notes, getNotes, editNote, noteLoad , setNotes , deleteNote} = context;

  const [window, setwindow] = useState("");

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    ecourse: "",
    etitle: "",
    econtent: "",
  });

  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);

  const [filteredNotes , setFilteredNotes] = useState([]);

  const [selectedCourse , setSelectedCourse] = useState("");
  const onCourseClick = async (course) => {
    const response = await fetch('http://localhost:8080/journal/get-entries-by-course', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(`${localStorage.getItem('userName')}:${localStorage.getItem('password')}`)}`
      },
      body: JSON.stringify({course}),
    });
    const res = await response.json();
    setSelectedCourse(course);
    console.log(response);
    console.log(course);
    console.log(res);
    setFilteredNotes(res);
  }

  useEffect(() => {
    getNotes();
  }, []);

  const updateNote = (currentNote) => {
    setwindow("edit");
    ref.current.click(); // for opening the modal on clicking edit icon
    setNote({
      id: currentNote._id,
      ecourse: currentNote.course,
      etitle: currentNote.title,
      econtent: currentNote.content,
    }); // for populating the form with current note values
  };

  const handleClick = (e) => {
    editNote(note.ecourse, note.etitle, note.econtent, note.id);
    //console.log("Updating the note...", note);
    refClose.current.click(); // for closing the modal after clicking save changes button
    props.showAlert("success", "Note updated successfully");
  };

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const onCourseChange = (selectedCourse) => {
    if (selectedCourse) setNote({ ...note, ecourse: selectedCourse.value });
    else setNote({ ...note, ecourse: "" });
  };

  // // Sharing Note to other users
  // const [snote, setsnote] = useState({ id: "", stitle: "", sdescription: "", stag: "default", sexpdate: "" });
  // const [usermail, setusermail] = useState("");

  // const shareNote = (note) => {
  //     setwindow("share");
  //     ref.current.click();
  //     setsnote({ id: note._id, stitle: note.title, sdescription: note.description, stag: note.tag, sexpdate: note.expdate });
  // }

  // const [validmail, setvalidmail] = useState(true);

  // const onsharechange = (e) => {
  //     setUnknownUser(true);
  //     var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  //     if (e.target.value.match(validRegex)) {
  //         setvalidmail(true);
  //     }
  //     else {
  //         setvalidmail(false);
  //     }
  //     setusermail(e.target.value);
  // }

  // const [unknownUser, setUnknownUser] = useState(true);

  // // We have fetched data from the API here only instead of in notestate because we want to know that if the user with given
  // // email exists in the database or not and give result depending on that.
  // const onshareclick = async (e) => {
  //     //let res = saveSharedNote(snote.stitle + `    ~${details.name}`, snote.sdescription, snote.stag, snote.sexpdate, usermail);
  //     // console.log(usermail);
  //     // console.log(snote);
  //     let title = snote.stitle + `    ~${details.name}`;
  //     let description = snote.sdescription;
  //     let tag = snote.stag;
  //     let expdate = snote.sexpdate;
  //     let email = usermail;
  //     const response1 = await fetch(`https://frightened-gold-beret.cyclic.app/api/auth/finduser`, {
  //         method: "POST",
  //         headers: {
  //             "Content-Type": "application/json",
  //             "auth-token": localStorage.getItem('token')
  //         },
  //         body: JSON.stringify({ email })
  //     })
  //     const json = await response1.json();
  //     // If the user with given email exixts.
  //     if (json.success === true) {
  //         const authtoken = json.authToken;
  //         console.log(authtoken);

  //         const response = await fetch(`https://frightened-gold-beret.cyclic.app/api/notes/addSharedNote`, {
  //             method: "POST", // *GET, POST, PUT, DELETE, etc.
  //             headers: {
  //                 "Content-Type": "application/json",
  //                 "auth-token": authtoken,
  //             },
  //             body: JSON.stringify({ title, description, tag, expdate }), // body data type must match "Content-Type" header
  //         });
  //         const newnote = await response.json();
  //         console.log(newnote);
  //         refClose.current.click();
  //         props.showAlert("success", `Note shared to user ${usermail} successfully`);
  //     }
  //     // If the user with given email doesnot exixt.
  //     else {
  //         setUnknownUser(false);
  //         //props.showAlert("Failure", `No user with given mail ${usermail} exists in the application!`);
  //     }
  // }

  return (
    <div className="d-flex my-2">
      <nav
        id="sidebarMenu"
        class="collapse d-lg-block sidebar collapse bg-white"
      >
        <div className="" style={{ height: '550px', overflow: 'scroll' }}>
          <div class="list-group list-group-flush">
            <a
              href="#"
              class="list-group-item list-group-item-action py-2 ripple"
              aria-current="true"
              name="Introduction to SDH"
              onClick={() => onCourseClick('Introduction to SDH')}
            >
              <div  class="rounded" style={{ textAlign: "left" }}>
                Introduction to SDH
              </div>
            </a>
            <a
              href="#"
              class="list-group-item list-group-item-action py-2 ripple"
              aria-current="true"
              name="Introduction to NM"
              onClick={() => onCourseClick('Introduction to NM')}
            >
              <div  class="rounded" style={{ textAlign: "left" }}>
                Introduction to NM
              </div>
            </a>
            <a
              href="#"
              class="list-group-item list-group-item-action py-2 ripple"
              aria-current="true"
              onClick={() => onCourseClick('Fault Management')}
            >
              <div  class="rounded" style={{ textAlign: "left" }}>
                Fault Management
              </div>
            </a>
            <a
              href="#"
              class="list-group-item list-group-item-action py-2 ripple"
              aria-current="true"
              onClick={() => onCourseClick('Introduction to LTE')}
            >
              <div  class="rounded" style={{ textAlign: "left" }}>
                Introduction to LTE
              </div>
            </a>
            <a
              href="#"
              class="list-group-item list-group-item-action py-2 ripple"
              aria-current="true"
              onClick={() => onCourseClick('Software Architecture')}
            >
              <div  class="rounded" style={{ textAlign: "left" }}>
                Software Architecture
              </div>
            </a>
            <a
              href="#"
              class="list-group-item list-group-item-action py-2 ripple"
              aria-current="true"
              onClick={() => onCourseClick('Introduction to SDLC')}
            >
              <div  class="rounded" style={{ textAlign: "left" }}>
                Introduction to SDLC
              </div>
            </a>
            <a
              href="#"
              class="list-group-item list-group-item-action py-2 ripple"
              aria-current="true"
              onClick={() => onCourseClick('Introduction to Test Equipments')}
            >
              <div  class="rounded" style={{ textAlign: "left" }}>
                Introduction to Test Equipments
              </div>
            </a>
            <a
              href="#"
              class="list-group-item list-group-item-action py-2 ripple"
              aria-current="true"
              onClick={() => onCourseClick('Introduction to Firmware')}
            >
              <div  class="rounded" style={{ textAlign: "left" }}>
                Introduction to Firmware
              </div>
            </a>
            <a
              href="#"
              class="list-group-item list-group-item-action py-2 ripple"
              aria-current="true"
              onClick={() => onCourseClick('Overview of Diagnostics')}
            >
              <div  class="rounded" style={{ textAlign: "left" }}>
                Overview of Diagnostics
              </div>
            </a>
            <a
              href="#"
              class="list-group-item list-group-item-action py-2 ripple"
              aria-current="true"
              onClick={() => onCourseClick('Introduction to OTN')}
            >
              <div  class="rounded" style={{ textAlign: "left" }}>
                Introduction to OTN
              </div>
            </a>
            <a
              href="#"
              class="list-group-item list-group-item-action py-2 ripple"
              aria-current="true"
              onClick={() => onCourseClick('Introduction to GPON')}
            >
              <div  class="rounded" style={{ textAlign: "left" }}>
                Introduction to GPON
              </div>
            </a>
            <a
              href="#"
              class="list-group-item list-group-item-action py-2 ripple"
              aria-current="true"
              onClick={() => onCourseClick('Introduction to TIDL')}
            >
              <div  class="rounded" style={{ textAlign: "left" }}>
                Introduction to TIDL
              </div>
            </a>
            <a
              href="#"
              class="list-group-item list-group-item-action py-2 ripple"
              aria-current="true"
              onClick={() => onCourseClick('Basics of Scripting')}
            >
              <div  class="rounded" style={{ textAlign: "left" }}>
                Basics of Scripting
              </div>
            </a>
            <a
              href="#"
              class="list-group-item list-group-item-action py-2 ripple"
              aria-current="true"
              onClick={() => onCourseClick('Overview of Debugging Tools')}
            >
              <div  class="rounded" style={{ textAlign: "left" }}>
                Overview of Debugging Tools
              </div>
            </a>
            <a
              href="#"
              class="list-group-item list-group-item-action py-2 ripple"
              aria-current="true"
              onClick={() => onCourseClick('Introduction to HAL')}
            >
              <div  class="rounded" style={{ textAlign: "left" }}>
                Introduction to HAL
              </div>
            </a>
            <a
              href="#"
              class="list-group-item list-group-item-action py-2 ripple"
              aria-current="true"
              onClick={() => onCourseClick('Introduction to MIB')}
            >
              <div  class="rounded" style={{ textAlign: "left" }}>
                Introduction to MIB
              </div>
            </a>
            <a
              href="#"
              class="list-group-item list-group-item-action py-2 ripple"
              aria-current="true"
              onClick={() => onCourseClick('NMS Components')}
            >
              <div  class="rounded" style={{ textAlign: "left" }}>
                NMS Components
              </div>
            </a>
            <a
              href="#"
              class="list-group-item list-group-item-action py-2 ripple"
              aria-current="true"
              onClick={() => onCourseClick('Understanding NMS Topology')}
            >
              <div  class="rounded" style={{ textAlign: "left" }}>
                    Understanding NMS Topology
              </div>
            </a>
            <a
              href="#"
              class="list-group-item list-group-item-action py-2 ripple"
              aria-current="true"
              onClick={() => onCourseClick('Virtual Devices and Drivers')}
            >
              <div  class="rounded" style={{ textAlign: "left" }}>
                Virtual Devices and Drivers
              </div>
            </a>
            <a
              href="#"
              class="list-group-item list-group-item-action py-2 ripple"
              aria-current="true"
              onClick={() => onCourseClick('Introduction to DWDM')}
            >
              <div  class="rounded" style={{ textAlign: "left" }}>
                Introduction to DWDM
              </div>
            </a>
            <a
              href="#"
              class="list-group-item list-group-item-action py-2 ripple"
              aria-current="true"
              onClick={() => onCourseClick('Introduction to TIDL')}
            >
              <div  class="rounded" style={{ textAlign: "left" }}>
                Introduction to TIDL
              </div>
            </a>
            <a
              href="#"
              class="list-group-item list-group-item-action py-2 ripple"
              aria-current="true"
              onClick={() => onCourseClick('Introduction to EMS')}
            >
              <div  class="rounded" style={{ textAlign: "left" }}>
                Introduction to EMS
              </div>
            </a>
            <a
              href="#"
              class="list-group-item list-group-item-action py-2 ripple"
              aria-current="true"
              onClick={() => onCourseClick('Introduction to NMS Administration')}
            >
              <div  class="rounded" style={{ textAlign: "left" }}>
                Introduction to NMS Administration
              </div>
            </a>
          </div>
        </div>
      </nav>

      <div className="d-flex ">
        <div className="container">
          <button
            ref={ref}
            type="button"
            className="btn btn-primary d-none"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Launch demo modal
          </button>

          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div
                  className="modal-header"
                  style={{ backgroundColor: "#A5D7E8" }}
                >
                  <h5 className="modal-title" id="exampleModalLabel">
                    {window == "share" ? "Share Note" : "Edit Note"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                {/* {window == "share" &&
                            <div className="modal-body">
                                <form className='container '>
                                    <div className="form-group d-flex my-3">
                                        <label htmlFor="etitle" className="form-label">Receiver's Email</label>
                                        <input type="text" className="form-control" id="etitle" name="etitle" placeholder="Enter email" onChange={onsharechange} value={usermail} minLength={5} required />
                                    </div>
                                    <p>The email must be a valid email of inotebook user.</p>
                                    {!validmail && <p className='p-2 rounded' style={{ backgroundColor: "#FA9884" }}>Please Enter a valid email.</p>}
                                    {!unknownUser && <p className='p-2 rounded' style={{ backgroundColor: "#FA9884" }}>Failure! No user with given email "{usermail}" exists in the application. Please enter a valid iNoteBook user mail.</p>}
                                </form>
                            </div>
                        }
                        {window == "share" &&
                            <div className="modal-footer" >
                                <button ref={refClose} type="button" className='btn btn-rounded editbtncss' data-bs-dismiss="modal">Close</button>
                                <button onClick={onshareclick} type="button" className={`btn btn-rounded editbtncss ${validmail === false ? "disabled" : ""}`}>Share</button>
                            </div>
                        } */}
                {window == "edit" && (
                  <div className="modal-body">
                    <form className="container ">
                      {/* <div className="form-group d-flex my-3 justify-content-around">
                                        <label htmlFor="etitle" className="form-label">Course</label>
                                        <input type="text" className="form-control w-50" id="ecourse" name="ecourse" placeholder="Enter Course" onChange={onchange} value={note.ecourse} minLength={5} required />
                                    </div> */}
                      <div className="row my-2">
                        <label htmlFor="course" className="form-label">
                          Select Course :{" "}
                        </label>
                        <Select
                          className="basic-single col-md-12"
                          classNamePrefix="select"
                          defaultValue=""
                          isDisabled={isDisabled}
                          isLoading={isLoading}
                          isClearable={isClearable}
                          isRtl={isRtl}
                          isSearchable={isSearchable}
                          name="course"
                          options={courseOptions}
                          onChange={onCourseChange}
                          required
                        />
                      </div>
                      <div className="form-group d-flex my-3 justify-content-around">
                        <label htmlFor="etitle" className="form-label">
                          Title
                        </label>
                        <input
                          type="text"
                          className="form-control w-50"
                          id="etitle"
                          name="etitle"
                          placeholder="Enter title"
                          onChange={onchange}
                          value={note.etitle}
                          minLength={5}
                          required
                        />
                      </div>
                      <div className="form-group d-flex my-3 justify-content-around">
                        <label htmlFor="econtent" className="form-label">
                          Content
                        </label>
                        <input
                          type="text"
                          className="form-control w-75"
                          id="econtent"
                          name="econtent"
                          placeholder="Note Content"
                          onChange={onchange}
                          value={note.econtent}
                          minLength={5}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center"></div>
                      </div>

                      {/* <div className="form-group d-flex my-3 justify-content-around">
                                        <p className='form-label'>Select Tag : </p>
                                        <select id="etag" className="select w-50 p-2 rounded" style={{ borderColor: "grey" }} name="etag" onChange={onchange} value={note.etag}>
                                            <option value="personal">Personal</option>
                                            <option value="general">General</option>
                                            <option value="business">Business</option>
                                            <option value="routine">Routine</option>
                                            <option value="routine">Default</option>
                                        </select>
                                        <label htmlFor="etag" className="form-label">Tag</label>
                                        <input type="text" className="form-control w-50" id="etag" name="etag" placeholder="Note tag" onChange={onchange} />
                                    </div> */}
                      {/* <div className="form-group d-flex my-3 justify-content-around">
                                        <label htmlFor="eexpdate" className="form-label">Expiry Date</label>
                                        <input type="date" className="form-control w-50" id="eexpdate" name="eexpdate" placeholder="" onChange={onchange} value={note.eexpdate} />
                                    </div> */}
                    </form>
                  </div>
                )}
                {window == "edit" && (
                  <div className="modal-footer">
                    <button
                      ref={refClose}
                      type="button"
                      className="btn btn-rounded editbtncss"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      onClick={handleClick}
                      type="button"
                      className="btn btn-rounded editbtncss"
                    >
                      Save changes
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="" style={{ height: '550px', overflow: filteredNotes.length >0? 'scroll' : '' }}>
            <div className="d-flex justify-content-between align-items-center">
              <h2 style={{ color: "#19376D" }}>Course : {selectedCourse}</h2>
            </div>
            <hr></hr>
            {noteLoad && <Spinner />}
            {!noteLoad && (selectedCourse != "") && (
              <h5>{filteredNotes.length === 0 && "No saved notes found for this Course."}</h5>
            )}
            {!noteLoad && (
              <h5>{selectedCourse == "" && "Select a Course to view notes."}</h5>
            )}
            {!noteLoad && (
                <h6>{filteredNotes.length >0 && `${filteredNotes.length} notes found!`}</h6>
            )
            }
            <div>
                
            </div>
            {!noteLoad &&
              filteredNotes.map((note) => {
                return (
                  <NoteItem2
                    key={note._id}
                    updateNote={updateNote}
                    deleteNote={deleteNote}
                    note={note}
                    showAlert={props.showAlert}
                  ></NoteItem2>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseSavedNotes;
