var clientId = 'b570746883c541058a09f7e21e96dff5';
$(function () {
    var $more = $("#more");

    $more.on('didLoadInstagram', didLoadInstagram);
    $more.on('inview', function (event, isInView, visiblePartX, visiblePartY) {
        if (isInView && visiblePartY == 'both') {
            $("#more").instagram({
                hash: 'modelkit',
                count: 30,
                url: next_url,
                clientId: clientId
            });
        }
    });

    $('#goToTop').click(function () {
        var timeout = 0;
        if (timeout == 0) {
            timeout = setTimeout(function () {
                $("html,body").animate({
                    scrollTop: 0
                }, "slow");
            }, 500);
        }
    });
});

var next_url;

function createPhotoElement(photo) {
    caption = photo.caption ? photo.caption.text : photo.tags.join(" ");
    limit = 50;
    caption_text = caption.length < limit ? caption : caption.substr(0, limit) + "...";
    var image = $('<img>')
        .attr('src', photo.images.low_resolution.url)
        .attr('alt', caption_text);

    var ul = $('<ul>').addClass('info');
    ul.append($('<li>').text(photo.likes.count).addClass('likeit'));
    ul.append($('<li>').text(photo.comments.count).addClass('comment'));
    var div = $('<div>').addClass('caption');
    div.append(ul);
    div = $('<a>')
        .attr('target', '_new')
        .attr('href', photo.link)
        .append(div);

    var thumbnail = $('<li>');
    thumbnail;
    return thumbnail.attr('id', photo.id).addClass('thumbnail').addClass('figure').append(image).append(div);
}

function didLoadInstagram(event, response) {
    var that = this;
    if (jQuery.isEmptyObject(response.data)) {
        $(that).text('');
        return;
    }

    var nesting = $("#photos");
    $.each(response.data, function (i, photo) {
        nesting.append(createPhotoElement(photo));
        $('#more').before(nesting);
    });

    next_url = response.pagination.next_url;

}