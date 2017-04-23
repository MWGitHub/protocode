/**
 * Callback for ticks.
 */
type TickCallback = (delta: number) => void;

/**
 * Interface for main loops.
 */
interface Loop {
  /**
   * Resets the loop.
   */
  reset(): void;

  /**
   * Runs the tick callbacks if needed.
   */
  update(): void;

  /**
   * Adds a callback to run on tick.
   */
  addTickCallback(callback: TickCallback): void;

  /**
   * Removes a callback from running on tick.
   */
  removeTickCallback(callback: TickCallback): void;
}

/**
 * Naive loop implementation that only limits max updates.
 * Delta times will always be based on the max per seconds.
 */
class SimpleLoop implements Loop {
  /** Maximum number of updates per second */
  private maxUpdatesPerSecond: number = 60;
  /** Last update time */
  private lastUpdateTime: number = 0;
  private tickCallbacks: TickCallback[] = [];

  /**
   * Initializes the loop.
   * 
   * @param maxUpdatesPerSecond maximum number of updates per second
   */
  constructor(maxUpdatesPerSecond: number = 60) {
    this.maxUpdatesPerSecond = maxUpdatesPerSecond;

    this.reset();
  }

  public reset(): void {
    this.lastUpdateTime = Date.now();
  }

  public addTickCallback(callback: TickCallback): void {
    this.tickCallbacks.push(callback);
  }

  public removeTickCallback(callback: TickCallback): void {
    const index = this.tickCallbacks.indexOf(callback);

    if (index >= 0) {
      this.tickCallbacks.splice(index, 1);
    }
  }

  public update(): void {
    let now = Date.now();
    let updateDelta = now - this.lastUpdateTime;
    let timeBetweenUpdates = 1000 / this.maxUpdatesPerSecond;

    if (updateDelta >= timeBetweenUpdates) {
      for (let i = 0; i < this.tickCallbacks.length; i++) {
        this.tickCallbacks[i](Math.floor(timeBetweenUpdates));
      }
      this.lastUpdateTime = Date.now();
    }
  }
}

export {
  Loop,
  SimpleLoop
};