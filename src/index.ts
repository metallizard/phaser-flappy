import Phaser from 'phaser';
import PreloadScene from './Scenes/PreloadScene';
import GameScene from './Scenes/GameScene';

const config = {
    type: Phaser.AUTO,
    parent: 'phaser',
    width: 320,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {y: 150}
        }
    },
    scene: [ PreloadScene, GameScene ]
};

export default new Phaser.Game(config);