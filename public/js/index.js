$(document).ready(function() {
  var flag = true;
  $('.switch').click(function() {
    if(flag) {
      $('.flipper').css('transform', 'rotateY(180deg)');
      flag = false;
    } else {
      $('.flipper').css('transform', 'rotateY(0deg)');
      flag = true;
    }
  });

  
})