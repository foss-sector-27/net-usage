(function() {
	var main_container = '<div id="net_usage"></div>';

	$("html").append(main_container);

	chrome.runtime.onMessage.addListener(function(message) {
		if($("#net_usage").length) {
			$("#net_usage").html(message);
		}
	});

})()