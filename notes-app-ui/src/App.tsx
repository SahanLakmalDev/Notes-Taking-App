
import './App.css';

function App() {
  return (
    <div className="app-container">
      <form action="" className="note-form">
        <input type="text" placeholder='Title'/>
        <textarea name="" id="" rows={10} placeholder='Content' required></textarea>
        <button type='submit'>Add Note</button>
      </form>
      <div className="notes-grid">
        <div className="note-item">
          <div className="notes-header">
            <button>x</button>
          </div>
          <h2>Note Title</h2>
          <p>Content</p>
        </div>
      </div>
    </div>
  );
}

export default App;
