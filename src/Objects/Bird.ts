export default class Bird extends Phaser.Physics.Arcade.Image {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'bird');
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    flap() {
        this.body.velocity.y = -350;
    }
}