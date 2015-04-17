$(window).scroll(function() {
    var now = $(window).scrollTop();
    var movePageTop = $('#movePageTop');
    if (now > 300) {
      movePageTop.fadeIn('slow');
    } else {
      movePageTop.fadeOut('slow');
    }

//    var header = $('#header');
//    var list = $('#list');
//    if ((header.height() + list.height()) - now < 600) {
//        loadInstagram(list.data("json"));
//    }

});

$(function(){
  var clientId = 'b570746883c541058a09f7e21e96dff5';
  var list = $('#list');
  list.on('didLoadInstagram', didLoadInstagram);
  list.instagram({
    hash:'modelkit',
    count: 20,
    clientId: clientId
  });

  $('#goToTop').click(function() {
    $("html,body").animate({scrollTop:0},"slow");
  });
});

$(window).load(function() {
	
});

var next_url = 'next-url';

function searchInstagram() {
	  var clientId = 'b570746883c541058a09f7e21e96dff5';
	  var list = $('#list');
	  list.on('didLoadInstagram', didLoadInstagram);
	  list.instagram({
  		hash:'modelkit',
  		count: 20,
  		clientId: clientId,
      url: list.data(next_url)         
	  });
}

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
  
	var delaySpeed = 100;
	var fadeSpeed = 1000;
	$('#list ul li').each(function(i){
		$(this).delay(i*(delaySpeed)).css({opacity:'0'}).animate({opacity:'1'}, fadeSpeed);
	});

  $('#list').data(next_url, response.pagination.next_url);
}