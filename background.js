// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function updateIcon(){

	var current_url;
	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
	    current_url = tabs[0].url;
	});

	if (current_url.includes("youtube.com/watch?")){

		console.log("lol")

	}


}

window.onload = updateIcon();

