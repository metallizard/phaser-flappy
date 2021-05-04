import Phaser from 'phaser';
import PreloadScene from './Scenes/PreloadScene';
import GameScene from './Scenes/GameScene';

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 320,
        height: 480
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {y: 0}
        }
    },
    scene: [ PreloadScene, GameScene ]
};

export default new Phaser.Game(config);