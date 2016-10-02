
function youTubeAPICall(extension, params, onSuccess){
    var url_base = "https://www.googleapis.com/youtube/v3/";
    var key = "AIzaSyA31X4L7XEUr-5MCf5Muptez91vZjSrH20";
    var reqUrl = url_base + extension + "?";

    for (var jkey in params) {
        if (params.hasOwnProperty(jkey)) {
            reqUrl += jkey + "=" + params[jkey] + "&";
        }
    }

    reqUrl+="key="+key;

    var req = new XMLHttpRequest();
    req.open('GET', reqUrl);
    req.responseType = 'json';
    req.onload = function(){
        onSuccess(req.response);
    };

    req.onerror = function(){
        console.log("ERROR");
        renderStatus('ERROR');
    };

    req.send();
}

// Appends a new search result to the search results section
function appendSearchResult(urlToPointTo, time, context){
    var html = '<li><div class="collapsible-header"><i class="material-icons">subtitles</i><a href="';
    html += urlToPointTo+'">';
    html += time;
    html += '</a></div><div class="collapsible-body"><p>';
    html += context;
    html += '</p></div></li>'
    console.log(html);
    $("#search-results-list").append(html);
}
