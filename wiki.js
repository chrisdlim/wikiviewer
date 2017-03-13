//https://en.wikipedia.org/w/api.php?
//random https://en.wikipedia.org/wiki/Special:Random
//https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=[string]&utf8=
$(document).ready(function(){
  search.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
      getWikiArticles();
    }
  });
});//end document.ready
function getWikiArticles() {
    //get articles
    var search = $("#search").val();
    $.getJSON('http://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=' + search + '&callback=?', 
    function(api){
        console.log(api);
        var button = "<button>Want to search for something else?</button>";
        //clear results div to put more results
        $("#results").html('');
        for (var i = 0; i<10; i++){
          var title = api.query.search[i].title
          var altered = title.split(' ').join('_')
          var href="https://en.wikipedia.org/wiki/"+altered;
          var snippet = api.query.search[i].snippet;
          var x = "<div class='result container'><h2><a href="+href+" target='_blank'>"+title+"</a></h2><h4>"+snippet+"</div>";
          $(x).appendTo("#results");
        }
    }, 'jsonp');
    
    $("#searchform").submit(function(e) {
      e.preventDefault();
    });
  }//end getWikiArticles



//using ajax instead of getjson
// $.ajax({
    //   url: 'http://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=' + search,
    //   // data: { action: 'query', list: 'search', srsearch: $("input[name=Wikipedia]").val(), format: 'json' },
    //   dataType: 'jsonp',
    //   success: getWiki
 // });
 // function getWiki(api){
 //     console.log(api);
 //   }
