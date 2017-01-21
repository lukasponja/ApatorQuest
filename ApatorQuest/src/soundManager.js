
function SoundManagerClass() {
    this.sounds = {
        backgroundMusic: new Howl({ src: ['assets/sound/backgroundMusic.mp3'], loop: true, volume: 1 }),
        pickUpSound: new Howl({ src: ['assets/sound/pickUp.mp3'] })
    };

    this.playSound = function (sound) {
        sound.play();
    };
    this.stopSound = function (sound) {
        sound.stop();
    };

    /*this.setVolume = function (sound, volume) {
        if (volume < 0) {
            volume = 0;
        }
        if (volume > 1) {
            volume = 1;
        }
        sound.volume = volume;
    };*/
}