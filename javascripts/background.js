(function () {

	var tabs_data_usage = {};

	/*
	 * This is not the complete solution as it misses our the header data and looks only at body data
	 * Also this will miss out on the sockets data and also data where content-length is not defined
	 * or sent by the server.
	 * TODO: Search how to fix the above listed problems
	 */
	chrome.webRequest.onCompleted.addListener(function(details) {
		tabId = details.tabId;
		if(tabId < 0) {
			return;
		}
		for(var i = 0; i < details.responseHeaders.length; ++i) {
			if(details.responseHeaders[i].name == "content-length") {
				tabs_data_usage[tabId] =
					typeof tabs_data_usage[tabId] === "undefined" ?
					parseInt(details.responseHeaders[i].value) :
					parseInt(details.responseHeaders[i].value) + tabs_data_usage[tabId];
			}
		}
		if(typeof tabs_data_usage[tabId] !== "undefined") {
			var data_usage = tabs_data_usage[tabId];
			var unit = "";
			if(data_usage < 1024) {
				unit = "B";
			} else if (data_usage < 1*1024*1024) {
				data_usage = data_usage/1024;
				unit = "KB";
			} else {
				data_usage = data_usage/1024/1024;
				unit = "MB";
			}
			var message = data_usage.toFixed(2) + " " + unit;
			chrome.tabs.sendMessage(tabId, message);
		}
	}, {
	    urls: ["<all_urls>"]
	}, ['responseHeaders']);

	chrome.tabs.onRemoved(function(tabId) {
		delete(tabs_data_usage[tabId]);
	});

	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
		if(typeof changeInfo.url === "undefined") {
			delete(tabs_data_usage[tabId]);
		}
	});

})();