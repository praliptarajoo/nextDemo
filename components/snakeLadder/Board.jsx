import React from 'react';
import { snakesAndLadders } from './Constant';

const cellColors = ['rgb(197 54 54 / 39%)', 'rgb(62 159 1 / 41%)', 'rgb(87 51 255 / 29%)', 'rgb(255 173 51 / 31%)'];

const Board = ({ cells, player1Position, player2Position, birdClassName }) => {
  return (
    <div className="board mt-2">
      {cells.map((cell, index) => {
        const snakeOrLadder = snakesAndLadders[cell];

        const isSnake = snakeOrLadder && snakeOrLadder.type === 'snake';
        const isLadder = snakeOrLadder && snakeOrLadder.type === 'ladder';

        const backgroundColor = cellColors[index % cellColors.length];

        let ladderStart = null;
        let ladderEnd = null;

        if (isLadder) {
          ladderStart = cell;
          ladderEnd = snakeOrLadder.to;
        }

        return (
          <div key={index} className="cell" style={{ backgroundColor }}>
            <div
              className={`dot dot-player1 ${player1Position === cell ? 'active' : ''}`}
            ></div>
            <div
              className={`dot dot-player2 ${player2Position === cell ? 'active' : ''}`}
            ></div>
            {isSnake ? (
              <span className="snake">
                <img src="/images/snake.png" alt="snake" className="snake-image" />
              </span>
            ) : isLadder ? (
              <>
                <span className={`ladder ${birdClassName} ${ladderStart} ${ladderEnd}`}>
                  <img src="/images/ladder.png" alt="Ladder" className="ladder-image" />
                </span>
                {ladderStart !== null && ladderEnd !== null && (
                  <div className="route-line `{{ladderEnd}}" style={{
                    // width: `${Math.abs(ladderEnd - ladderStart) * 44}px`,
                    // left: `${Math.min(ladderStart, ladderEnd) * 44}px`,
                  }}></div>
                )}
              </>
            ) : null}
            {cell}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
