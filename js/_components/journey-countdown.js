// loops through each offer on page and sets the current days remaining
$('.js-journey-countdown').each(function() {
  // gets the expires date from the object
  var livedate = $(this).data('date');
  $(this).countdown(livedate, function(event) {
    $(this).html(event.strftime(''
      + '<span class="countdown__item"><span class="countdown__num">%-m</span> month%!m</span>'
      + '<span class="countdown__item"><span class="countdown__num countdown__days">%-d</span> day%!d</span>'
      + '<span class="countdown__item"><span class="countdown__num countdown__hours">%-H</span> hour%!H</span>'
      + '<span class="countdown__item"><span class="countdown__num countdown__minutes">%-M</span> minute%!M</span>'
      + '<span class="countdown__item"><span class="countdown__num countdown__seconds">%S</span> second%!S</span>'));
  });
});