

/* =========================================
//  MODAL
// ========================================*/


var modalWrap       = $('.js-modal,.modal__wrap,.modal__item'),
    modalLaunchBtn  = $('.js-open-modal'),
    modalCloseBtn   = $('.js-close-modal'),
    modalTransition = 300; // must be the same as CSS transition duration



// -----------------------------------------
// Open modal and show selected modal__item

function modalOpen(event){

  event.preventDefault();

  var target = $(event.currentTarget).data('modal');
  var modal = $('.js-modal#' + target);

  // hides all modal content
  $('.modal__item').addClass('is-closed').hide();
  // show specific modal content from element data attribute
  var modalContent   = $(event.currentTarget).data('modal-id'),
      modalContentId = '.modal__item--' + modalContent;

  $(modalContentId).removeClass('is-closed').addClass('is-open').show();
  // disable scrolling on background content (doesn't work iOS)
  $('body').addClass('disable-scroll');
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
    $(this).removeClass('is-open').addClass('is-closed');
    $('.modal__item.is-open').removeClass('is-open').addClass('is-closed');
  });
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
  var currentModal          = $('.modal__item.is-open'),
      currentModalCategory  = currentModal.data('content-category'),
      nextModal             = currentModal.next('.modal__item'),
      nextModalCategory     = nextModal.data('content-category'),
      firstModal            = $('.modal__item[data-content-category="'+ currentModalCategory +'"]:first'),
      lastModal             = $('.modal__item[data-content-category="'+ currentModalCategory +'"]:last');

  // hides the current modal
  currentModal.addClass('is-closing-next').removeClass('is-open');
  // position next modal for animation
  if (nextModal && currentModalCategory === nextModalCategory ) {
    nextModal.addClass('is-next');
  } else {
    firstModal.addClass('is-next');
  }
  // delay to allow for CSS transition
  setTimeout(function() {
    currentModal.removeClass('is-closing-next').addClass('is-closed').hide();
  }, modalTransition);

  if (nextModal && currentModalCategory === nextModalCategory ) {
    // shows next modal
    nextModal.show().removeClass('is-closed is-next').addClass('is-opening');
    setTimeout(function() {
      nextModal.removeClass('is-opening').addClass('is-open');
    }, modalTransition);
  } else {
    // isn't another modal in category so goes back to beginning
    firstModal.show().removeClass('is-closed is-next').addClass('is-opening');
    setTimeout(function() {
      firstModal.removeClass('is-opening').addClass('is-open');
    }, modalTransition);
  }

}



// -----------------------------------------
// Previous button : launch previous modal

function launchPreviousModal(){
  var currentModal          = $('.modal__item.is-open'),
      currentModalCategory  = currentModal.data('content-category'),
      previousModal         = currentModal.prev('.modal__item'),
      previousModalCategory = previousModal.data('content-category'),
      firstModal            = $('.modal__item[data-content-category="'+ currentModalCategory +'"]:first'),
      lastModal             = $('.modal__item[data-content-category="'+ currentModalCategory +'"]:last');

  // hides the current modal
  currentModal.addClass('is-closing-prev').removeClass('is-open');
  // position next modal for animation
  if (previousModal && currentModalCategory === previousModalCategory ) {
    previousModal.addClass('is-prev');
  } else {
    lastModal.addClass('is-prev');
  }
  // delay to allow for CSS transition
  setTimeout(function() {
    currentModal.removeClass('is-closing-prev').addClass('is-closed').hide();
  }, modalTransition);

  if (previousModal && currentModalCategory === previousModalCategory ) {
    // shows previous in category
    previousModal.show().removeClass('is-closed is-prev').addClass('is-opening');
    setTimeout(function() {
      previousModal.removeClass('is-opening').addClass('is-open');
    }, modalTransition);
  } else {
    // isn't another modal in category so goes to last
    lastModal.show().removeClass('is-closed is-prev').addClass('is-opening');
    setTimeout(function() {
      lastModal.removeClass('is-opening').addClass('is-open');
    }, modalTransition);
  }
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