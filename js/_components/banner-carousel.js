

/* =========================================
//  BANNER IMAGE SLIDER
// ========================================*/


var homeCarousel          = $('.owl-carousel'),
    carouselContainer     = $('.banner--carousel, .banner__slide'),
    carouselPhotoID       = $('.js-slide-photo'),
    carouselPhotoTitle    = $('.js-slide-photo-title'),
    carouselPhotoLocation = $('.js-slide-photo-location'),
    carouselPhotoLink     = $('.js-slide-photo-link'),
    activeSlide           = $('.owl-item.active > .banner__slide'),
    transitionSpeed       = 1250

homeCarousel.owlCarousel({
  items:1,
  loop:true,
  animateOut:'fadeOut',
  autoHeight:true,
  autoplay:true,
  autoplayTimeout:8000,
  dots:false,
  nav: true,
  navSpeed: transitionSpeed,
  smartSpeed: transitionSpeed,
  touchDrag: false,
  mouseDrag: false,
  callbacks:true,
});



// Gets slide information from active slide, and populate info divs
function sliderContentRefresh(){
  var currentPhotoID       = $('.owl-item.active > .banner__slide').data('photo'),
      currentPhotoTitle    = $('.owl-item.active > .banner__slide').data('photo-title'),
      currentPhotoLocation = $('.owl-item.active > .banner__slide').data('photo-location'),
      currentPhotoGroup    = $('.owl-item.active > .banner__slide').data('photo-group');
  carouselPhotoID.data('modal-id', currentPhotoID);
  carouselPhotoTitle.text(currentPhotoTitle);
  carouselPhotoLocation.text(currentPhotoLocation);
  // can this be more dynamic?
  carouselPhotoLink.attr('href', currentPhotoGroup + '/the-journey/' );
}



// the callbacks for the owlCarousel plugin are a bit crap and dont fire after
// the animation. Also if you do two drags in a row, it is very easy to break.
// This interval fires every half second to check the active class. I know its
// gross, but its the most reliable way to write this code. And its a small
// amount of processing every half second. Will need to test, but hopefully most
// browsers will handle it
setInterval(function() {
  if ($('.owl-item').hasClass('active')) {
    sliderContentRefresh();
  }
}, 500);
// THE OFFICIAL WAY : TRY TO MAKE THIS WORK
// homeCarousel.on('changed.owl.carousel', function(event) {
//   if ($('.owl-item').hasClass('active')) {
//     sliderContentRefresh();
//   }
// });



// keyboard nav for the active carousel
$(document.documentElement).keyup(function (event) {
  if (event.keyCode == 37) {  // left key press
    homeCarousel.trigger('prev.owl.carousel');
  } else if (event.keyCode == 39) {  // right key press
    homeCarousel.trigger('next.owl.carousel');
  }
});
