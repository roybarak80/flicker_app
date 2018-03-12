
var template;
function jsonFlickrFeed(json) {

    console.log(json);
    $(".row").empty();

    $.each(json.items, function (i, item) {

        var d = new Date(item.date_taken);
        var n = d.toLocaleDateString();
        var authorName = item.author.replace(/ *\([^)]*\) */g, "");
        template = `<div class="col-md-4">
                        <div class="card h-100 box-shadow">
                            <img class="card-img-top" src="${item.media.m}" alt="Card image cap">
                                <div class="card-body">
                              
                                <div class="card-cont">

                                <p class="card-title">Image title: ${item.title}</p>
                                     <p class="card-p">Image author: ${authorName}</p>
                                     <a href="${item.link}" class="card-link">View Image</a>
                                
                         </div>
                                    
                            </div>
                            <div class="card-footer">
                            <small class="text-muted">Date published: ${n}</small>
                                </div>
                        </div>
                    </div>`;

        $(template).appendTo(".row");
    });
};


function getAllImgs(search_val) {
    if (!search_val) {
        search_val = 'dogs';
    }

    $.ajax({
        url: 'https://api.flickr.com/services/feeds/photos_public.gne',
        dataType: 'jsonp',
        data: { "tags": search_val, "format": "json" }
    });
}

$('#search-btn').on('click', function () {
    var search_string = $('#img-search').val();
    getAllImgs(search_string)
});


//'<img src="http://farm'+data.photos.photo[0]['farm']+'.staticflickr.com/'+data.photos.photo[0]['id']+'/'+data.photos.photo[0]['server']+'_'+data.photos.photo[0]['secret']+'.jpg"'
function get_recent(){
    $.get( "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=bcc7c7880769d72be1127fd7515bde3c&format=json&nojsoncallback=1", function( data ) {
      
    var active_item;
    var cont;
       $.each(data.photos.photo, function(index, element){
           console.log(element)
        if(index ===0){
            active_item = 'active';
            cont =` <div class="container">
            <div class="carousel-caption text-left">
              <h1>Recent Images</h1>
              <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
            
            </div>
          </div>`;
        } else {
            active_item = '';
        }
        var template_carusel = `<div class="carousel-item ${active_item}">
        <img class="first-slide" src="http://farm${element.farm}.staticflickr.com/${element.server}/${element.id}_${element.secret}.jpg">
        ${cont}
      </div>`;
      
      $(template_carusel).appendTo(".carousel-inner");
    })
      });

      //
      //http://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
}
get_recent()
//http://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
//http://farm5.staticflickr.com/40775781451/4796_a21b72809c.jpg 502 (Cannot find server.)
//http://farm5.staticflickr.com/4775/25904526807_308013c0df.jpg