import Phaser from "phaser";
import BaseBird from "../Objects/BaseBird";
import PipeSpawner from "../Objects/PipeSpawner";
import ScoreManager from "../Manager/ScoreManager";
import PhysicsBird from "../Objects/PhysicsBird";
import MathBird from "../Objects/MathBird";
import PipePair from "../Objects/PipePair";
import Score from "../Objects/Score";

export default class GameScene extends Phaser.Scene {
  private bird: BaseBird;

  private pipeSpawner: PipeSpawner;

  public get IsGameOver() { 
    return this.isGameOver;
  }
  private isGameOver: boolean;

  private scoreManager: ScoreManager;

  private scoreText: Score;

  private startImage: Phaser.GameObjects.Image;
  private gameOverImage: Phaser.GameObjects.Image;

  constructor() {
    super({ key: "GameScene" });
  }

  create() {
    this.isGameOver = false;

    this.bird = this.createBird();

    this.setupTapArea(() => {
      if(!this.isGameOver) {
        this.bird.flap();
      } else {
        this.scene.start('GameScene');
      }
    });

    this.setBackground();

    this.pipeSpawner = this.createPipeSpawner(this);

    this.initScoreManager();

    this.initStaticImages();

    this.startImage.setVisible(true);
  }

  private initScoreManager() {
    this.scoreText = new Score(this, this.cameras.main.width / 2, this.cameras.main.height * 0.125);
    this.scoreManager = new ScoreManager((score) => {
      this.scoreText.setScore(score);
    });
  }

  private initStaticImages() {
    this.startImage = this.add
    .image(this.cameras.main.width / 2, this.cameras.main.height / 2, "start")
    .setDisplaySize(this.cameras.main.width * 0.75, this.cameras.main.height * 0.75)
    .setDepth(3)
    .setInteractive()
    .setVisible(false)
    .on('pointerdown', () => this.startGame());

    this.gameOverImage = this.add
    .image(this.cameras.main.width / 2, this.cameras.main.height / 2, "gameOver")
    .setDepth(3)
    .setInteractive()
    .setVisible(false);
  }

  update() {
    this.checkGameOver();
  }

  startGame() {
    this.startImage.setVisible(false);

    this.setWorldGravity(1000);

    this.pipeSpawner.startSpawning(2000, (pipe) => {
        this.handlePhysicsCollision(pipe);
    });

    this.scoreManager.show();
  }

  gameOver() {
    if(this.isGameOver) return;

    this.isGameOver = true;

    this.pipeSpawner.stopSpawning();

    this.bird.dead();

    this.physics.pause();

    this.gameOverImage.setVisible(true);
  }

  private checkGameOver() {
    if (
      this.bird.isOutOfScreen(this.cameras.main.height)
    ) {
      this.gameOver();
    }
  }

  private createBird(): BaseBird {
    return new PhysicsBird(
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

  private setWorldGravity(gravity: number) {
    this.physics.world.gravity.y = gravity;
  }

  setBackground() {
    this.add
      .image(0, 0, "bg")
      .setOrigin(0, 0)
      .setDisplaySize(this.cameras.main.width, this.cameras.main.height)
      .setDepth(-1);
  }

  private handlePhysicsCollision(pipe: PipePair) {
    this.physics.add.overlap(
      (this.bird as PhysicsBird).physicsBody.gameObject,
      pipe,
      () => {
        this.gameOver();
      }
    );
    this.physics.add.overlap(
      (this.bird as PhysicsBird).physicsBody.gameObject,
      pipe.scoreZone,
      () => {
        this.scoreManager.addScore(1);
        this.physics.world.disable(pipe.scoreZone);
      }
    );
  }

  private createPipeSpawner(scene: Phaser.Scene): PipeSpawner {
    const bound = this.cameras.main.height * 0.25;
    return new PipeSpawner(scene, -bound, bound);
  }
}
