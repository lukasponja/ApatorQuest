var _inputEvents = [];
var inputManagerUp = Keyboard(38);
var inputManagerDown = Keyboard(40);
var inputManagerLeft = Keyboard(37);
var inputManagerRight = Keyboard(39);
var inputManagerEsc = Keyboard(27);

/*inputManagerUp.press = function () {
    //console.log('Up press');
};

inputManagerUp.release = function () {
    //console.log('Up relese');
};

inputManagerDown.press = function () {
    //console.log('Down press');
};

inputManagerDown.release = function () {
    //console.log('Down relese');
};

inputManagerLeft.press = function () {
    //console.log('Left press');
};

inputManagerLeft.release = function () {
    //console.log('Left relese');
};

inputManagerRight.press = function () {
    //console.log('Right press');
};

inputManagerRight.release = function () {
    //console.log('Right relese');
};*/

// Returns true if e.code is in input array.
// TODO: Add checking for actions (keydown, keyup etc.)?
function inputEvent(e) {
    for (var i = 0; i < _inputEvents.length; i++) {
        if (e.code == _inputEvents[i]) {
            _inputEvents.splice(i, 1);
            return true;
        }
    }
    return false;
}

// Logs all user input (except for browser shortcuts).
function keylogger(e) {
    k = e.keyCode;
    for (var i = 0; i < _inputEvents.length; i++) {
        if (k == _inputEvents[i])
            return;
    }
    _inputEvents.push(k);
} 

// Forgets all user input.
// TODO: Test browser compatibility.
function forgetInput() {
    _inputEvents.length = 0;
}

document.addEventListener("keydown", keylogger);
