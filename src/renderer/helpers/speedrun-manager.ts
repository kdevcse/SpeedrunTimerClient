import { SpeedrunInfo } from "../../common/types/speedrun";

export class SpeedrunManager {
  private speedrun: SpeedrunInfo;
  private currentSplit = 0;

  constructor(speedrunInfo: SpeedrunInfo) {
    this.speedrun = speedrunInfo;
  }

  get CurrentSplitName() {
    return this.speedrun.splits[this.currentSplit].name;
  }

  get IsOnLastSplit() {
    return this.currentSplit + 1 >= this.speedrun.splits.length;
  }

  get IsRunOver() {
    return this.currentSplit >= this.speedrun.splits.length;
  }

  updateSplit(splitTime: number) {
    console.log('Split: ' + splitTime);
    this.speedrun.splits[this.currentSplit].time = splitTime;
    const bestTime = this.speedrun.splits[this.currentSplit].best;

    if (!bestTime || (bestTime && splitTime < bestTime)) {
      this.speedrun.splits[this.currentSplit].best = splitTime;
    }

    if (this.currentSplit + 1 >= this.speedrun.splits.length) {
      return;
    }

    this.currentSplit++;
  }

  saveRun() {
    // Code needed to save the state of the run
  }
}