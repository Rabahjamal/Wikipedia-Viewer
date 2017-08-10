
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-articles');
    var $wikiContainer = $('#articles-box');
    
    // clear out old data before new request
    $wikiContainer.text("");
    
    //get the topic
    var topicStr = $('#search-box').val();
    //console.log(topicStr);
    // load wikipedia articles
    var wikiURL = 'https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=' + topicStr + '&titles=' + topicStr + '&prop=extracts&rvprop=content&format=json&callback=mycallback&exintro=&explaintext=&exlimit=20&srnamespace=30';  
    //var wikiURL = 'https://en.wikipedia.org/w/api.php?format=json&action=query&titles=' + topicStr +'&prop=revisions&rvprop=content&callback=?'
  //https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=Stack%20Overflow  
  //console.log(wikiURL);
    
    $.ajax({
      url: wikiURL,
      dataType: 'jsonp',
      success: function(data) {
        //console.log(data);
        var content='<ul id="wikipedia-articles">';
        //$wikiContainer.append('<ul id="wikipedia-articles"></ul>');
        var articles='';
        for(var id in data.query.search) {
          articles += '<li class="list-group-item"><a href="'+ 'https://en.wikipedia.org/wiki/' + data.query.search[id].title +'" target="_blank">' + data.query.search[id].title + '</a><p>' + data.query.search[id].snippet + '...</p></li>';
          //$wikiElem.append('<li id="article"><a href="'+ 'https://en.wikipedia.org/wiki/' + data.query.search[id].title +'" target="_blank">' + data.query.search[id].title + '</a><p>' + data.query.search[id].snippet + '</p></li>');
          //console.log(data.query.pages[id]['title']);
          //console.log(data.query.pages[id]['extract']);
        }
        content+=articles+'</ul>';
        $wikiContainer.append(content);
        
      }
    });
  
    return false;
}

$('#form-container').submit(loadData);