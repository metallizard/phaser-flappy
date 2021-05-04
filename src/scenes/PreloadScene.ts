import Phaser from 'phaser';

export default class PreloadScene extends Phaser.Scene {
    preload() {
        this.load.image('birdup', 'src/Assets/Sprites/bluebird-upflap.png');
        this.load.image('bird', 'src/Assets/Sprites/bluebird-midflap.png');
        this.load.image('birddown', 'src/Assets/Sprites/bluebird-downflap.png');
        this.load.image('pipe', 'src/Assets/Sprites/pipe-green.png');
        this.load.image('bg', 'src/Assets/Sprites/background-night.png');

        this.load.image('start', 'src/Assets/Sprites/message.png');
        this.load.image('gameOver', 'src/Assets/Sprites/gameover.png');

        this.load.image('0', 'src/Assets/Sprites/0.png');
        this.load.image('1', 'src/Assets/Sprites/1.png');
        this.load.image('2', 'src/Assets/Sprites/2.png');
        this.load.image('3', 'src/Assets/Sprites/3.png');
        this.load.image('4', 'src/Assets/Sprites/4.png');
        this.load.image('5', 'src/Assets/Sprites/5.png');
        this.load.image('6', 'src/Assets/Sprites/6.png');
        this.load.image('7', 'src/Assets/Sprites/7.png');
        this.load.image('8', 'src/Assets/Sprites/8.png');
        this.load.image('9', 'src/Assets/Sprites/9.png');

        this.load.audio('flap', 'src/Assets/SFX/wing.ogg');
        this.load.audio('dead', 'src/Assets/SFX/hit.ogg');
    }
    
    create() {
        this.anims.create({
            key: 'flap',
            frames: [
                { key: 'birddown', frame: null },
                { key: 'bird', frame: null },
                { key: 'birdup', frame: null },
            ],
            frameRate: 9
        });

        this.scene.start('GameScene');
    }
} 