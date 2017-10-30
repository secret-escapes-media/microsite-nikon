

// ========================================
// TESTIMONIAL SLIDER
// ========================================


var testimonialCarousel   = $('#testimonial-carousel'),
    carouselContainer     = $('.testimonial--carousel, .testimonial__slide'),
    carouselSlide         = $('.js-slide'),
    activeSlide           = $('.owl-item.active > .testimonial__slide'),
    transitionSpeed       = 1250;

testimonialCarousel.owlCarousel({
  items:1,
  loop:true,
  animateOut:'fadeOut',
  autoHeight:true,
  autoplay:true,
  autoplayTimeout:8000,
  dots:false,
  nav:false,
  navSpeed: transitionSpeed,
  smartSpeed: transitionSpeed,
  touchDrag: false,
  mouseDrag: false,
  callbacks:true
});



// keyboard nav for the active carousel
$(document.documentElement).keyup(function (event) {
  if (event.keyCode == 37) {  // left key press
    testimonialCarousel.trigger('prev.owl.carousel');
  } else if (event.keyCode == 39) {  // right key press
    testimonialCarousel.trigger('next.owl.carousel');
  }
});

// custom nav
$("#testimonial-carousel-prev").click(function(){
  testimonialCarousel.trigger('prev.owl.carousel')
});
$("#testimonial-carousel-next").click(function(){
  testimonialCarousel.trigger('next.owl.carousel')
});
