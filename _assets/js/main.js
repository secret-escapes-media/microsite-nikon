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


$('.photo__content').click(function(){
  var details = $(this).find('.photo__details');
  if( details.hasClass('open') ){
    details.removeClass('open').slideUp();
  }else{
    details.addClass('open').slideDown();
  }
});





//## Singapore countdown
//##########################

$('.js-countdown').each(function() {
  // gets the expires date from the object
  var endDate = $(this).data('date');
  $(this).countdown(endDate, function(event) {

    if (event.offset.totalDays !== 0) {

      $(this).find('.btn').hide();
      $(this).removeClass('is-active').addClass('is-inactive');

      $(this).find('.countdown__days').html(event.strftime('%D'));
      $(this).find('.countdown__hours').html(event.strftime('%H'));
      $(this).find('.countdown__minutes').html(event.strftime('%M'));
      $(this).find('.countdown__seconds').html(event.strftime('%S'));
    }else{
      $(this).removeClass('is-inactive').addClass('is-active');
      $(this).find('.story__countdown').hide();
    }

  });
});

