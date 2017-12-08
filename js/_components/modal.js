

// =========================================
//  MODAL
// =========================================


var modal           = $('.js-modal'),
    modalWrap       = $('.js-modal,.modal__wrap,.modal__item'),
    modalLaunchBtn  = $('.js-open-modal'),
    modalCloseBtn   = $('.js-close-modal'),
    modalTransition = 300; // must be the same as CSS transition duration


// -----------------------------------------
// Open modal and show selected modal__item

function modalOpen(event){

  event.preventDefault();

  if ( $(event.currentTarget).attr('data-modal-group') ) {
    var modalGroup = $(event.currentTarget).data('modal-group');
    modal.addClass('modal--carousel').addClass('modal--carousel-' + modalGroup);
    modal.data(modalGroup);
  }
  accordionReset(); // reset photo details to open state

  // hides all modal content
  $('.modal__item').addClass('is-closed').hide();
  // show specific modal content from element data attribute
  var modalItemID   = $(event.currentTarget).data('modal-item'),
      modalItem = '.modal__item--' + modalItemID;

  $(modalItem).removeClass('is-closed').addClass('is-open').show();
  // disable scrolling on background content (doesn't work iOS)
  $('body').addClass('disable-scroll');

  // // update video
  if( $(event.currentTarget).attr('data-video-id') ){
    var modalVideoId = $(event.currentTarget).data('video-id');
    var modalVideoLink = $(event.currentTarget).data('video-link');
    $('#modal__'+modalItemID).attr('src', 'https://www.youtube.com/embed/' + modalVideoId + '?enablejsapi=1&controls=1&rel=0&showinfo=0&modestbranding=1');
    $('.modal__cta__btn').attr('href', '/nikon/' + modalVideoLink);
  }

  // open modal
  modal.fadeIn(modalTransition, function(){
    $(this).removeClass('is-closed').addClass('is-open');
  });

}



// -----------------------------------------
// Closes modal and hides all content

function modalClose(event){
  event.preventDefault();
  $('body').removeClass('disable-scroll');
  // Reset scroll position
  setTimeout(function() {
    $('.modal__wrap').scrollTop(0);
  }, 280);

  // close modal with fade
  $('.js-modal.is-open').fadeOut(modalTransition, function(){
    $(this).removeClass('is-open').removeClass('modal--carousel').addClass('is-closed');
    $('.modal__item.is-open').removeClass('is-open').addClass('is-closed');
  });
  accordionReset(); // reset photo details to open state

  // disable video
  $('.modal__item.is-open .modal__iframe').attr('src', 'https://www.youtube.com/embed/');

}

// open modal when .js-open-modal is clicked
modalLaunchBtn.on('click', function(event) { modalOpen(event); });

// closes modal on close icon click
modalCloseBtn.on('click', function(event) { modalClose(event); });

// closes modal on background click
modalWrap.on('click', function(event) {
  if (event.target !== this){
    return;
  }
  modalClose(event);
});

// closes modal on escape key press
$(document).keyup(function(event) {
  if (event.keyCode == 27) {
    modalClose(event);
  }
});






/* =========================================
//  MODAL NAVIGATION
// ========================================*/



// -----------------------------------------
// Next button : launch next modal

function launchNextModal(){

  var currentItem = $('.modal__item.is-open'),
      nextItem    = currentItem.next('.modal__item');

  if( modal.hasClass('modal--carousel-page') ){
    var currentItemGroup    = currentItem.data('group-page'),
        nextItemGroup       = nextItem.data('group-page'),
        firstItem           = $('.modal__item[data-group-page="'+ currentItemGroup +'"]:first'),
        lastItem            = $('.modal__item[data-group-page="'+ currentItemGroup +'"]:last');
  }else if( modal.hasClass('modal--carousel-section') ){
    var currentItemGroup    = currentItem.data('group-section'),
        nextItemGroup       = nextItem.data('group-section'),
        firstItem           = $('.modal__item[data-group-section="'+ currentItemGroup +'"]:first'),
        lastItem            = $('.modal__item[data-group-section="'+ currentItemGroup +'"]:last');
  }



  // hides the current modal
  currentItem.addClass('is-closing-next').removeClass('is-open');
  // position next modal for animation
  if (nextItem && currentItemGroup === nextItemGroup ) {
    nextItem.addClass('is-next');
  } else {
    firstItem.addClass('is-next');
  }
  // delay to allow for CSS transition
  setTimeout(function() {
    currentItem.removeClass('is-closing-next').addClass('is-closed').hide();
  }, modalTransition);

  if (nextItem && currentItemGroup === nextItemGroup ) {
    // shows next modal
    nextItem.show().removeClass('is-closed is-next').addClass('is-opening');
    setTimeout(function() {
      nextItem.removeClass('is-opening').addClass('is-open');
    }, modalTransition);
  } else {
    // isn't another modal in category so goes back to beginning
    firstItem.show().removeClass('is-closed is-next').addClass('is-opening');
    setTimeout(function() {
      firstItem.removeClass('is-opening').addClass('is-open');
    }, modalTransition);
  }
  setTimeout(function() {
    accordionReset(); // reset photo details to open state
  }, modalTransition);
}



// -----------------------------------------
// Previous button : launch previous modal

function launchPreviousModal(){
  var currentItem = $('.modal__item.is-open'),
      previousItem    = currentItem.prev('.modal__item');

  if( modal.hasClass('modal--carousel-page') ){
    var currentItemGroup    = currentItem.data('group-page'),
        previousItemGroup       = previousItem.data('group-page'),
        firstItem           = $('.modal__item[data-group-page="'+ currentItemGroup +'"]:first'),
        lastItem            = $('.modal__item[data-group-page="'+ currentItemGroup +'"]:last');
  }else if( modal.hasClass('modal--carousel-section') ){
    var currentItemGroup    = currentItem.data('group-section'),
        previousItemGroup       = previousItem.data('group-section'),
        firstItem           = $('.modal__item[data-group-section="'+ currentItemGroup +'"]:first'),
        lastItem            = $('.modal__item[data-group-section="'+ currentItemGroup +'"]:last');
  }



  // hides the current modal
  currentItem.addClass('is-closing-prev').removeClass('is-open');
  // position prev modal for animation
  if (previousItem && currentItemGroup === previousItemGroup ) {
    previousItem.addClass('is-prev');
  } else {
    lastItem.addClass('is-prev');
  }
  // delay to allow for CSS transition
  setTimeout(function() {
    currentItem.removeClass('is-closing-prev').addClass('is-closed').hide();
  }, modalTransition);

  if (previousItem && currentItemGroup === previousItemGroup ) {
    // shows prev modal
    previousItem.show().removeClass('is-closed is-prev').addClass('is-opening');
    setTimeout(function() {
      previousItem.removeClass('is-opening').addClass('is-open');
    }, modalTransition);
  } else {
    // isn't another modal in category so goes back to beginning
    lastItem.show().removeClass('is-closed is-prev').addClass('is-opening');
    setTimeout(function() {
      lastItem.removeClass('is-opening').addClass('is-open');
    }, modalTransition);
  }
  setTimeout(function() {
    accordionReset(); // reset photo details to open state
  }, modalTransition);
}





// button press next/previous navigation
$('.js-modal-nav').on('click', function(event) {
  event.preventDefault();
  var navDirection = $(this).data('nav-direction');
  // checks which button has been clicked and runs function
  switch (navDirection) {
    case 'next':
      launchNextModal();
      break;
    case 'previous':
      launchPreviousModal();
      break;
  }
});

// keyboard next/previous navigation
$(document).on('keyup', function(e) {
  if( $('.js-modal.is-open').hasClass('modal--carousel') ){
    if(e.which === 37){
      launchPreviousModal();
    }else if(e.which === 39) {
      launchNextModal();
    }
  }
});





/* =========================================
//  MODAL URL QUERY OPENING
// ========================================*/

function queryString(sParam){
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split("&");
  for (var i = 0; i < sURLVariables.length; i++){
    var sParameterName = sURLVariables[i].split("=");
    if (sParameterName[0] == sParam){
      return sParameterName[1];
    }
  }
}

// launches modal if query string
var targetModalQuery = queryString('modal');
if (targetModalQuery) {
  var modalItem = '.modal__item--' + targetModalQuery;

  $(modalItem).removeClass('is-closed').addClass('is-open').show();
  $('body').addClass('disable-scroll');

  // open modal
  modal.fadeIn(modalTransition, function(){
    $(this).removeClass('is-closed').addClass('is-open');
  });
}




