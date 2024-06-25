import NoteContext from "./noteContext";
import React ,{ useContext, useEffect, useRef, useState } from 'react';
import userContext from '../user/userContext';

const NoteState = (props) => {
    const host = "http://localhost:8080/journal";
    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial);
    const [noteLoad , setnoteLoad] = useState(false);

    const[noteitem , setNoteitem] = useState({_id:"" , course:"" , title:"" , content:""})

    // Get all notes
    const getNotes = async (name , pass) => {
        // API Call
        setnoteLoad(true);
        const response = await fetch(`${host}/get-entries`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Authorization': `Basic ${btoa(`${localStorage.getItem('userName')}:${localStorage.getItem('password')}`)}`,
                "Content-Type": "application/json"
            }
        });
        if(response.ok){
            const json = await response.json();
            setNotes(json);
            // setNotes(notes.reverse());
        }
        setnoteLoad(false);
    }

    // Add a note
    const addNote = async (course, title, content) => {
        // API Call
        setnoteLoad(true);
        const response = await fetch(`${host}/create-entry`, {
            //mode: 'no-cors',
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Basic ${btoa(`${localStorage.getItem('userName')}:${localStorage.getItem('password')}`)}`
            },
            body: JSON.stringify({course , title , content}), // body data type must match "Content-Type" header
        });
        const newnote = await response.json();
        console.log(newnote);
        console.log("new note added!");
        setNotes(notes.concat(newnote));
        setnoteLoad(false);
    }

    // Delete a note
    const deleteNote = async (id) => {
        console.log(id);
        setnoteLoad(true);
        const response = await fetch(`${host}/delete-entry/${id}`, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Basic ${btoa(`${localStorage.getItem('userName')}:${localStorage.getItem('password')}`)}`
            },
        }); 

        const txt = await response.text(); // parses JSON response into native JavaScript object
        console.log(txt);

        let newnotes = notes.filter((note) => {
            return note._id !== id;
        });

        if(response.ok){
            let newnotes = notes.filter((note) => {
                return note._id !== id;
            });
            setNotes(newnotes);
        }
        // getNotes();
        setnoteLoad(false);
    }

    // Edit a note
    const editNote = async (course , title , content ,id) => {
        // API Call
        setnoteLoad(true);
        const response = await fetch(`${host}/update-entry/${id}`, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Basic ${btoa(`${localStorage.getItem('userName')}:${localStorage.getItem('password')}`)}`
            },
            body: JSON.stringify({course , title , content}), // body data type must match "Content-Type" header
        });
        const txt = await response.text(); // parses JSON response into native JavaScript object
        //console.log(txt);

        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                notes[index].title = title;
                notes[index].course = course;
                notes[index].content = content;
                break;
            }
        }
        //console.log(notes);
        setNotes(notes);            
        getNotes();         // for fetching all the updated notes from server to display to client.
        setnoteLoad(false);
    }

    // // Get all notes by Tag
    // const getNotesByTag = async (tag) => {
    //     // API Call
    //     setnoteLoad(true);
    //     const response = await fetch(`${host}/api/notes/fetchNotesByTag`, {
    //         method: "POST", // *GET, POST, PUT, DELETE, etc.
    //         headers: {
    //             "Content-Type": "application/json",
    //             "auth-token": localStorage.getItem('token')
    //         },
    //         body: JSON.stringify({tag}),
    //     });
    //     const json = await response.json();
    //     // console.log("getting all notes");
    //     console.log(json);
    //     setNotes(json);
    //     setnoteLoad(false);
    // }

    // // Delete all notes of a User
    // const deleteAllNotes = async () => {
    //     const response = await fetch(`${host}/api/notes/deleteAllNotes`, {
    //         method: "DELETE",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "auth-token": localStorage.getItem('token')
    //         }
    //     })
    //     const json = await response.json();
    //     console.log(json);
    // }

    // Save a shared note
    // const saveSharedNote = async (title, description, tag , expdate , email) => {
        
    //     return false;
    // }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote , getNotes , noteLoad , setNotes}}> 
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;