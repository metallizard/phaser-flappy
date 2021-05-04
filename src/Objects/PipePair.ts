import { Math } from "phaser";
import GameScene from "../Scenes/GameScene";

export default class PipePair extends Phaser.GameObjects.Group {
    private m_scene: Phaser.Scene;

    private isActive: boolean;

    private topPipe: Phaser.Physics.Arcade.Image;
    private botPipe: Phaser.Physics.Arcade.Image;

    private xOrigin: number;
    private yOrigin: number;

    private yOffset: number;

    public scoreZone: Phaser.GameObjects.Zone;

    constructor(scene: Phaser.Scene, spacing: number) {
        super(scene);
        this.m_scene = scene;
        this.xOrigin = scene.cameras.main.width * 1.1;
        this.yOrigin = scene.cameras.main.height / 2;

        this.topPipe = scene.physics.add.image(this.xOrigin, this.yOrigin, 'pipe');
        this.botPipe = scene.physics.add.image(this.xOrigin, this.yOrigin, 'pipe');

        this.scoreZone = scene.add.zone(this.xOrigin, this.yOrigin, 5, scene.cameras.main.height);
        scene.physics.world.enable(this.scoreZone);
        (this.scoreZone.body as Phaser.Physics.Arcade.Body).setAllowGravity(false); 

        this.yOffset = (this.topPipe.displayHeight / 2) + (spacing / 2);

        this.topPipe.y -= this.yOffset;
        this.botPipe.y += this.yOffset;

        scene.add.existing(this.topPipe);
        scene.physics.add.existing(this.topPipe);
        (this.topPipe.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
        this.topPipe.setAngle(180);

        scene.add.existing(this.botPipe);
        scene.physics.add.existing(this.botPipe);
        (this.botPipe.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);

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
        (this.scoreZone.body as Phaser.Physics.Arcade.Body).velocity.x = -100;

        this.m_scene.physics.world.enable(this.scoreZone);

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
                if(!(this.scene as GameScene).IsGameOver)
                this.deactivate();
            },
          });
    }

    private resetPipePosition() {
        this.topPipe.setPosition(this.xOrigin, this.yOrigin);
        this.botPipe.setPosition(this.xOrigin, this.yOrigin);
        this.topPipe.y -= this.yOffset;
        this.botPipe.y += this.yOffset;

        this.scoreZone.setPosition(this.xOrigin, this.yOrigin);
    }

    private deactivate() {
        this.isActive = false;
        this.setActive(false);
        this.setVisible(false);

        this.m_scene.physics.world.disable(this.scoreZone);
    }

    isPipeActive() {
        return this.isActive;
    }

    
}