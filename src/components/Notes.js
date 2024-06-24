import React from 'react';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import userContext from '../context/user/userContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';
import Spinner from './Spinner';
import './Notes.css'

export default function Notes(props) {


    // For maintaining the user data on the navbar upon reload also
    const Ucontext = useContext(userContext);

    const context = useContext(noteContext);
    let navigate = useNavigate();
    const { notes, getNotes, editNote, noteLoad } = context;
    // if(localStorage.getItem('userName')==null){
    //     noteLoad = true;
    // }

    const [username, setUsername] = useState(localStorage.getItem('userName'));
    const [password, setPassword] = useState(localStorage.getItem('password'));

    // to display all saved notes of the user.
    useEffect(() => {
        setUsername(localStorage.getItem('userName'));
        setPassword(localStorage.getItem('password'));
        getNotes(username , password);
    },[])

    // Editing the note

    const [window, setwindow] = useState("");

    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default", eexpdate: "" });

    const updateNote = (currentNote) => {
        setwindow("edit");
        ref.current.click();    // for opening the modal on clicking edit icon
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag, eexpdate: currentNote.expdate });   // for populating the form with current note values
    }

    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag, note.eexpdate);
        //console.log("Updating the note...", note);
        refClose.current.click();   // for closing the modal after clicking save changes button
        props.showAlert("success", "Note updated successfully");
    }

    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    // const ontagchange = (e) => {
    //     if (e.target.value !== "All") {
    //         // getNotesByTag(e.target.value);
    //     }
    //     else {
    //         getNotes();
    //     }
    //     console.log(e.target.value);
    // }

    // // Sharing Note to other users
    // const [snote, setsnote] = useState({ id: "", stitle: "", sdescription: "", stag: "default", sexpdate: "" });
    // const [usermail, setusermail] = useState("");

    // const shareNote = (note) => {
    //     setwindow("share");
    //     ref.current.click();
    //     setsnote({ id: note._id, stitle: note.title, sdescription: note.description, stag: note.tag, sexpdate: note.expdate });
    // }

    const [validmail, setvalidmail] = useState(true);

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

    const [unknownUser, setUnknownUser] = useState(true);

    // We have fetched data from the API here only instead of in notestate because we want to know that if the user with given
    // email exists in the database or not and give result depending on that.
    // const onshareclick = async (e) => {
    //     //let res = saveSharedNote(snote.stitle + `    ~${details.name}`, snote.sdescription, snote.stag, snote.sexpdate, usermail);
    //     // console.log(usermail);
    //     // console.log(snote);
    //     let title = snote.stitle;
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

    // if (noteLoad) return <Spinner/>;
    return (
        <>
            <AddNote showAlert={props.showAlert} ></AddNote>

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

        </>
    )
}