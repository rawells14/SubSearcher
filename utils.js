
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



function parseData(html){
    var parsed = [];

    $('<div/>').html(html).contents().each(function(index){
        var section = {};
        section["time"]=$(this).find(".caption-line-time").text();
        section["text"]=$(this).find(".caption-line-text").text();
        console.log(JSON.stringify(section));
        parsed.push(section);
    });
    return parsed;
}


function search(term, parsed){
    var result = [];
    var reg = new RegExp(term, "i");

    for(var i = 0; i < parsed.length; i++){
        //var execed = reg.exec(parsed[i]["text"]);
        if(parsed[i]["text"].match(reg)!=null){
            //console.log("asdfasd");
            var matched = parsed[i]["text"].replace(reg, "<b style='background-color:#fff7aa'>$&</b>");
            var context = matched;
            if(i>0){
                context = parsed[i-1]["text"]+"<br/>" + context;
            }if(i<parsed.length-1){
                context = context+"<br/>"+parsed[i+1]["text"];
            }
            result.push([result.length, parsed[i]["time"], parsed[i]["time"]+": "+matched, context]);
        }
    }

    return result;
}



// Appends a new search result to the search results section
function appendSearchResult(id, actualTime, timeDesc, context){
    var html = '<li><div id="attribute'+id+'" class="collapsible-header';
    html+= '"><i class="material-icons">subtitles</i><a class="videolink" href="#" data-time="';
    html += actualTime+'">';
    html += timeDesc;
    html += '</a></div><div class="collapsible-body"><p>';
    html += context;
    html += '</p></div></li>'
    console.log(html);
    $("#search-results-list").append(html);
}

function setSearchResult(results){

    $("#search-results-list").html("");

    for (var i = 0; i<results.length; i++){
        var current = results[i];
        appendSearchResult(current[0], current[1], current[2], current[3])
    }

    $(".videolink").click(function () {
        var time = $(this).attr('data-time');
        console.log("asdfasf");
        console.log(time);

        time = ""+time;
        var a = time.split(':');
        var seconds = 0;
        if(a.length==3) {
            seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
        }else if(a.length==2){
            seconds = (+a[0]) * 60 + (+a[1]);
        }else{
            seconds = (+a[0]);
        }


        var queryInfo = {
            active: true,
            currentWindow: true
        };
        chrome.tabs.query(queryInfo, function(tabs) {
            var tab = tabs[0];
            var url = tab.url;

            var newUrl = updateQueryStringParameter(url, "t", seconds);

            chrome.tabs.update(tab.id, {url: newUrl});
        });
    })

}

function updateQueryStringParameter(uri, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
        return uri + separator + key + "=" + value;
    }
}