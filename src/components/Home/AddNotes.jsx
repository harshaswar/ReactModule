import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, useMediaQuery } from '@mui/material';

const COLORS = ['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF'];

function AddNotes({ open, onClose, onCreate }) {
  const [groupName, setGroupName] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  const isSmallScreen = useMediaQuery('(max-width:768px)');

  const handleCreate = () => {
    onCreate(groupName, selectedColor);
    setGroupName('');
    onClose();
  };

  const colorContainer = {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Group</DialogTitle>
      <DialogContent>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p>Enter Group Name</p>
          <TextField
            autoFocus
            margin="dense"
            type="text"
            fullWidth
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>

        <div style={colorContainer}>
          <p>Choose Color</p>
          {COLORS.map((color, index) => (
            <div
              key={index}
              style={{
                width: isSmallScreen ? '20px' : '30px',
                height: isSmallScreen ? '20px' : '30px',
                borderRadius: '50%',
                backgroundColor: color,
                cursor: 'pointer',
              }}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <button style={{
          width: '90px',
          padding: '5px',
          border: '2px',
          borderRadius: '10px',
          backgroundColor: '#001F8B',
          color: 'white'
        }}
          onClick={handleCreate}>Create</button>
      </DialogActions>
    </Dialog>
  );
}

export default AddNotes;
