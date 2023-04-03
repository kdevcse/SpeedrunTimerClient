import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { useStopwatch } from "../../src/composables/stopwatch";
import { waitForTime } from "../helpers/time-helper";
import  { StopWatchWorker, WorkerCommunicator } from "../../src/helpers/timer-worker-helper";
import { onMessageFunc } from "../../src/workers/timer-worker";

vi.mock("../../src/helpers/timer-worker-helper", () => ({
  WorkerCommunicator: {
    postMessageToWorker: vi.fn(),
    setOnMessageFunc: vi.fn(),
  },
  StopWatchWorker: vi.fn().mockImplementation(() => {
    return {
      setOnMessageFunc: vi.fn(),
      postMessageToMainThread: vi.fn().mockImplementation((data) => {
        onMessageFunc({
          data: {
            command: data.command,
          },
        });
      }),
      terminate: vi.fn(),
    };
  }),
  WorkerCommands: {
    START: 0,
    STOP: 1,
    RESET: 2
  }
}));

describe("Stopwatch unit tests", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it("Timer start, stop, and reset", async () => {
    const {
      timerTxt,
      onTimerInit,
      onTimerTeardown,
      onTimerStart,
      onTimerStop,
      onTimerReset,
      updateTimerTxtFromEvent,
    } = useStopwatch();

    WorkerCommunicator.postMessageToWorker.mockImplementation((data) => {
      updateTimerTxtFromEvent({
        data: {
          timerTxt: data.timerTxt,
        },
      });
    });

    onTimerInit();

    onTimerStart();
    await vi.advanceTimersByTimeAsync(10);

    expect(timerTxt.value).toEqual("00:00:00.010");
    expect(vi.getTimerCount(), "The timer was not started").toEqual(1);

    onTimerStop();
    await vi.advanceTimersByTimeAsync(10);

    expect(vi.getTimerCount(), "A timer still exists").toEqual(0);
    expect(timerTxt.value).toEqual("00:00:00.010");

    onTimerReset();
    await vi.advanceTimersByTimeAsync(10);

    expect(vi.getTimerCount(), "A timer still exists").toEqual(0);
    expect(timerTxt.value).toEqual("00:00:00.000");

    onTimerTeardown();
  });

  it("Prevent duplicate start timers", async () => {
    const { timerTxt, onTimerInit, onTimerStart, onTimerReset, onTimerTeardown, updateTimerTxtFromEvent } = useStopwatch();

    WorkerCommunicator.postMessageToWorker.mockImplementation((data) => {
      updateTimerTxtFromEvent({
        data: {
          timerTxt: data.timerTxt,
        },
      });
    });

    onTimerInit();

    onTimerStart();
    await vi.advanceTimersByTimeAsync(10);

    expect(vi.getTimerCount(), "The timer was not started").toEqual(1);
    expect(timerTxt.value).toEqual("00:00:00.010");

    onTimerStart();
    await vi.advanceTimersByTimeAsync(10);

    expect(vi.getTimerCount(), "Invalid number of timers").toEqual(1);
    expect(timerTxt.value).toEqual("00:00:00.020");

    onTimerReset();
    await vi.advanceTimersByTimeAsync(10);

    onTimerTeardown();
  });

  it("Ensure timer increments appropriately", async () => {
    const { timerTxt, onTimerInit, onTimerTeardown, onTimerStart, onTimerReset, updateTimerTxtFromEvent } = useStopwatch();

    WorkerCommunicator.postMessageToWorker.mockImplementation((data) => {
      updateTimerTxtFromEvent({
        data: {
          timerTxt: data.timerTxt,
        },
      });
    });

    onTimerInit();

    vi.setSystemTime(vi.getRealSystemTime());

    onTimerStart();
    await waitForTime(15);

    expect(timerTxt.value).toEqual("00:00:00.025");

    await waitForTime(2000);

    expect(timerTxt.value).toEqual("00:00:02.025");

    await waitForTime(2000 * 60);

    expect(timerTxt.value).toEqual("00:02:02.025");

    await waitForTime(1000 * 60 * 60);

    expect(timerTxt.value).toEqual("01:02:02.025");

    onTimerReset();
    await vi.advanceTimersByTimeAsync(10);

    onTimerTeardown();
  });
});
