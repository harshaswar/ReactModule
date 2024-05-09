// Notes.jsx
import React, { useState, useEffect } from 'react';
import './styles/Notes.css';
import sendEnabled from '../../../public/assets/sendEnabled.svg';
import sendDisabled from '../../../public/assets/sendDisabled.svg'

function Notes({ groupName, notes, onAddNote,groupColor }) {
  const [newNote, setNewNote] = useState('');

  const getCurrentDateTime = () => {
    const now = new Date();

    const dateOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };

    const date = now.toLocaleDateString('en-US', dateOptions);
    const time = now.toLocaleTimeString('en-US', timeOptions);

    return `<b>${date}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${time}`;
  };

  const handleAddNote = () => {
    if (newNote.trim() !== '') {
      onAddNote({ content: newNote, timestamp: getCurrentDateTime() });
      setNewNote('');
    }
  };

  return (
    <div className="notes-container">
      <div className='name-container'>
        <div className='prof-picture' style={{ backgroundColor: groupColor }}>
          {groupName.slice(0, 2)}
        </div>
        <h3 className='name'>{groupName}</h3>
      </div>

      <div className='notes-group'>
        {notes.map((note, index) => (
          <div className='chat-message' key={index}>
            <p className='note-content'>{note.content}</p>
            <span className='timestamp' dangerouslySetInnerHTML={{ __html: note.timestamp }} />
          </div>
        ))}

      </div>

      <div className="input-container">
        <textarea
          rows={50}
          cols={50}
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Enter your text here........."
          className="note-input"
        />
        <img
          src={newNote.trim() === '' ? sendDisabled : sendEnabled}
          onClick={handleAddNote}
          className='send-btn'
          alt="send"
          style={{ cursor: newNote.trim() === '' ? 'not-allowed' : 'pointer' }}
        />
      </div>
    </div>
  );
}

export default Notes;
