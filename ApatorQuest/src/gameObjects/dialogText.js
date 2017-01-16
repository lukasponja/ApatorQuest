function DialogTextClass(position, size, text, speed) {
    this.container = new PIXI.Container();
    this.container.position.copy(position);
    this.textToWrite = text;
    this.size = size;
    this.style = {
        fontFamily: 'PressStart2P',
        fontSize: '12px',
        fill: '#ffffff',
        wordWrap: true,
        wordWrapWidth: this.size.width - 5
    };
    this.charIndex = 1;
    this.doneWriting = false;
    this.charSpeed = speed / text.length;
    this.charTimer = 0;

    this.graphics = new PIXI.Graphics();
    this.graphics.lineStyle(2, 0xbcf700, 1);
    this.graphics.beginFill(0x31313d, 0.5);
    this.graphics.drawRoundedRect(0, 0, this.size.width, this.size.height, 5);
    this.graphics.endFill();
    this.container.addChild(this.graphics);

    this.text = new PIXI.Text('', this.style);
    this.text.position.set(5, 5);
    this.container.addChild(this.text);

    this.update = function (dt) {
        if (!this.doneWriting) {
            this.charTimer += dt;
            if (this.charTimer >= this.charSpeed) {
                this.charTimer = 0;
                this.text.text = this.textToWrite.substring(0, this.charIndex);
                this.charIndex++;
            }
            if (this.charIndex >= this.textToWrite.length) {
                this.doneWriting = true;
            }
        }
    }

}