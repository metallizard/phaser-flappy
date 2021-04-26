import PipePair from "./PipePair";
import { Math } from "phaser";

export default class PipeSpawner {
  private m_scene: Phaser.Scene;

  private spawnBoundary: { min: number; max: number };

  private isSpawning: boolean;

  private spawnEvent: Phaser.Time.TimerEvent;

  private pipePool: PipePair[];

  constructor(scene: Phaser.Scene, minPos: number, maxPos: number) {
    this.m_scene = scene;
    this.isSpawning = false;
    this.spawnBoundary = { min: minPos, max: maxPos };

    this.pipePool = [];
  }

  startSpawning(interval: number, onSpawn: (pipe: PipePair) => void) {
    this.isSpawning = true;

    this.spawnEvent = this.m_scene.time.addEvent({
      delay: interval,
      loop: true,
      callback: () => {
        if (this.isSpawning) {
          onSpawn(this.spawnPipe());
        }
      },
    });
  }

  stopSpawning() {
    this.isSpawning = false;
    this.m_scene.time.removeEvent(this.spawnEvent);
  }

  private spawnPipe() {
    let pipe = this.getPipeFromPool();
    pipe.activate(Math.Between(this.spawnBoundary.min, this.spawnBoundary.max));

    return pipe;
  }

  private getPipeFromPool() {
      for(let i = 0; i < this.pipePool.length; i++) {
        if(!this.pipePool[i].isPipeActive()) {
            return this.pipePool[i];
        }
      }

      const newPipe = new PipePair(this.m_scene, 100);
      this.pipePool.push(newPipe);
      return newPipe;
  }
}
