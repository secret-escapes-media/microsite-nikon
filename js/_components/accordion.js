

// =========================================
//  ACCORDION
// =========================================


function accordion(target,label,altLabel){
  var accordion = $('.accordion');
  var targetAccordion = $('#' + target);
  var btn = $(event.target);

  if(targetAccordion.hasClass('accordion--open')){
    targetAccordion.slideUp().removeClass('accordion--open').addClass('accordion--closed');
    if(label){ btn.html(label); }
  }else{
    accordion.slideUp().removeClass('accordion--open').addClass('accordion--closed');
    targetAccordion.slideDown().removeClass('accordion--closed').addClass('accordion--open');
    if(altLabel){ btn.html(altLabel); }
  }
}


$('.accordion').each(function(){
  $(this).slideUp().addClass('accordion--closed');
});

$('.accordion__trigger').click(function(event){

  var label = $(this).attr('data-label');
  var altLabel = $(this).attr('data-alt-label');
  var target = $(this).attr('data-target');

  if( altLabel ){
    accordion(target,label,altLabel);
  }else{
    accordion(target);
  }

});