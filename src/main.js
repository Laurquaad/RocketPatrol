/*
name: Lauren Nakamura 
project title: Paw Patrol 
date:4/19/21
Time: 12 hours

Point Breakdown: 
Implement a simultaneous two-player mode (30)
Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (60)
Implement mouse control for player movement and mouse click to fire (20) 
*/
let config = {
    type: Phaser.CANVAS,
    width: 500,
    height: 500,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyF, keyR, keyLEFT, keyRIGHT;