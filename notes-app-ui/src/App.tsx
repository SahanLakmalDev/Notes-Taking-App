import React, { useEffect, useState } from 'react';
import './App.css';

type Note = {
  id:number,
  title:string,
  content:string
};

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try{
        const response = await fetch ("http://localhost:5001/api/notes");
        const notes:Note[] = await response.json();
        setNotes(notes);
      }catch (e) {
        console.log(e);
      }
    };

    fetchNotes();
  }, []);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleNoteClick = (note:Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  }

  const handleAddNote = async (event:React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/api/notes",
        {
          method:"POST",
          headers:{
              'Content-Type':"application/json"
          },
          body: JSON.stringify({
            title,
            content
          })
      
        }
      );
      const newNote = await response.json();
      setNotes([newNote,...notes,]);
      setTitle('');
      setContent('');

    }catch (e){
      console.log(e);
    }
  };

  const handleUpdateNote = async (event:React.FormEvent) => {
    event.preventDefault();

    if(!selectedNote){
      return;
    }

    try {

      const response = await fetch(`http://localhost:5001/api/notes/${selectedNote.id}`,

        {
          method:'PUT',
          headers:{
              'Content-Type':"application/json"
          },
          body:JSON.stringify({
            title,
            content
          })
        }
      );
      const updateNote = await response.json();
    
      const updateNotesList = notes.map((note) => (
        note.id === selectedNote.id ? updateNote : note
      ));
      setNotes(updateNotesList);
      setSelectedNote(null);
      setTitle('');
      setContent(''); 
  
    }catch (e) {
      console.log(e)
    }
   
  };
  
  const handleCancel = () => {
    setSelectedNote(null);
    setTitle('');
    setContent('');
  
  }

  const deleteNote = async (event:React.MouseEvent, noteId:number) => {
    event.stopPropagation();

    try {

      const response = await fetch(`http://localhost:5001/api/notes/${noteId}`,
        {
          method:"DELETE"
        }
      );

      const filteredNotes = notes.filter((note) => note.id !== noteId);
      setNotes(filteredNotes);

    }catch (e) {
      console.log(e);
    }

  };

  return (
    <div className="app-container">
      <form action="" className="note-form" 
      onSubmit={selectedNote ? handleUpdateNote : handleAddNote}>
        <input 
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder='Title'/>

        <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        name="" id="" 
        rows={10} 
        placeholder='Content' 
        required>
        </textarea>
        {selectedNote ? (
          <div className='edit-buttons'>
            <button type='submit'>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <button type='submit'>Add Note</button> 
        )}
        
      </form>
      <div className="notes-grid">
        {notes.map((note) => (
          <div className="note-item" onClick={() => handleNoteClick(note)}>
            <div className="notes-header">
              <button onClick={(event) => deleteNote(event, note.id)}>
                x
              </button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}  
      </div>
    </div>
  );
}

export default App;
