import BaseBird from "./BaseBird";

export default class PhysicsBird extends BaseBird {

    public get physicsBody() {
        return this.sprite.body;
    }

    private sprite: Phaser.Physics.Arcade.Sprite;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene);
        this.sprite = scene.physics.add.sprite(x, y, 'bird');
        scene.physics.add.existing(this);
        
        this.flapTween = scene.add.tween({
            targets: this.sprite,
            angle: -20,
            duration: 100,
        });
    }

    isOutOfScreen(screenHeight: number): boolean {
        return this.sprite.y < 0 || this.sprite.y > screenHeight;
    }

    update() {
        if(this.sprite.angle < 20 && !this.isDead) {
            this.sprite.angle += 1;
        }
    }

    flap() {
        super.flap();

        this.sprite.play('flap');

        this.sprite.body.velocity.y = -350;
    }
}