import { useState, useEffect } from 'react';
import Board from './Board';
import Player from './Player';
import Dice from './Dice';
import { userService } from 'services';
import { snakesAndLadders } from './Constant';


const SnakeLadderGame = () => {
  const [users, setUsers] = useState(null);
  const [players, setPlayers] = useState([
    // { name: 'Player 1', position: 0, playerNumber: 1 },
    // { name: 'Player 2', position: 0, playerNumber: 2 },
  ]);

  useEffect(() => {
      userService.getAll().then(x => setUsers(x));
  }, []);

  useEffect(() => {
    if (users) {
      const initialPlayers = users.map((user, index) => ({
        name: user.firstName, 
        position: 0,
        playerNumber: index + 1, 
      }));
      setPlayers(initialPlayers);
    }
  }, [users]);
  
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [diceResult, setDiceResult] = useState(null);
  const [winner, setWinner] = useState(null); // Winner track

  const rollDice = () => {
    if (winner) {
      return;
    }

    const result = Math.floor(Math.random() * 6) + 1;
    setDiceResult(result);

    // Update player's position
    const newPlayers = [...players];
    if (newPlayers[currentPlayerIndex].position+result <= 100) {
      newPlayers[currentPlayerIndex].position += result;
      setPlayers(newPlayers);
    }

    if (newPlayers[currentPlayerIndex].position >= 100) {
      setWinner(newPlayers[currentPlayerIndex]);
    } else {
      setCurrentPlayerIndex(currentPlayerIndex === 0 ? 1 : 0);
    }

    //if current is snake or ladder move accordingly 
    if (newPlayers[currentPlayerIndex].position in snakesAndLadders) {
      setTimeout(() => {
        const updatedPlayers = [...newPlayers];
        updatedPlayers[currentPlayerIndex].position = snakesAndLadders[updatedPlayers[currentPlayerIndex].position].to;
        setPlayers(updatedPlayers);
      }, 1000); // 1-second delay
    }    
  };

  return (
    <div className="snake-ladder-game container text-center d-flex flex-column align-items-center justify-content-center">
      <h1>Snake and Ladder Game</h1>
      {players.length>0 ? (<><div className="players-info">
        <Player
          name={players[0].name}
          position={players[0].position}
          playerNumber={players[0].playerNumber}
          winner={winner && winner.playerNumber === 1}
        />
        <Player
          name={players[1].name}
          position={players[1].position}
          playerNumber={players[1].playerNumber}
          winner={winner && winner.playerNumber === 2}
        />
      </div>
      <Board
        cells={Array.from({ length: 100 }, (_, i) => i + 1)}
        player1Position={players[0].position}
        player2Position={players[1].position}
      /></>): (<p>Loading...</p>)}
      <Dice result={diceResult} />
      {!winner ? (
        <button onClick={rollDice}>Roll Dice</button>
      ) : (
        <div className="winner-message">
          {winner.name} has won the game!
        </div>
      )}
    </div>
  );
};

export default SnakeLadderGame;
