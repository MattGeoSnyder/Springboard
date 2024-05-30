/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */


/** makeBoard: create in-JS board structure:
 *   board = array of rows, each row is array of cells  (board[y][x])
 */
let game;
let player1;
let player2;

class Game {
  constructor(height, width) {
    this.setHeight(height);
    this.setWdith(width);
    this.currPlayer = player1;
    this.board = [];
    this.over = false;

    this.makeBoard();
    this.makeHtmlBoard();
  }
  setHeight(height){
    if (typeof height === 'number' && height > -1){
      this.HEIGHT = height;
    } else {
      this.HEIGHT = 6;
    }
  }
  setWdith(width) {
    if (typeof width === 'number' && width > -1) {
      this.WIDTH = width;
    } else {
      this.WIDTH = 7;
    }
  }

  makeBoard() {
    for (let y = 0; y < this.HEIGHT; y++) {
      this.board.push(Array.from({ length: this.WIDTH }));
    }
  }

  makeHtmlBoard() {
    const board = document.getElementById('board');
  
    // make column tops (clickable area for adding a piece to that column)
    const top = document.createElement('tr');
    top.setAttribute('id', 'column-top');
    top.addEventListener('click', this.handleClick.bind(this));
  
    for (let x = 0; x < this.WIDTH; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }
  
    board.append(top);
  
    // make main part of board
    for (let y = 0; y < this.HEIGHT; y++) {
      const row = document.createElement('tr');
  
      for (let x = 0; x < this.WIDTH; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `${y}-${x}`);
        row.append(cell);
      }
  
      board.append(row);
    }
  
  }

  findSpotForCol(x) {
    for (let y = this.HEIGHT - 1; y >= 0; y--) {
      if (!(this.board[y][x])) {
        return y;
      }
    }
    return null;
  }

  placeInTable(y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.style.top = -50 * (y + 2);
    piece.style.backgroundColor = this.currPlayer.color;
  
    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }

  endGame(msg) {
    alert(msg);
    this.over = true;
  }

  handleClick(evt) {

    if(this.over){
      return;
    }

    // get x from ID of clicked cell
    const x = +evt.target.id;
  
    // get next spot in column (if none, ignore click)
    const y = this.findSpotForCol.call(this, x);
    if (y === null) {
      return;
    }
  
    // place piece in board and add to HTML table
    this.board[y][x] = this.currPlayer.number;
    this.placeInTable(y, x);
    
    // check for win
    if (this.checkForWin.call(this)) {
      return this.endGame(`Player ${this.currPlayer.number} won!`);
    }
    
    // check for tie
    if (this.board.every(row => row.every(cell => cell))) {
      return this.endGame('Tie!');
    }
      
    // switch players
    this.currPlayer = this.currPlayer === player1 ? player2 : player1;
  }

  checkForWin() {
    function _win(cells) {
      // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match currPlayer
      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.HEIGHT &&
          x >= 0 &&
          x < this.WIDTH &&
          this.board[y][x] === this.currPlayer.number
      );
    }
    
    let new_win = _win.bind(this);
    for (let y = 0; y < this.HEIGHT; y++) {
      for (let x = 0; x < this.WIDTH; x++) {
        // get "check list" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
  
        // find winner (only checking each win-possibility as needed)
        if (new_win(horiz) || new_win(vert) || new_win(diagDR) || new_win(diagDL)) {
          return true;
        }
      }
    }
  }
  
}

class Player {
  constructor(color, number) {
    this.color = color;
    this.number = number;
  }
}

function startGame(e){
  e.preventDefault();
  player1 = new Player(document.querySelector('#color-form').player1.value, 1);
  player2 = new Player(document.querySelector('#color-form').player2.value, 2);

  if (player1.color === player2.color) throw new Error('Players must have different colors');

  if(game){
    let gameDiv = document.querySelector('#game');
    let board = document.createElement('table');

    gameDiv.removeChild(gameDiv.children[0]);
    gameDiv.appendChild(board);

    board.id = 'board';
    game = new Game(6,7);
  } else {
    game = new Game(6,7);
  } 
}

let start = document.querySelector('#new-game');
start.addEventListener('click', startGame);
