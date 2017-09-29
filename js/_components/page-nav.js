
/* =========================================
//  PAGE NAV
// ========================================*/

function pagenav(){

  var offset = $('.banner').height();
  var st = $(document).scrollTop();

  if( st > offset ){
    $('.page-nav').addClass('show');
  }else{
    $('.page-nav').removeClass('show');
  }

}

$(document).ready(function() {
  pagenav();
});

$(document).scroll(function() {
  pagenav();
});
