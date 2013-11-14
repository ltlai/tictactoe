var playerSquares = []
var computerSquares = []
var emptySquares = ['0','1','2','3','4','5','6','7','8']
var winConditions = [['0','1','2'],
                     ['3','4','5'],
                     ['6','7','8'],
                     ['0','3','6'],
                     ['1','4','7'],
                     ['2','5','8'],
                     ['0','4','8'],
                     ['2','4','6']]

function gameWon(winningSet, claimedSquares) {
  for(var i=0; i<winningSet.length; i++) {
    if (claimedSquares.indexOf(winningSet[i]) === -1) {
      return false;
    }
  }
  return true;
}

function checkWin() {
  for(var i=0; i<winConditions.length; i++) {
    if (gameWon(winConditions[i], playerSquares)) {
      alert('You won!');
      $('td').off('click');
    }
    else if (gameWon(winConditions[i], computerSquares)) {
      alert('You lost!');
      $('td').off('click');
    }
  }
}

function checkTie() {
  if (emptySquares.length === 0) {
    alert('Game over. It\'s a tie!');
  }
}

function claimSquare(id, player) {
  var cell = '#' + id
  if (player) {
    $(cell).text('X');
    playerSquares.push(id);
  }
  else {
    $(cell).text('O');
    computerSquares.push(id);
  }
  $(cell).off('click');
  emptySquares.splice(emptySquares.indexOf(id), 1)
}

function oneAwayFromWin(winningSet, claimedSquares) {
  var matched = 0;
  for(var i=0; i<winningSet.length; i++) {
    if (claimedSquares.indexOf(winningSet[i]) > -1) {
      matched += 1;
    }
    if (matched === 2) {
      return true;
    }
  }
  return false;
}

function nearWin() {
  for(var i=0; i<winConditions.length; i++) {
    if (oneAwayFromWin(winConditions[i], playerSquares) || oneAwayFromWin(winConditions[i], computerSquares)) {
      for(var j=0; j<3; j++) {
        var targetSquare = winConditions[i][j];
        if (emptySquares.indexOf(targetSquare) > -1) {
          return targetSquare;
        }
      }
    }
  }
  return false;
}

function computerMove() {
  if (nearWin()) {
    claimSquare(nearWin());
  }
  else if (emptySquares.indexOf('4') > -1) {
    claimSquare('4');
  }
  else if (arraysEqual(playerSquares, ['2', '6'])) {
    claimSquare('1');
  }
  else {
    claimSquare(emptySquares[0]);
  }
  checkWin();
}

function arraysEqual(a, b) {
  var i = a.length;
  if (i != b.length) {
    return false;
  }
  while (i--) {
    if (a.sort()[i] !== b.sort()[i]) {
      return false;
    }
  }
  return true;
}

$(document).ready(function() {
  $('td').click(function() {
    claimSquare(this.id, 'player');
    checkWin();
    checkTie();
    computerMove();
  });
});