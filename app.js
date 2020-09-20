document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const scoreKeeper = document.getElementById('score');
  const width = 28; //28 * 28 = 784 squares
  let score = 0;

  // Grid Layout (pacDot = 0, wall = 1, Ghost Lair = 2, Power Pellet = 3, Empty = 4)

  const layout =
  [
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
  1,3,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,3,1,
  1,0,1,0,1,1,0,1,1,1,1,1,0,0,0,0,1,1,1,1,1,0,1,1,0,1,0,1,
  1,0,1,0,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,0,1,0,1,
  1,0,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,0,1,
  1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,
  1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,0,1,0,1,
  1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,0,1,0,1,
  1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,0,1,0,1,
  1,0,1,0,1,1,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,1,1,0,1,0,1,
  1,0,1,0,1,1,1,4,1,1,1,1,5,2,2,5,1,1,1,1,4,1,1,1,0,1,0,1,
  1,0,1,0,1,1,1,4,1,1,1,5,2,2,2,2,5,1,1,1,4,1,1,1,0,1,0,1,
  1,0,1,0,1,1,1,4,1,1,1,5,2,7,8,2,5,1,1,1,4,1,1,1,0,1,0,1,
  1,0,0,0,1,1,1,4,1,1,5,2,2,6,6,2,2,5,1,1,4,1,1,1,0,0,0,1,
  1,0,1,1,1,1,1,4,1,1,5,2,2,2,2,2,2,5,1,1,4,1,1,1,1,1,0,1,
  1,0,1,1,1,1,1,4,1,1,1,5,2,2,2,2,5,1,1,1,4,1,1,1,1,1,0,1,
  1,0,1,1,1,1,1,4,1,1,1,1,6,5,5,6,1,1,1,1,4,1,1,1,1,1,0,1,
  4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,
  1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,
  1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,
  1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
  1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
  1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
  1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
  1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
  1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
];

squares = [];

function createBoard() {
  for (let i=0; i < layout.length; i++) {
    const square = document.createElement('div');
    grid.appendChild(square);
    squares.push(square);

    if (layout[i] === 0) {
      squares[i].classList.add('pac-dot');
    } else if (layout[i] === 1) {
      squares[i].classList.add('wall');
    } else if (layout[i] === 2) {
      squares[i].classList.add('ghost-lair');
    } else if (layout[i] === 3) {
      squares[i].classList.add('power-up');
    } else if (layout[i] === 5) {
      squares[i].classList.add('black-square');
    } else if (layout[i] === 6) {
      squares[i].classList.add('penguin-yellow');
    } else if (layout[i] === 7) {
      squares[i].classList.add('left-eye');
    } else if (layout[i] === 8) {
      squares[i].classList.add('right-eye');
    }
  }
}
createBoard();

let pacmanCurrentIndex = 490;

squares[pacmanCurrentIndex].classList.add('pac-man');

// Pacman movement logic
function movePacMan(e) {
  squares[pacmanCurrentIndex].classList.remove('pac-man');

  console.log(pacmanCurrentIndex);

  switch (e.keyCode) {
    case 37:
      if(pacmanCurrentIndex % width !== 0 &&
        !squares[pacmanCurrentIndex -1].classList.contains('wall') &&
        !squares[pacmanCurrentIndex -1].classList.contains('penguin-yellow') &&
        !squares[pacmanCurrentIndex -1].classList.contains('black-square') &&
        !squares[pacmanCurrentIndex -1].classList.contains('ghost-lair'))
        pacmanCurrentIndex -= 1;

        //check for exit
        if(pacmanCurrentIndex -1 === 475) {
          pacmanCurrentIndex = 503;
        }
      break
    case 38:
      if(pacmanCurrentIndex % width >= 0 &&
        !squares[pacmanCurrentIndex -width].classList.contains('wall') &&
        !squares[pacmanCurrentIndex -width].classList.contains('penguin-yellow') &&
        !squares[pacmanCurrentIndex -width].classList.contains('black-square') &&
        !squares[pacmanCurrentIndex -width].classList.contains('ghost-lair'))
          pacmanCurrentIndex -= width;
      break
    case 39:
      if(pacmanCurrentIndex % width < width -1 &&
        !squares[pacmanCurrentIndex +1].classList.contains('wall') &&
        !squares[pacmanCurrentIndex +1].classList.contains('penguin-yellow') &&
        !squares[pacmanCurrentIndex +1].classList.contains('black-square') &&
        !squares[pacmanCurrentIndex +1].classList.contains('ghost-lair'))
          pacmanCurrentIndex += 1;

          //check for exit
          if(pacmanCurrentIndex +1 === 504) {
            pacmanCurrentIndex = 476;
          }
      break
    case 40:
      if(pacmanCurrentIndex + width < width * width &&
        !squares[pacmanCurrentIndex +width].classList.contains('wall') &&
        !squares[pacmanCurrentIndex +width].classList.contains('penguin-yellow') &&
        !squares[pacmanCurrentIndex +width].classList.contains('black-square') &&
        !squares[pacmanCurrentIndex +width].classList.contains('ghost-lair'))
          pacmanCurrentIndex += width;
      break
  } //end of switch statement

  squares[pacmanCurrentIndex].classList.add('pac-man');

  ateDot();
  // atePowerUp()
  // checkForGameOver()
  // checkForWin()
}
document.addEventListener('keyup', movePacMan);


// Functions for play functionality
function ateDot() {
  if ( squares[pacmanCurrentIndex].classList.contains('pac-dot') ) {
    score++;
    scoreKeeper.innerHTML = score;
    squares[pacmanCurrentIndex].classList.remove('pac-dot');
  }
}

class Ghost {
  constructor(className, startIndex, speed) {
    this.className = className;
    this.startIndex = startIndex;
    this.speed = speed;
    this.currentIndex = startIndex;
    this.timerID = NaN;
  }
}

ghosts = [
  new Ghost('Blinky', 433, 250),
  new Ghost('Pinky', 403, 400),
  new Ghost('Inky', 408, 300),
  new Ghost('Clyde', 434, 500)
]

// Draw the ghosts
ghosts.forEach(ghost => {
  squares[ghost.currentIndex].classList.add(ghost.className);
  squares[ghost.currentIndex].classList.add('ghost');
});

// ghosts.forEach(ghost => moveGhost(ghost));


});
