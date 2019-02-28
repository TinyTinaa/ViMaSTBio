/**
 * 
 */

/*
 * Reduce button handler
 */

var boxes = document.getElementsByClassName("dataBox");
var buttons = document.getElementsByClassName("reduce");
var currentWidth, currentHeight;

for (var i = 0; i < boxes.length; i++) {
	(function(i) {
		buttons[i].addEventListener("click", function() {
			if (buttons[i].getAttribute("src") === "minus.png") {
				buttons[i].setAttribute("src", "plus.png");
				currentHeight = boxes[i].clientHeight;
				boxes[i].style.height = "0px";
			} else {
				buttons[i].setAttribute("src", "minus.png");
				boxes[i].style.height = currentHeight + "px";
			}
		}, false);
	})(i);
}

/*
 * Drag handler
 */

// To prevent drag from looking weird when cursor gets out of the div
// Same thing for resizing functions
document.onmousemove = function(evt) {
	drag(evt);
	resize(evt);
}
document.onmouseup = function() {
	stopDrag();
	stopResize();
};

// 
var windowsTitle = document.getElementsByClassName("windowTitle");
for (var i = 0; i < windowsTitle.length; i++) {
	(function(i) {
		windowsTitle[i].parentNode.style.left = (0.01 * document.body.clientWidth + i
				* 0.5 * document.body.clientWidth)
				+ "px";
		windowsTitle[i].onmousedown = function(evt) {
			prepareDragging(evt, this.parentNode);
		};
		windowsTitle[i].onmousemove = function(evt) {
			drag(evt);
		};
		windowsTitle[i].onmouseup = stopDrag;
	})(i);
}

var dragged = false;
var mouseStartX, mouseStartY;
var windowStartX, windowStartY;
var newWindowX, newWindowY;
var selectedWindow;

function prepareDragging(evt, window) {
	selectedWindow = window;
	dragged = true;
	mouseStartX = evt.clientX;
	mouseStartY = evt.clientY;
	windowStartX = selectedWindow.offsetLeft;
	windowStartY = selectedWindow.offsetTop;
	evt.preventDefault();
}

function drag(evt) {
	if (dragged) {
		newWindowX = evt.clientX - mouseStartX + windowStartX;
		newWindowY = evt.clientY - mouseStartY + windowStartY;

		if (newWindowX < 0) {
			selectedWindow.style.left = "0px";
		} else if (newWindowX > document.width - selectedWindow.clientWidth) {
			selectedWindow.style.left = document.width
					- selectedWindow.clientWidth + "px";
		} else {
			selectedWindow.style.left = newWindowX + "px";
		}

		if (newWindowY < 0) {
			selectedWindow.style.top = "0px";
		} else if (newWindowY > document.height - selectedWindow.clientHeight) {
			selectedWindow.style.top = document.height
					- selectedWindow.clientHeight + "px";
		} else {
			selectedWindow.style.top = newWindowY + "px";
		}
	}
}

function stopDrag() {
	dragged = false;
}

/*
 * Resize handler
 */

// Event handlers are set below with the sendForeground function
var resized = false;
var mouseStartX, mouseStartY;
var previousWidth, previousHeight;
var direction = "";
var selectedWindow;
const catchMargin = 15;

function resizeCursor(evt, window) {
	if (!resized) {
		var cursor = "";

		if (evt.clientY > window.offsetTop + window.offsetHeight - catchMargin) {
			cursor += "s";
		}
		if (evt.clientX > window.offsetLeft + window.offsetWidth - catchMargin) {
			cursor += "e";
		}

		direction = cursor;

		if (cursor !== "") {
			cursor += "-resize";
		} else {
			cursor = "auto";
		}

		window.style.cursor = cursor;
		document.body.cursor = cursor;
	}
}

function prepareResizing(evt, window) {
	if (!resized) {
		resized = true;
		selectedWindow = window;
		previousWidth = selectedWindow.clientWidth;
		previousHeight = selectedWindow.clientHeight;
		mouseStartX = evt.clientX;
		mouseStartY = evt.clientY;
	}
	evt.preventDefault();
}

function resize(evt) {
	if (resized) {
		var minWidth = selectedWindow.getElementsByTagName("h2")[0].clientWidth * 1.5;
		var minHeight = selectedWindow.getElementsByClassName("windowTitle")[0].clientHeight;
		var newWidth, newHeight;
		
		var resizeX = evt.pageX - mouseStartX;
		var resizeY = evt.pageY - mouseStartY;
		
		if (direction.includes("e")){
			newWidth = previousWidth + resizeX;
			if (newWidth < minWidth) {
				newWidth = minWidth;
			}
		}
		
		if (direction.includes("s")) {
			newHeight = previousHeight + resizeY;
			if (newHeight < minHeight) {
				newHeight = minHeight;
			}
		}
		
		newWidth += "px";
		//resizeY += "px"
		
		var box = selectedWindow.getElementsByClassName("dataBox")[0];
		selectedWindow.style.width = newWidth;
		box.style.width = newWidth;
		selectedWindow.style.height = newHeight + "px";
		//box.style.height = resizeY;
	}
}

function stopResize() {
	resized = false;
}
/*
 * Send the focused window to the foreground
 */

var windows = document.getElementsByClassName("window");
for (var i = 0; i < windows.length; i++) {
	(function(i) {
		windows[i].onmousedown = function(evt) {
			sendForeground(this);
			prepareResizing(evt, this);
		};
		windows[i].onmousemove = function(evt) {
			resizeCursor(evt, this);
			resize(evt);
		};
		windows[i].onmouseup = stopResize;
	})(i);
}

function sendForeground(focus) {
	for (var j = 0; j < windows.length; j++) {
		if (windows[j] === focus) {
			focus.style.zIndex = 1;
		} else {
			windows[j].style.zIndex = 0;
		}
	}
}