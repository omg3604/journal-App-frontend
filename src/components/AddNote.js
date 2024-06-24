import React from 'react'
import { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import "./AddNote.css"
import { courseOptions } from '../data';
import Select from 'react-select';

export default function Addnote(props) {

    const [lang, setlang] = useState("en-IN");

    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ course: "", title: "", content: "" });

    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRtl, setIsRtl] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.course , note.title, note.content);
        props.showAlert("success", "Note added Successfully!.")
        setNote({ course:"", title: "", content:"" });
        resetTranscript();
    }

    const onchange = (e) => {
        if (listening) {
            setNote({ ...note, content: transcript });
        }
        else {
            setNote({ ...note, [e.target.name]: e.target.value });
        }
    }

    const onCourseChange = (selectedCourse) => {
        if (selectedCourse) setNote({ ...note, course: selectedCourse.value });
        else setNote({ ...note, course: "" });
    }

    const onlangChange = (e) => {
        setlang(e.target.value);
    }

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Speech to text
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();


    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    const listenContinuously = () => {
        SpeechRecognition.startListening({
            continuous: true,
            language: lang,
        });
    };

    const stopListen = () => {
        SpeechRecognition.stopListening();
        setNote({ ...note, content: transcript });
        resetTranscript();
    }

    return (
        <div style={{backgroundColor : "#B3C8CF"}} className='p-1 rounded'>
            <div className="container my-5">
                <h2 style={{ color: "#19376D" }} className='text-center'>Add a Note</h2>
                <hr />
                <form id="contactForm" data-sb-form-api-token="API_TOKEN" className='container'>

                    {/* <div className="mb-3 d-flex justify-content-between">
                        <label className="form-label h5" htmlFor="course">Course : </label>
                        <input className="form-control w-50" id="course" type="text" name="course" placeholder="course" data-sb-validations="required" value={note.course} onChange={onchange} />
                        <div className="invalid-feedback" data-sb-feedback="course:required">Course is required.</div>
                    </div> */}

                    <div className='row my-2'>
                                                <label htmlFor="course" className='form-label'>Select Course : </label>
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


                    <div className="mb-3 d-flex justify-content-between">
                        <label className="form-label h5" htmlFor="title">Title : </label>
                        <input className="form-control w-50" id="title" type="text" name="title" placeholder="title" data-sb-validations="required" value={note.title} onChange={onchange} />
                        <div className="invalid-feedback" data-sb-feedback="title:required">Title is required.</div>
                    </div>

                    <div className="mb-3 d-flex justify-content-between flex-wrap">
                        <div className='d-flex flex-column'>
                            <label className="form-label h5" htmlFor="content">Content : </label>
                            <div className='d-flex justify-content-between align-items-center flex-wrap'>
                                <p className='my-0 mb-1'>Select language : </p>
                                <select className="select me-5 ms-1 rounded px-2" style={{ backgroundColor: "#19376D", color: "white" }} onChange={onlangChange}>
                                    <option value="en-IN">English-IND</option>
                                    <option value="en-US">English-US</option>
                                    <option value="hi-IN">Hindi</option>
                                    <option value="fr-FR">French</option>
                                    <option value="fa-IR">Farsi</option>
                                    <option value="it-IT">Italian</option>
                                </select>
                            </div>
                            <div className='d-flex align-items-center'>
                                <p className='mt-3'>Mic :</p>
                                <i className="fa-solid fa-circle-play fa-xl  mx-2 my-2 micicon" onClick={listenContinuously} style={{ color: "#3B71CA" }}></i>
                                <i className="fa-solid fa-circle-stop fa-xl  mx-2 my-2 micicon" onClick={stopListen} style={{ color: "#DC4C64" }}></i>
                                <div className='d-flex align-items-center'>
                                    {listening && <i className="fa-solid fa-microphone fa-fade fa-xl" style={{ color: "#bf1212" }}></i>}
                                    {listening && <p className='h5 mx-2 mt-2'>listening....</p>}
                                </div>
                            </div>
                        </div>
                        <textarea className="form-control w-50" rows="6" id="content" name="content" placeholder="Enter content here......" value={note.content || transcript} onChange={onchange}></textarea>
                        {/* <input className="form-control w-50" id="description" type="text" name="description" placeholder="description" style={{ height: "5rem" }} data-sb-validations="required" value={note.description || transcript} onChange={onchange}></input> */}
                    </div>

                    {/* <div className="mb-3">
                        <div className='d-flex justify-content-between align-items-center'>
                            <p className='form-label h5'>Select Tag : </p>
                            <select id="tag" className="select w-50 p-2 rounded" style={{ borderColor: "grey" }} name="tag" onChange={onchange}>
                                <option value="personal">Personal</option>
                                <option value="general">General</option>
                                <option value="business">Business</option>
                                <option value="routine">Routine</option>
                                <option value="routine">Default</option>
                            </select>
                        </div>
                    </div> */}

                    {/* <div className="mb-3 d-flex justify-content-between">
                        <label className="form-label h5" htmlFor="expdate">Expiry Date : </label>
                        <input className="form-control w-50" id="expdate" type="date" name="expdate" placeholder="" value={note.expdate} onChange={onchange} />
                        <div className="invalid-feedback" data-sb-feedback="expdate:required">Expiry Date is required.</div>
                    </div> */}

                    <div className="d-grid my-4">
                        <button className="btn btn-lg mx-2 btn-rounded addbtncss" style={{ backgroundColor: "#19376D", color: "white" }} id="submitButton" type="submit" onClick={handleClick}>Add Note</button>
                    </div>

                </form>
            </div>
            {/* <div className='container my-3'>
                <h2>Add a Note</h2>
                <form className='container '>
                    <div className="form-group d-flex my-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" placeholder="Enter title" value={note.title} onChange={onchange} required />
                    </div>
                    <div className="form-group d-flex my-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" placeholder="Enter description" value={note.description} onChange={onchange} required />
                    </div>
                    <div className="form-group d-flex my-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" placeholder="Note tag" value={note.tag} onChange={onchange} />
                    </div>
                    <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className='btn btn-primary my-3 btn-rounded' style={{ backgroundColor: "#92aad0", borderColor: "#92aad0" }} onClick={handleClick}>Add</button>
                </form>
            </div> */}
        </div>
    )
}