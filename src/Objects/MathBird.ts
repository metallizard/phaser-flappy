import BaseBird from "./BaseBird";

export default class MathBird extends BaseBird {

    private image: Phaser.GameObjects.Image;

    private tweenUp: Phaser.Tweens.Tween;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene);
        this.image = scene.add.image(x, y, 'bird');

        this.tweenUp = scene.tweens.add(
            {
                targets: this.image,
                props: 
                {
                    y: { value: '-=100' }
                },
                ease: 'ExponentialIn',
                duration: 300,
                paused: true,
                onStart: () => 
                {
                    // this.play("startJump");
                },
                onComplete: () =>
                {
                    scene.tweens.add(
                        {
                            targets: this.image,
                            props: 
                            {
                                y: { value: '+=100', ease: 'exponentialOut' }
                            },
                            duration: 400,
                            onStart: () => 
                            {
                                // this.play("endJump");
                            },
                            onComplete: () => 
                            {
                                // onFinished();
                            }
                        })
                }
            }
        );
    }

    isOutOfScreen(screenHeight: number): boolean {
        return false;
    }

    update() {
        if(this.image.angle < 20 && !this.isDead) {
            this.image.angle += 1;
        }
    }

    flap() {
        super.flap();

        // this.body.velocity.y = -350;
        this.tweenUp.play();
    }
}