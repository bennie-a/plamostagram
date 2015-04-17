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
		$("#more").on('inview', function(event, isInView, visiblePartX, visiblePartY) { 
			if (visiblePartY == 'both') {
				searchInstagram();
			}
			
			var delaySpeed = 100;
        		var fadeSpeed = 1000;
        		$('ul li').each(function(i){
            		$(this).delay(1000).css({opacity:'0'}).animate({opacity:'1'},fadeSpeed);
	        });
		});

	$('#goToTop').click(function() {
		$("html,body").animate({scrollTop:0},"slow");
	});
});

var next_url;

function searchInstagram() {
	  var clientId = 'b570746883c541058a09f7e21e96dff5';
	  var list = $('#list');
	  list.on('didLoadInstagram', didLoadInstagram);
	  list.instagram({
  		hash:'modelkit',
  		count: 30,
	     url: next_url,         
  		clientId: clientId
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

  console.log(response.pagination.next_url);
  $.each(response.data, function(i, photo) {
	    $('#more').before(createPhotoElement(photo));
  });
  
	next_url = response.pagination.next_url;
}