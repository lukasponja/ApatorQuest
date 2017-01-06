function Keyboard(keyCode) {
  var key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  key.lastPressed = 0;
  key.holdTime = 0;

  //The `downHandler`
  key.downHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press)
          key.press();
      if (!key.isDown) {
          key.lastPressed = Date.now();
          key.holdTime = 0;
      }
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release)
          key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  // Returns true if key has been held for set amount of time.
  key.hold = function(period) {
      // retard proof
      if (period < 1) {
          console.log("key.hold: potential bug: input out of bounds: ", period);
          return true;
      }
      if (key.isDown && key.lastPressed > 0) {
          key.holdTime = Date.now() - key.lastPressed;
      } else {
          key.holdTime = 0;
      }

      return key.holdTime >= period ? true : false;
  }

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );

  return key;
}
