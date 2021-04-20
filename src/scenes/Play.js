class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {

        this.load.image('player1', './assets/Cat1.png');
        this.load.image('player2', './assets/Cat2.png');
        this.load.image('spaceship', './assets/Mouse.png');
        this.load.image('starfield', './assets/BG.png');

        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 128, frameHeight: 128, startFrame: 0, endFrame: 60});
    }

    create() {

        this.starfield = this.add.tileSprite(0, 0, 500, 500, 'starfield').setOrigin(0, 0);

        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);


        this.p1Rocket = new Rocket(this, 2 * game.config.width/3, game.config.height - borderUISize - borderPadding - 30, 'player1', 0, 1).setOrigin(0.5, 0);
        this.p2Rocket = new Rocket(this, game.config.width/3, game.config.height - borderUISize - borderPadding - 30, 'player2', 0, 2).setOrigin(0.5, 0);

        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);


        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);


        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 60, first: 0}),
            frameRate: 60
        });

        this.p1Score = 0;
        this.p2Score = 0;


        let scoreConfig = {
            fontFamily: 'Chuck',
            fontSize: '20px',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 125
        }
       
        this.scoreLeft = this.add.text(borderUISize + borderPadding,
             borderUISize + borderPadding*2, "Player 1: " + this.p1Score, scoreConfig);
        this.scoreRight = this.add.text(game.config.width - (borderUISize + borderPadding) * 7,
         borderUISize + borderPadding*2, "Player 2: " + this.p2Score, scoreConfig);

        this.gameOver = false;

        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            let winText;
            if(this.p1Score > this.p2Score)
            {
                winText = "Player 1 Wins!"
            } else if(this.p2Score > this.p1Score) {
                winText = "Player 2 Wins!"
            } else {
                winText = "It's a Tie!"
            }
            this.add.text(game.config.width/2, game.config.height/2, winText, scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← to Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= 4;

        if(!this.gameOver) {
            this.p1Rocket.update();
            this.p2Rocket.update();             
             this.ship01.update();              
            this.ship02.update();
            this.ship03.update();
        }

       
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03, 1);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02, 1);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01, 1);
        }

        if(this.checkCollision(this.p2Rocket, this.ship03)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship03, 2);
        }
        if (this.checkCollision(this.p2Rocket, this.ship02)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship02, 2);
        }
        if (this.checkCollision(this.p2Rocket, this.ship01)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship01, 2);
        }
    }

    checkCollision(rocket, ship) {
        
        if (rocket.x < ship.x + ship.width * .55 && 
            rocket.x + rocket.width * .55 > ship.x && 
            rocket.y < ship.y + ship.height * .75 &&
            rocket.height * .75 + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship, playerNum) {
        
        ship.alpha = 0;                         
        
        let boom = this.add.sprite(ship.x, ship.y, 'explosion');
        boom.anims.play('explode');             
        boom.on('animationcomplete', () => {    
            ship.reset();                         
            ship.alpha = 1;                       
            boom.destroy();                       
        });
        if(playerNum === 1) {
            this.p1Score += ship.points;
            this.scoreLeft.text = "Player 1: " + this.p1Score;
        }
        else if(playerNum === 2) {
            this.p2Score += ship.points;
            this.scoreRight.text = "Player 2: " + this.p2Score;
        }
        
        this.sound.play('sfx_explosion');
      }
}