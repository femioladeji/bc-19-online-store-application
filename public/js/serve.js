$(document).ready(function() {
  var myGlobal = new MyGlobal();
  $('a').click(function(event) {
    event.preventDefault();
    var redirect = myGlobal.pageRedirect('/stores');
    redirect.done(function(page) {
      $('html').html(page);
    })
  })
})