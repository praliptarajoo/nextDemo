// components/Dice.jsx
import React from 'react';

const Dice = ({ result }) => {
  return (
    <div className="dice">
      <p>Dice Result: {result}</p>
    </div>
  );
};

export default Dice;
