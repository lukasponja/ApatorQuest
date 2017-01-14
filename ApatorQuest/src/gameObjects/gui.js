function GUI() {
    this.container = new PIXI.Container();
    this.lcd = new PIXI.Sprite(gameTextures.lcdTexture);
    this.container.addChild(this.lcd);
    this.style = {
        //fontFamily: 'Renegade Mistress',
        fontSize: '14px',
        fill: '#000000',
    };
    this.batText = new PIXI.Text('Bat: 100%', this.style);
    this.batText.position.set(25, 23);
    this.container.addChild(this.batText);
    this.tempText = new PIXI.Text('Temp: 23.2*C', this.style);
    this.tempText.position.set(25, 37);
    this.container.addChild(this.tempText);

    this.update = function (dt) {
        this.batText.text = 'Bat: ' + player.energyLevel.toFixed(2) + '%';
    }
}