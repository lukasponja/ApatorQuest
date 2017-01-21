function GUI() {
    this.container = new PIXI.Container();
    this.lcd = new PIXI.Sprite(gameTextures.lcdTexture);
    this.container.addChild(this.lcd);
    this.style = {
        fontFamily: 'RenegadeMistress',
        fontSize: '24px'
    };
    this.batText = new PIXI.Text('bat: 100%', this.style);
    this.batText.position.set(28, 38);
    this.container.addChild(this.batText);
    this.refreshRate = 4;
    this.frameCounter = 0;
    this.update = function (dt) {
        this.frameCounter++;
        if (this.frameCounter >= this.refreshRate) {
            this.frameCounter = 0;
            this.batText.text = 'bat: ' + player.energyLevel.toFixed(2) + '%';
        }
    }
}