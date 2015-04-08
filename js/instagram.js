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
    count: 50,
    clientId: clientId
  });

  $('#goToTop').click(function() {
    $("html,body").animate({scrollTop:0},"slow");
  });
});

function createPhotoElement(photo) {
    var image = $('<img>')
      .attr('src', photo.images.low_resolution.url)
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

  $.each(response.data, function(i, photo) {
    $('#list ul').append(createPhotoElement(photo));
  });
}
