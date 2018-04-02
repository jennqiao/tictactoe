

document.addEventListener('DOMContentLoaded', function(event) {

  //model

  var game = [[0,0,0], [0,0,0], [0,0,0]];
  var firstPlayerGoesFirst = true;
  var winner = null;

  var firstPlayerWinCount = 0;
  var secondPlayerWinCount = 0;

  var checkForWinners = function() {

    var hasWinner = false;

    //check rows
    for (var i=0; i<game.length; i++) {
      var rowSum = 0;
      var row = game[i];
      for (var t=0; t<row.length; t++) {
        rowSum += row[t];
      }
      if (rowSum === 3 || rowSum === -3) {
        hasWinner = true;
        winner = (rowSum===3) ? 'First Player' : 'Second Player';
      }
    }


    //check columns
    for (var c=0; c<game[0].length; c++) {
      
      var colSum = 0;
      for (var r=0; r<game.length; r++) {
        colSum += game[r][c];
      }

      if (colSum === 3 || colSum === -3) {
        hasWinner = true;
        winner = (colSum===3) ? 'First Player' : 'Second Player';

      }

    }

    
    //check diagonals
    var leftDiag = game[0][2] + game[1][1] + game[2][0];
    var rightDiag = game[0][0] + game[1][1] + game[2][2];
    if (leftDiag === 3 || leftDiag === -3) {
      hasWinner = true;
        winner = (leftDiag===3) ? 'First Player' : 'Second Player';

    } else if (rightDiag === 3 || rightDiag === -3) {
      hasWinner = true;
      winner = (rightDiag===3) ? 'First Player' : 'Second Player';

    }
    
    if (hasWinner) {
      renderWinner();
    }

  }



  //controller

  var handleSquareClick = function(e) {

    //change model board
    var position = e.target.getAttribute('data-position').split(',');
    game[position[0]][position[1]] = firstPlayerGoesFirst ? 1 : -1;

    // renderBoard();
    var mark = firstPlayerGoesFirst ? 'X' : 'O';
    e.target.innerHTML = mark;

    //change firstPlayerGoesFirst
    firstPlayerGoesFirst = !firstPlayerGoesFirst;
    
    //check if any winners
    checkForWinners();

  }

  var handleButtonClick = function() {
    console.log('button is clicked!');
 
    //clear model board
    for (var i=0; i<game.length; i++) {
      var row = game[i];
      for (var c=0; c<row.length; c++) {
        row[c] = 0;
      }
    }

    //reset values
    winner = null;

    //get rid of congrats
    var congratsMessage = document.getElementById('congrats');
    congratsMessage.outerHTML = '';

    //clear dom
    var squares = document.getElementsByClassName('square');
    for (var i=0; i<squares.length; i++) {
      var square = squares[i];
      square.innerHTML = '_';
    }

  }

  var renderWinner = function() {

    //render congrats message
    var message = document.createElement('div');
    message.innerHTML = 'Congrats '+winner+"!";
    message.setAttribute("id", "congrats");

    var board = document.getElementById('body');
    board.append(message);


    //add to win count
    if (winner==="First Player") {
      firstPlayerWinCount += 1;
      firstPlayerGoesFirst = true;
    } else {
      secondPlayerWinCount +=1;
      firstPlayerGoesFirst = false;

    }

    //update scorecard

    var firstPlayerScore = document.getElementById('firstPlayerScore');
    firstPlayerScore.innerText = firstPlayerWinCount;

    var secondPlayerScore = document.getElementById('secondPlayerScore');
    secondPlayerScore.innerText = secondPlayerWinCount;
    

    console.log('first player count', firstPlayerWinCount);
    console.log('second player count', secondPlayerWinCount);


  }
  



  //view


  var board = document.getElementById('board');
  board.addEventListener('click', handleSquareClick);


  
  var button = document.getElementsByTagName('button');
  button[0].addEventListener('click', handleButtonClick);



  

});