(function () {

	var port = chrome.extension.connect({
		name: "popup"
	});

	chrome.tabs.query({active: true}, function (resultList) {
		port.postMessage(resultList[0]);
	});

	port.onMessage.addListener(function(data) {
		document.getElementsByClassName("tab_usage")[0].children[0].innerHTML = data.tab_usage;
 		document.getElementsByClassName("total_usage")[0].children[0].innerHTML = data.total_usage;
	});

})();
