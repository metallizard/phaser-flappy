import Phaser from 'phaser';

export default class PreloadScene extends Phaser.Scene {
    preload() {
        this.load.image('bird', 'src/Assets/Sprites/bluebird-midflap.png');
        this.load.image('pipe', 'src/Assets/Sprites/pipe-green.png');
    }
    
    create() {
        const logo = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'bird');
        logo.setDisplaySize(this.cameras.main.centerX / 2, this.cameras.main.centerX / 2);
        
        this.tweens.add({
            targets: logo,
            y: 10,
            duration: 500,
            ease: 'Power2',
            yoyo: true,
            loop: -1
        });

        this.scene.start('GameScene');
    }
} 