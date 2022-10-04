import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext'
import AddNote from './AddNote';
import NoteItem from './NoteItem';

const Notes = (props) => {
    const context = useContext(noteContext)
    const { notes, getNotes, editNote } = context;

    let navigate = useNavigate();


    const [note, setNote] = useState({id: "", etitle:"", edescription:"", etag:""})


    // instead of component did mount we use useEffect Hook to fetch all notes or anything else

    useEffect(() => {

        if(localStorage.getItem('token')){
            
            getNotes()

        } else {

            navigate('/login')

        }
        // eslint-disable-next-line
    }, [])


    const updateNote = (currentNote) => {

        ref.current.click();
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
    }


    // handling form for editing
    
    const handleClick = (e) => {

        editNote(note.id, note.etitle, note.edescription, note.etag)
        closeRef.current.click();
        props.showAlert("Updated Successfully", "success")

    }

    const onChange = (e) => {

        setNote({...note, [e.target.name]: e.target.value})

    }


    const ref = useRef(null)
    const closeRef = useRef(null)


    return (
        <>
            <AddNote showAlert={props.showAlert}/>

            <button ref={ref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            Update Note Form
                            <form className='my-3'>
                                <div className="form-group">
                                    <label htmlFor="etitle">Title</label>
                                    <input type="email" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="edescription">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="etag">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} minLength={5} required />
                                </div>
        
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button ref={closeRef} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <h2>Your Notes</h2>
            <div className="row my-3">


                {notes.map((note) => {

                    return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}/>

                })}
            </div>

        </>
    )
}

export default Notes
