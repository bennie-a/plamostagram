$(window).scroll(function() {
    var now = $(window).scrollTop();
    var movePageTop = $('#movePageTop');
    if (now > 300) {
      movePageTop.fadeIn('slow');
    } else {
      movePageTop.fadeOut('slow');
    }

    var header = $('#header');
    var list = $('#list');
    if ((header.height() + list.height()) - now < 600) {
        loadInstagram(list.data("json"));
    }
});

$(function(){
  var clientId = 'b570746883c541058a09f7e21e96dff5';
  var list = $('#list');
  list.on('didLoadInstagram', didLoadInstagram);
  list.instagram({
    hash:'modelkit',
    count: 1000,
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
       // .attr('src', photo.images.low_resolution.url)
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

  $.each(response.data, function(i, photo) {
    $('#list ul').append(createPhotoElement(photo));
  });
}

function loadInstagram(photoData) {
  loadCount = 10;
  maxCount = 20;
  var startIndex = $('#list ul').children('li').length;
  var $photoData;
  if (startIndex < maxCount) {
    $photoData = delimitData(startIndex, loadCount, photoData);
    $.each($photoData, function(i, photo) {
      $('#list ul').append(createPhotoElement(photo));
    });
  } else {
    var overCount = (startIndex) - (maxCount);
    var adjustCont = (startIndex)-(overCount);
    $photoData = delimitData(startIndex, adjustCont, photoData);
    $.each($photoData, function(i, photo) {
      $('#list ul').append(createPhotoElement(photo));
    });
  }
  if ($.isEmptyObject($("#list").data("json"))) {
    $("#list").data("json", photoData);
  }
}

function delimitData(startIndex, count, photoData) {
    return $.grep(photoData, function(photo, index) {
      return index >= startIndex && index < count;
    });
}
