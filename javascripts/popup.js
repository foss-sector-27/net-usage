(function () {

	var port = chrome.extension.connect({
		name: "popup"
	});

	chrome.tabs.query({active: true}, function (resultList) {
		port.postMessage(resultList[0]);
	});

	port.onMessage.addListener(function(data) {
		$(".tab_usage span").html(data.tab_usage);
		$(".total_usage span").html(data.total_usage);
	});

})();