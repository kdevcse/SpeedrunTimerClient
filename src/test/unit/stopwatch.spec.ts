import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { useStopwatch } from "../../renderer/composables/stopwatch";
import { waitForTime } from "../helpers/mock-time-helper";
import  { TimerWorker, WorkerCommunicator } from "../../renderer/helpers/timer-worker-helper";
import { onMessageFunc } from "../../renderer/workers/timer-worker";

vi.mock("../../renderer/helpers/timer-worker-helper", () => ({
  WorkerCommunicator: {
    postMessageToMainThread: vi.fn(),
    setOnMessageFunc: vi.fn(),
  },
  TimerWorker: vi.fn().mockImplementation(() => {
    return {
      setOnMessageFunc: vi.fn(),
      postMessageToWorker: vi.fn().mockImplementation((data) => {
        onMessageFunc({
          data: {
            command: data.command,
          },
        });
      }),
      terminate: vi.fn(),
    };
  })
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
      updateTimerTxtFromWorkerMsg,
    } = useStopwatch();

    (WorkerCommunicator.postMessageToMainThread as any).mockImplementation((data) => {
      updateTimerTxtFromWorkerMsg({
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
    const { timerTxt, onTimerInit, onTimerStart, onTimerReset, onTimerTeardown, updateTimerTxtFromWorkerMsg } = useStopwatch();

    (WorkerCommunicator.postMessageToMainThread as any).mockImplementation((data) => {
      updateTimerTxtFromWorkerMsg({
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
    const { timerTxt, onTimerInit, onTimerTeardown, onTimerStart, onTimerReset, updateTimerTxtFromWorkerMsg } = useStopwatch();

    (WorkerCommunicator.postMessageToMainThread as any).mockImplementation((data) => {
      updateTimerTxtFromWorkerMsg({
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
