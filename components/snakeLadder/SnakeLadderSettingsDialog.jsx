/* SnakeLadderSettingsDialog.js */

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import { useRouter } from 'next/router';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
  },
  content: {
    background: 'none', // Make the modal content background transparent
    border: 'none', // Remove the border
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
  },
};

const SnakeLadderSettingsDialog = ({ isOpen, onSubmit, onClose }) => {
  const [numPlayers, setNumPlayers] = useState(2);
  const [level, setLevel] = useState('easy');
  const router = useRouter();

  const handleSubmit = () => {
    router.push({
      pathname: '/snake-ladder',
      query: { players: numPlayers, level },
    });
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      setNumPlayers(2);
      setLevel('easy');
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Snake & Ladder Settings"
      style={customStyles} // Apply custom styles
    >
      <div className="container settings-dialog">
        <h2>Snake & Ladder Settings</h2>
        <label>
          Number of Players:
          <input
            type="number"
            value={numPlayers}
            onChange={(e) => setNumPlayers(parseInt(e.target.value))}
          />
        </label>
        <label>
          Level:
          <select value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
        <button onClick={handleSubmit}>Start Game</button>
      </div>
    </Modal>
  );
};

export default SnakeLadderSettingsDialog;
