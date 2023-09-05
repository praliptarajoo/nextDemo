function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  const cells = Array.from({ length: 100 }, (_, i) => i + 1);
  shuffleArray(cells);
  
  const numberOfSnakes = 10; 
  const numberOfLadders = 10;
  const shuffledSnakes = cells.slice(0, numberOfSnakes);
  const shuffledLadders = cells.slice(numberOfSnakes, numberOfSnakes + numberOfLadders);
  
  const snakesAndLadders = {};
  
  shuffledSnakes.forEach((cell, index) => {
    snakesAndLadders[cell] = {
      to: Math.floor(Math.random() * cell), 
      type: 'snake',
    };
  });
  
  shuffledLadders.forEach((cell, index) => {
    snakesAndLadders[cell] = {
      to: Math.floor(Math.random() * (100 - cell) + cell + 1),
      type: 'ladder',
    };
  });
  
  export { snakesAndLadders };
  
  