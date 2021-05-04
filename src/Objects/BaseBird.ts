export default abstract class BaseBird extends Phaser.GameObjects.GameObject {

    protected flapTween?: Phaser.Tweens.Tween;

    protected flapSfx: Phaser.Sound.BaseSound;

    protected deadSfx: Phaser.Sound.BaseSound;

    protected isDead: boolean;
    
    constructor(scene: Phaser.Scene) {
        super(scene, 'BaseBird');
        scene.add.existing(this);
        this.isDead = false;

        this.flapSfx = scene.sound.add('flap');
        this.deadSfx = scene.sound.add('dead');

        scene.events.on('update', this.update, this);
    }

    abstract update();

    abstract isOutOfScreen(screenHeight:number): boolean;

    flap() {
        this.flapTween?.play();

        this.flapSfx.play();
    }

    dead() {
        this.isDead = true;
        this.deadSfx.play();
    }
}