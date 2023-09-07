import React, { useState, useEffect } from "react";
import Board from "./Board";
import Player from "./Player";
import Dice from "./Dice";
import { userService } from "services";
import { snakesAndLadders } from "./Constant";

const SnakeLadderGame = () => {
  const [birdClassName, setBirdClassName] = useState("");
  const [users, setUsers] = useState(null);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    userService.getAll().then((x) => setUsers(x));
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

    var elDiceOne = document.getElementById("dice");

    const result = Math.floor(Math.random() * 6) + 1;
    setDiceResult(result);

    for (var i = 1; i <= 6; i++) {
      elDiceOne.classList.remove("show-" + i);
      if (result === i) {
        elDiceOne.classList.add("show-" + i);
      }
    }

    // Update player's position
    const newPlayers = [...players];
    if (newPlayers[currentPlayerIndex].position + result <= 100) {
      newPlayers[currentPlayerIndex].position += result;
      setPlayers(newPlayers);
    }

    if (newPlayers[currentPlayerIndex].position >= 100) {
      setWinner(newPlayers[currentPlayerIndex]);
    } else {
      setCurrentPlayerIndex(currentPlayerIndex === 0 ? 1 : 0);
    }

    // If current position is a ladder, move the bird to the destination
    if (newPlayers[currentPlayerIndex].position in snakesAndLadders) {
      const startCell = newPlayers[currentPlayerIndex].position;
      const destinationCell = snakesAndLadders[startCell].to;
      const updatedPlayers = [...newPlayers];

      // Calculate the left position for the bird's animation
      const birdStartPosition = startCell * 44;
      const birdDestinationPosition = destinationCell * 44;

      // Set the bird animation class and style
      setBirdClassName(
        `bird ${
          birdStartPosition < birdDestinationPosition ? "fly-right" : "fly-left"
        }`
      );

      // Update the player's position
      updatedPlayers[currentPlayerIndex].position = destinationCell;
      setPlayers(updatedPlayers);

      // Delay to match the bird animation duration (adjust as needed)
      setTimeout(() => {
        setBirdClassName("");
      }, 2000); // 2 seconds (adjust the duration as needed)
    }
  };

  return (
    <div className="snake-ladder-game container text-center d-flex align-items-center justify-content-center">
      <div className="left-content">
        <h1>Snake and Ladder Game</h1>
        {players.length > 0 ? (
          <>
            <div className="players-info">
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
            {!winner ? (
              <button id="roll" className="roll-button" onClick={rollDice}>
                Roll Dice
              </button>
            ) : (
              <div className="winner-message">
                {winner.name} has won the game!
              </div>
            )}
          </>
        ) : (
          <p>Loading...</p>
        )}
        <Dice result={diceResult} />
        <div className="game">
          <div className="container">
            <div id="dice" className="dice dice-one">
              <div id="dice-one-side-one" className="side one">
                <div className="mark one-1"></div>
              </div>
              <div id="dice-one-side-two" className="side two">
                <div className="mark two-1"></div>
                <div className="mark two-2"></div>
              </div>
              <div id="dice-one-side-three" className="side three">
                <div className="mark three-1"></div>
                <div className="mark three-2"></div>
                <div className="mark three-3"></div>
              </div>
              <div id="dice-one-side-four" className="side four">
                <div className="mark four-1"></div>
                <div className="mark four-2"></div>
                <div className="mark four-3"></div>
                <div className="mark four-4"></div>
              </div>
              <div id="dice-one-side-five" className="side five">
                <div className="mark five-1"></div>
                <div className="mark five-2"></div>
                <div className="mark five-3"></div>
                <div className="mark five-4"></div>
                <div className="mark five-5"></div>
              </div>
              <div id="dice-one-side-six" className="side six">
                <div className="mark six-1"></div>
                <div className="mark six-2"></div>
                <div className="mark six-3"></div>
                <div className="mark six-4"></div>
                <div className="mark six-5"></div>
                <div className="mark six-6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="right-content">
        {players.length > 0 ? (
          <Board
            cells={Array.from({ length: 100 }, (_, i) => i + 1)}
            player1Position={players[0].position}
            player2Position={players[1].position}
            birdClassName={birdClassName}
          />
        ) : (
          <p>loading...</p>
        )}
      </div>
    </div>
  );
};

export default SnakeLadderGame;
