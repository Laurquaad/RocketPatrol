class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.audio('sfx_select', './assets/start.wav');
        this.load.audio('sfx_explosion', './assets/boom.wav');
        this.load.audio('sfx_rocket', './assets/meow.wav');
        this.load.image('menubg', './assets/BG.png');
    }

    create() {

        this.starfield = this.add.tileSprite(0, 0, 500, 500, 'menubg').setOrigin(0, 0);

        let menuConfig = {
            fontFamily: 'Arial',
            fontSize: '22px',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        let menutwoConfig = {
          fontFamily: 'Arial',
          fontSize: '22px',
          backgroundColor: '#FFFFFF',
          color: '#000000',
          align: 'right',
          padding: {
              top: 5,
              bottom: 5,
          },
          fixedWidth: 0
      }
  
        
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'PAW PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Player 1: Use ←→ arrows to move & (F) to fire', menutwoConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Player 2: Use Mouse to move & Left Click to fire', menutwoConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#FFEEAD';
        menuConfig.color = '#FFEEAD';
        this.add.text(game.config.width/2, game.config.height/2 + (borderUISize + borderPadding * 5), 'Press ←→, F, or click to start!', menutwoConfig).setOrigin(0.5);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    }

    update() {
        var pointer = this.input.activePointer;
        if(pointer.isDown || Phaser.Input.Keyboard.JustDown(keyLEFT) ||
        Phaser.Input.Keyboard.JustDown(keyRIGHT) || Phaser.Input.Keyboard.JustDown(keyF))
        {
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");  
        }
      }
}