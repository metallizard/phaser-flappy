import { Math } from "phaser";

export default class PipePair extends Phaser.GameObjects.Group {
    private isActive: boolean;

    private topPipe: Phaser.Physics.Arcade.Image;
    private botPipe: Phaser.Physics.Arcade.Image;

    private xOrigin: number;
    private yOrigin: number;

    private yOffset: number;

    constructor(scene: Phaser.Scene, spacing: number) {
        super(scene);
        this.xOrigin = scene.cameras.main.width * 1.1;
        this.yOrigin = scene.cameras.main.height / 2;
        this.topPipe = scene.physics.add.image(this.xOrigin, this.yOrigin, 'pipe');
        this.botPipe = scene.physics.add.image(this.xOrigin, this.yOrigin, 'pipe');

        this.yOffset = (this.topPipe.displayHeight / 2) + (spacing / 2);

        this.topPipe.y -= this.yOffset;
        this.botPipe.y += this.yOffset;


        scene.add.existing(this.topPipe);
        scene.physics.add.existing(this.topPipe);
        (this.topPipe.body as Phaser.Physics.Arcade.Body).allowGravity = false;
        this.topPipe.setAngle(180);

        scene.add.existing(this.botPipe);
        scene.physics.add.existing(this.botPipe);
        (this.botPipe.body as Phaser.Physics.Arcade.Body).allowGravity = false;

        this.add(this.topPipe);
        this.add(this.botPipe);

        this.isActive = true;
    }

    activate(position: number) {
        this.isActive = true;
        this.setActive(true);
        this.setVisible(true);

        this.resetPipePosition();

        this.topPipe.y += position;
        this.botPipe.y += position;

        this.topPipe.body.velocity.x = -100;
        this.botPipe.body.velocity.x = -100;

        let destroyIn = this.topPipe.x / this.topPipe.body.velocity.x;
        destroyIn *= 1000;
        if(destroyIn < 0) {
            destroyIn *= -1;
        }
        destroyIn += 1000;
        this.scene.time.addEvent({
            delay: destroyIn,
            loop: false,
            callback: () => {
                this.deactivate();
            },
          });
    }

    private resetPipePosition() {
        this.topPipe.setPosition(this.xOrigin, this.yOrigin);
        this.botPipe.setPosition(this.xOrigin, this.yOrigin);
        this.topPipe.y -= this.yOffset;
        this.botPipe.y += this.yOffset;
    }

    private deactivate() {
        this.isActive = false;
        this.setActive(false);
        this.setVisible(false);
    }

    isPipeActive() {
        return this.isActive;
    }

    
}