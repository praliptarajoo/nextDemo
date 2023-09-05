import React from 'react';
import { snakesAndLadders } from './Constant';


const Board = ({ cells, player1Position, player2Position}) => {

  return (
    <div className="board">
      {cells.map((cell, index) => {
        const snakeOrLadder = snakesAndLadders[cell];

        const isSnake = snakeOrLadder && snakeOrLadder.type === 'snake';
        const isLadder = snakeOrLadder && snakeOrLadder.type === 'ladder';

        return (
          <div key={index} className="cell">
            <div
              className={`dot dot-player1 ${player1Position === cell ? 'active' : ''}`}
            ></div>
            <div
              className={`dot dot-player2 ${player2Position === cell ? 'active' : ''}`}
            ></div>
            {isSnake ? (
              <span className="snake">🐍</span>
            ) : isLadder ? (
              <span className="ladder">🪜</span>
            ) : null}
            {cell}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
