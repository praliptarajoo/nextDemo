function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const cells = Array.from({ length: 100 }, (_, i) => i + 1);
shuffleArray(cells);

const numberOfSnakes = 5;
const numberOfLadders = 5;
const shuffledSnakes = cells.slice(0, numberOfSnakes);
const shuffledLadders = cells.slice(numberOfSnakes, numberOfSnakes + numberOfLadders);

const snakesAndLadders = {};

shuffledSnakes.forEach((cell, index) => {
  let destination = Math.floor(Math.random() * cell);
  // Check if the destination is already a snake or ladder cell, and generate a new one if it is
  while (snakesAndLadders[destination]) {
    destination = Math.floor(Math.random() * cell);
  }
  snakesAndLadders[cell] = {
    to: destination,
    type: 'snake',
  };
});

shuffledLadders.forEach((cell, index) => {
  let destination = Math.floor(Math.random() * (100 - cell) + cell + 1);
  // Check if the destination is already a snake or ladder cell, and generate a new one if it is
  while (snakesAndLadders[destination]) {
    destination = Math.floor(Math.random() * (100 - cell) + cell + 1);
  }
  snakesAndLadders[cell] = {
    to: destination,
    type: 'ladder',
  };
});

export { snakesAndLadders };
