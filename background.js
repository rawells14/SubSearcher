// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function updateIcon(){

	var url;

	var queryInfo = {
	    active: true,
	    currentWindow: true
  	};

	chrome.tabs.query(queryInfo, function(tabs) {
		// chrome.tabs.query invokes the callback with a list of tabs that match the
		// query. When the popup is opened, there is certainly a window and at least
		// one tab, so we can safely assume that |tabs| is a non-empty array.
		// A window can only have one active tab at a time, so the array consists of
		// exactly one tab.
		var tab = tabs[0];
		// A tab is a plain object that provides information about the tab.
		// See https://developer.chrome.com/extensions/tabs#type-Tab
		url = tab.url;

		// tab.url is only available if the "activeTab" permission is declared.
		// If you want to see the URL of other tabs (e.g. after removing active:true
		// from |queryInfo|), then the "tabs" permission is required to see their
		// "url" properties.
		console.assert(typeof url == 'string', 'tab.url should be a string');

		if (url.includes("youtube.com/watch?")){
			
			chrome.browserAction.setIcon({path: "icon1.png"})

		}
		else{

			chrome.browserAction.setIcon({path: "icon.png"})
		}
	  	});

}

chrome.tabs.onUpdated.addListener(function(tabId , info) {
    if (info.status == "complete") {
        updateIcon();
    }
});

chrome.tabs.onActivated.addListener(updateIcon);
