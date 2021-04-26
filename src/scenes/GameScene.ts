import Phaser from "phaser";
import Bird from "../Objects/Bird";
import PipeSpawner from "../Objects/PipeSpawner";

export default class GameScene extends Phaser.Scene {
  private bird: Bird;

  private pipeSpawner: PipeSpawner;

  constructor() {
    super({ key: "GameScene" });
  }

  create() {
    this.bird = this.createBird();

    this.setupTapArea(() => {
      this.bird.flap();
    });

    this.setWorldGravity();

    this.pipeSpawner = this.createPipeSpawner(this);

    this.startGame();
  }

  update() {
    this.checkGameOver();
  }

  startGame() {
    this.pipeSpawner.startSpawning(2000, (pipe) => {
      this.physics.collide(this.bird, pipe, () => {
        console.log('hit');
      }, () => { console.log ('hit2'); }, this);
    });
  }

  stopGame() {
    this.pipeSpawner.stopSpawning();

    this.time.timeScale = 0;
  }

  private checkGameOver() {
    if (this.bird.y < 0 || this.bird.y > this.cameras.main.height) {
      // this.stopGame();
    }
  }

  private createBird(): Bird {
    return new Bird(
      this,
      this.cameras.main.width / 2,
      this.cameras.main.height / 2
    );
  }

  private setupTapArea(onTap: () => void) {
    const tapArea = this.add
      .rectangle(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        this.cameras.main.width,
        this.cameras.main.height,
        0xffffff,
        0
      )
      .setInteractive();

    tapArea.on(
      Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,
      () => {
        onTap();
      },
      this
    );
  }

  private setWorldGravity() {
    this.physics.world.gravity.y = 1000;
  }

  private createPipeSpawner(scene: Phaser.Scene): PipeSpawner {
    const bound = this.cameras.main.height * 0.25;
    return new PipeSpawner(scene, -bound, bound);
  }
}
