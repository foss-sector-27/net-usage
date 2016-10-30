(function() {
    var node = document.createElement("div");
    node.id = "net_usage"
    document.getElementsByTagName("html")[0].appendChild(node)

    var offset;
    var top;
    var left;
    var height;
    var width;
    updateBoxSize();

    document.addEventListener("mousemove", function(e) {
        var pointer_left = e.pageX;
        var pointer_top = e.pageY - document.body.scrollTop;
        var ele = document.getElementById("net_usage")
//        console.log(pointer_left, left, left + width, '===========================', pointer_top, top, top + height);
        if (pointer_left > left && pointer_left < (left + width)
            && pointer_top > top && pointer_top < (top + height)) {
            ele.className = "hidden";
        } else {
            updateBoxSize();
            ele.className = "";
        }
    });

    chrome.runtime.onMessage.addListener(function(message) {
        var ele = document.getElementById("net_usage");
        if(ele !== null) {
            ele.innerHTML = message;
            updateBoxSize();
        }
    });

    function updateBoxSize() {
        var ele = document.getElementById("net_usage");
        top = ele.offsetTop - 10;
        left = ele.offsetLeft - 20;
        height = ele.offsetHeight + 34;
        width = ele.offsetWidth + 44;
    }

})()
