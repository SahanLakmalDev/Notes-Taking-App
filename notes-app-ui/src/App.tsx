import React, { useState } from 'react';
import './App.css';

type Note = {
  id:number,
  title:string,
  content:string
};

function App() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "test note 1",
      content: "bla bla note1",
    },
    {
      id: 2,
      title: "test note 2 ",
      content: "bla bla note2",
    },
    {
      id: 3,
      title: "test note 3",
      content: "bla bla note3",
    },
    {
      id: 4,
      title: "test note 4 ",
      content: "bla bla note4",
    },
    {
      id: 5,
      title: "test note 5",
      content: "bla bla note5",
    },
    {
      id: 6,
      title: "test note 6",
      content: "bla bla note6",
    },
  ]);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleNoteClick = (note:Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  }

  const handleAddNote = (event:React.FormEvent) => {
    event.preventDefault();

    const newNote:Note = {
      id: notes.length + 1,
      title: title,
      content: content,
    };
    
    setNotes([newNote, ...notes]);

    setTitle('');
    setContent('');
  };

  const handleUpdateNote = (event:React.FormEvent) => {
    event.preventDefault();

    if(!selectedNote){
      return;
    }
    const updateNote:Note = {
      id:selectedNote.id,
      title: title,
      content: content,
    
    };
    const updateNotesList = notes.map((note) => (
      note.id === selectedNote.id ? updateNote : note
    ));
    setNotes(updateNotesList);
    setSelectedNote(null);
    setTitle('');
    setContent(''); 
  };

  const handleCancel = () => {
    setSelectedNote(null);
    setTitle('');
    setContent('');
  
  }



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
              <button>x</button>
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
