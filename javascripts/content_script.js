(function() {
	var main_container = '<div id="net_usage"></div>';

	$("html").append(main_container);

	var offset = $("#net_usage").offset();
	var top = offset.top - 10;
	var left = offset.left - 10;
	var height = $("#net_usage").height() + 24;
	var width = $("#net_usage").width() + 34;

	$(document).mousemove(function(e) {
		var pointer_left = e.pageX;
		var pointer_top = e.pageY - $(window).scrollTop();
		if (pointer_left > left && pointer_left < (left + width)
			&& pointer_top > top && pointer_top < (top + height)) {
			$("#net_usage").hide();
		} else {
			$("#net_usage").show();
		}
	});

	chrome.runtime.onMessage.addListener(function(message) {
		if($("#net_usage").length) {
			$("#net_usage").html(message);
			offset = $("#net_usage").offset();
			top = offset.top - 10;
			left = offset.left - 10;
			height = $("#net_usage").height() + 24;
			width = $("#net_usage").width() + 34;
		}
	});

})()