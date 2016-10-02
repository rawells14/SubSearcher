


document.getElementsByClassName("yt-uix-button yt-uix-button-size-default yt-uix-button-opacity yt-uix-button-has-icon no-icon-markup pause-resume-autoplay yt-uix-menu-trigger yt-uix-tooltip")[0].click();
document.getElementsByClassName("yt-ui-menu-item has-icon yt-uix-menu-close-on-select action-panel-trigger action-panel-trigger-transcript")[0].click();
document.getElementsByClassName("yt-uix-button yt-uix-button-size-default yt-uix-button-default yt-uix-button-empty yt-uix-button-has-icon no-icon-markup yt-uix-button-opacity yt-uix-close")[0].click();



var interval = setInterval(function(){
    var transtext = document.getElementById("transcript-scrollbox").innerHTML;

    if(transtext.length>0){
        chrome.runtime.sendMessage({data: transtext}, function(response) {});
        clearInterval(interval);
    }

},20);
