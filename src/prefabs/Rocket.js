// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, playerNum) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this); 
        this.isFiring = false;      
        this.moveSpeed = 4;
        this.playerNum = playerNum;
        console.log(playerNum);   
        this.sfxRocket = scene.sound.add('sfx_rocket')
        this.lastX = this.x;
    }

    update()
    {
        if(this.playerNum === 1)
        {
            this.updatePlayer1();
        }
        if(this.playerNum === 2)
        {
            this.updatePlayer2();
        }
    }

    updatePlayer2() {
        if(!this.isFiring) {
            this.x = Phaser.Math.Clamp(game.input.mousePointer.x,
                borderUISize,
                game.config.width - borderUISize);
        }
        var pointer = this.scene.input.activePointer;
        if(pointer.isDown && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play();
        }
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.reset();
        }
    }

    updatePlayer1() {
        if(!this.isFiring) {
            if(keyLEFT.isDown && this.x >= borderUISize) {
                this.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize) {
                this.x += this.moveSpeed;
            }
        }
        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play();
        }
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.reset();
        }
    }
    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding - 30;
    }
}
