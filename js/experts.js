(function ($, root, undefined) {$(function () {'use strict'; // on ready start
///////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////
//      Expand Interview
///////////////////////////////////////

$('.js-interview-questions').hide();
$('.js-interview-toggle').on('click',function(e){
  e.preventDefault();
  // finds closest interview
  var parent = $(this).closest('.js-interview'),
      interview = $('.js-interview-questions',parent);

  // shows and hides interview
  interview.stop().slideToggle(600);

  // Toggles between the text content
  if ($(this).text() === 'Read Interview') {
    $(this).text('Hide Interview');
  } else {
    $(this).text('Read Interview');
  }
});


///////////////////////////////////////////////////////////////////////////////
});})(jQuery, this); // on ready end
