// general js for the project that wouldn't be a reuseable component


function bgFade(){
  var st = $(document).scrollTop();
  var wh = $(window).height();
  var opacity = ((wh - (st*2)) / -wh)+1;

  if(st<wh && opacity<0.9){
  	$('.js-overlay-fade').css({
  		"opacity": opacity
  	});
  }
}

bgFade();
$(document).scroll(function(){ bgFade(); });