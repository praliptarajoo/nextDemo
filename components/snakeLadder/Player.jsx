// components/Player.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserSecret } from '@fortawesome/free-solid-svg-icons';

const Player = ({ name, position, playerNumber }) => {
  return (
    <div className={`player player${playerNumber}`}>
      <div className="player-icon">
        {playerNumber === 1 ? (
          <FontAwesomeIcon icon={faUser} />
        ) : (
          <FontAwesomeIcon icon={faUserSecret} />
        )}
      </div>
      <div className="player-info">
        <div className="player-name">{name}</div>
        <div className="player-position">Position: {position}</div>
      </div>
    </div>
  );
};

export default Player;
