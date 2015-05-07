$(window).scroll(function() {
    var now = $(window).scrollTop();
    var movePageTop = $('#movePageTop');
    if (now > 300) {
      movePageTop.fadeIn('slow');
    } else {
      movePageTop.fadeOut('slow');
    }
});

  var clientId = 'b570746883c541058a09f7e21e96dff5';
$(function() {
	  var $more = $("#more");
	  $more.on('didLoadInstagram', didLoadInstagram);
	  $more.on('inview', function(event, isInView, visiblePartX, visiblePartY) { 
			if (isInView && visiblePartY == 'both') {
				   $("#more").instagram({
					hash:'modelkit',
					count: 30,
					 url: next_url,         
					clientId: clientId
				  });
			}
		});

	$('#goToTop').click(function() {
		$("html,body").animate({scrollTop:0},"slow");
	});
});

var next_url;

function createPhotoElement(photo) {
	caption = photo.caption ? photo.caption.text : photo.tags.join(" ");
	limit = 300;
	caption_text = caption.length < limit ? caption : caption.substr(0, limit) + "...";
    var image = $('<img>')
       .attr('src', photo.images.low_resolution.url)
      .attr('alt', caption_text);

	var div = $('<div>').text(caption_text).addClass('caption');
    div = $('<a>')
      .attr('target', '_new')
      .attr('href', photo.link)
      .append(div);

    return $('<li>').attr('id', photo.id).addClass('figure').append(image).append(div);
}

function didLoadInstagram(event, response) {
  var that = this;
  if (jQuery.isEmptyObject(response.data)) {
    $(that).text('');
    return;
  }

  $.each(response.data, function(i, photo) {
	    $('#more').before(createPhotoElement(photo));
  });
  
	next_url = response.pagination.next_url;
}