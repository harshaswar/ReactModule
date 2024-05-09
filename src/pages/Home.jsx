import React, { useState, useEffect } from 'react';
import './styles/Home.css';
import { AddNotes, Default, Notes } from '../components';

function Home() {
    const [open, setOpen] = useState(false);
    const [noteGroups, setNoteGroups] = useState([]);
    const [currentGroupIndex, setCurrentGroupIndex] = useState(null);

    
    useEffect(() => {
        const storedNotes = JSON.parse(localStorage.getItem('noteGroups')) || [];
        setNoteGroups(storedNotes);
    }, []);

    const saveNoteGroupsToLocalStorage = (noteGroups) => {
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
        saveNoteGroupsToLocalStorage(newNoteGroups);
    };

    const handleGroupClick = (index) => {
        setCurrentGroupIndex(index);
    };

    const handleAddNote = (note) => {
        const updatedGroups = [...noteGroups];
        updatedGroups[currentGroupIndex].notes.push(note);
        setNoteGroups(updatedGroups);
        saveNoteGroupsToLocalStorage(updatedGroups);
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
                {currentGroupIndex === null ? <Default /> : <Notes groupName={noteGroups[currentGroupIndex].name} notes={noteGroups[currentGroupIndex].notes} onAddNote={handleAddNote} groupColor={noteGroups[currentGroupIndex].color} />}
            </div>
        </div>
    );
}

export default Home;

