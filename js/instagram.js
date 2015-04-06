            $(function(){
              var clientId = 'b570746883c541058a09f7e21e96dff5';
              
              $('.instagram').on('didLoadInstagram', didLoadInstagram);
              $('.instagram').instagram({
                hash:'プラモデル',
                count: 20,
                clientId: clientId
              });
          });
         function createPhotoElement(photo) {
              var innerHtml = $('<img>')
                .attr('src', photo.images.low_resolution.url)
                .attr('alt', photo.caption.text)
                .attr('title', photo.caption.text)
                .css('clear', 'left')
                .css('float', 'left');

              innerHtml = $('<a>')
                .attr('target', '_blank')
                .attr('href', photo.link)
                .append(innerHtml);

              var caption = $('<div>').text(photo.caption.text)
              .css('float', 'left')
              .css('width', '300');
              return $('<div>')
                .attr('id', photo.id)
                .append(innerHtml)
                .append(caption);
        }

        function didLoadInstagram(event, response) {
          var that = this;
          if (jQuery.isEmptyObject(response.data)) {
            $(that).text('結果がありません');
            return;
          }

          $.each(response.data, function(i, photo) {
            $(that).append(createPhotoElement(photo));
          });
        }
