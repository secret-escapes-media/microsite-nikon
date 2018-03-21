
// ========================================
//  BANNER VIDEO FOR OVERVIEW
// ========================================

var playBtn = $('.js-banner-play');

playBtn.click(function(){
  $('.banner--video').removeClass('video--inactive').addClass('video--active');
  $('.banner--video .banner__content').fadeOut();
  $('.banner--video .banner__video').fadeIn();
});
