import React, { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props) => {

  const host = "http://localhost:5000";

  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial)

  // GET ALL NOTES

  const getNotes = async () => {

    // API call

    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMzMzQxYTk3YzM3YzdjMWI5MDViMjZkIn0sImlhdCI6MTY2NDM1NTA3OH0.9HNvYJthdOhcecVIXj2RqdjIxRU347riLMdW89MW9WU'

      },
    });
    const json = await response.json();
    console.log(json)
    setNotes(json);


  }


  // Add Note
  const addNote = async (title, description, tag) => {

    // API call

    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMzMzQxYTk3YzM3YzdjMWI5MDViMjZkIn0sImlhdCI6MTY2NDM1NTA3OH0.9HNvYJthdOhcecVIXj2RqdjIxRU347riLMdW89MW9WU'

      },
      body: JSON.stringify({title, description, tag})
    });
    const note = await response.json();
    setNotes(notes.concat(note))

  }

  // DELETE NOTES

  
  const deleteNote = async (id) => {
    // API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMzMzQxYTk3YzM3YzdjMWI5MDViMjZkIn0sImlhdCI6MTY2NDM1NTA3OH0.9HNvYJthdOhcecVIXj2RqdjIxRU347riLMdW89MW9WU'
  
      },
    });
    const json = response.json();
    
    const newnotes = notes.filter((note) => { return note._id !== id })

    setNotes(newnotes);


  }

  // EDIT NOTES

  const editNote = async (id, title, description, tag) => {

    // fetch api
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMzMzQxYTk3YzM3YzdjMWI5MDViMjZkIn0sImlhdCI6MTY2NDM1NTA3OH0.9HNvYJthdOhcecVIXj2RqdjIxRU347riLMdW89MW9WU'


      },
      body: JSON.stringify({title, description, tag})
    });
    const json = response.json();

    let newNotes = JSON.parse(JSON.stringify(notes))

    // logic to edit notes
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {

        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }

    setNotes(newNotes);

  }


  return (

    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes}}>

      {props.children}

    </NoteContext.Provider>

  )

}

export default NoteState;



