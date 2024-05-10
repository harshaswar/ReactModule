import React, { useState, useEffect } from 'react';
import './styles/Home.css';
import { AddNotes, Default, Notes } from '../components';

function Home() {
    const [open, setOpen] = useState(false);
    const [noteGroups, setNoteGroups] = useState([]);
    const [notesIndex, setNotesIndex] = useState(null);

    
    useEffect(() => {
        const storedNotes = JSON.parse(localStorage.getItem('noteGroups')) || [];
        setNoteGroups(storedNotes);
    }, []);

    const addToLocalStorage = (noteGroups) => {
        localStorage.setItem('noteGroups', JSON.stringify(noteGroups));
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCreateGroup = (groupName, color) => {
        const newNoteGroups = [...noteGroups, { name: groupName, notes: [], color }];
        setNoteGroups(newNoteGroups);
        addToLocalStorage(newNoteGroups);
    };

    const handleGroupClick = (index) => {
        setNotesIndex(index);
    };

    const handleAddNote = (note) => {
        const updatedGroups = [...noteGroups];
        updatedGroups[notesIndex].notes.push(note);
        setNoteGroups(updatedGroups);
        addToLocalStorage(updatedGroups);
    };

    return (
        <div className='main'>
            <div className='notes-list'>
                <p className='heading'><b>Pocket Notes</b></p>
                <div style={{ fontSize: '20px' }}>
                    {noteGroups.map((group, index) => (
                        <div key={index} className='group-name' onClick={() => handleGroupClick(index)}>
                            <div className='profile-picture' style={{ backgroundColor: group.color }}>
                                {group.name.slice(0, 2)}
                            </div>
                            {group.name}
                        </div>
                    ))}
                </div>
                <div className='add-container'>
                    <button className='add-btn' onClick={handleOpen}>+</button>
                    <AddNotes open={open} onClose={handleClose} onCreate={handleCreateGroup} onAddNote={handleAddNote} />
                </div>
            </div>

            <div className='right-section'>
                {notesIndex === null ? <Default /> : <Notes groupName={noteGroups[notesIndex].name} notes={noteGroups[notesIndex].notes} onAddNote={handleAddNote} groupColor={noteGroups[notesIndex].color} />}
            </div>
        </div>
    );
}

export default Home;

