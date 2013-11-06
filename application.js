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
                     ['2','4','6']
                    ]

function checkWin() {
  for(var i=0; i<winConditions.length; i++) {
    if (winFound(winConditions[i], playerSquares)) {
      alert('You won!');
      $('td').off('click');
    }
    else if (winFound(winConditions[i], computerSquares)) {
      alert('You lost!');
      $('td').off('click');
    }
  }
}

function winFound(winningSet, claimedSquares) {
  for(var i=0; i<winningSet.length; i++) {
    if (claimedSquares.indexOf(winningSet[i]) === -1) {
      return false;
    }
  }
  return true;
}

function claimSquare(id, player) {
  var square = '#' + id
  if (player) {
    $(square).text('X');
    playerSquares.push(id);
  }
  else {
    $(square).text('O');
    computerSquares.push(id);
  }
  $(square).off('click');
  emptySquares.splice(emptySquares.indexOf(id), 1)
}

function almostWin() {
  for(var i=0; i<winConditions.length; i++) {
    if (oneAway(winConditions[i], playerSquares) || oneAway(winConditions[i], computerSquares)) {
      for(var j=0; j<3; j++) {
        var target = winConditions[i][j];
        if (emptySquares.indexOf(target) > -1) {
          return target;
        }
      }
    }
  }
  return false;
}

function oneAway(winningSet, claimedSquares) {
  var claimed = 0;
  for(var i=0; i<winningSet.length; i++) {
    if (claimedSquares.indexOf(winningSet[i]) > -1) {
      claimed += 1;
    }
    if (claimed === 2) {
      return true;
    }
    if (i === 2) {
      claimed = 0;
    }
  }
  return false;
}

function computerMove() {
  if (almostWin()) {
    claimSquare(almostWin());
  }
  else if (emptySquares.indexOf('4') > -1) {
    claimSquare('4');
  }
  else {
    claimSquare(emptySquares[0]);
  }
  checkWin();
}

$(document).ready(function() {

  $('td').click(function() {
    claimSquare(this.id, 'player');
    checkWin();
    if (emptySquares.length === 0) {
      alert('No more empty spaces. It\'s a tie!');
    }
    computerMove();
  });

});