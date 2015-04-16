$(window).scroll(function() {
    var now = $(window).scrollTop();
    var movePageTop = $('#movePageTop');
    if (now > 300) {
      movePageTop.fadeIn('slow');
    } else {
      movePageTop.fadeOut('slow');
    }
});

$(function(){
  var clientId = 'b570746883c541058a09f7e21e96dff5';
  var list = $('#list');
  list.on('didLoadInstagram', didLoadInstagram);
  list.instagram({
    hash:'modelkit',
    count: 40,
    clientId: clientId
  });

  $('#goToTop').click(function() {
    $("html,body").animate({scrollTop:0},"slow");
  });
});

$(window).load(function() {
  $("#list img").lazyload({
    effect: 'fadeIn',
        effectspeed: 1000
  });
});

function createPhotoElement(photo) {
    var image = $('<img>')
       .attr('src', 'http://placehold.it/306x306/ff6347')
      .attr('data-original', photo.images.low_resolution.url)
      .attr('alt', photo.caption.text);

    image = $('<a>')
      .attr('target', '_blank')
      .attr('href', photo.link)
      .append(image);

    return $('<li>').attr('id', photo.id).append(image);
}

function didLoadInstagram(event, response) {
  var that = this;
  if (jQuery.isEmptyObject(response.data)) {
    $(that).text('');
    return;
  }
  console.log(response.data.length);
  $.each(response.data, function(i, photo) {
    $('#list ul').append(createPhotoElement(photo));
  });
}