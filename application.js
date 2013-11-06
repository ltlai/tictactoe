var turn = 'player';

$(document).ready(function() {

  if (turn==='player')
  {
    $('button').click(function() {
      $(this).text('X');
      var turn = 'computer';
      console.log('clicked');
      console.log(turn);
    });
  };

});