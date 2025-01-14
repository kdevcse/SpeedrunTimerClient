import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { useStopwatch } from "../stopwatch";

export async function waitForMs(msToWait: number) {
  const mockedSystemTime = vi.getMockedSystemTime();
  if (!mockedSystemTime) {
    return;
  }

  await vi.runOnlyPendingTimersAsync();
  vi.setSystemTime(new Date(mockedSystemTime.getTime() + msToWait));
  await vi.advanceTimersToNextTimerAsync();
}

describe("Stopwatch unit tests", () => {
  beforeEach(() => {
    vi.useFakeTimers({
      toFake: ['requestAnimationFrame', 'cancelAnimationFrame', 'performance']
    })
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("Timer start, stop, and reset", () => {
    const {
      timerTxt,
      onTimerStart,
      onTimerStop,
      onTimerReset,
    } = useStopwatch();

    onTimerStart();
    vi.advanceTimersToNextFrame();

    expect(timerTxt.value).toEqual("00:00:00.016");
    expect(vi.getTimerCount(), "The timer was not started").toEqual(1);

    vi.advanceTimersToNextFrame();

    expect(timerTxt.value).toEqual("00:00:00.032");
    expect(vi.getTimerCount(), "The timer is not longer running").toEqual(1);

    onTimerStop();
    vi.advanceTimersToNextFrame();

    expect(vi.getTimerCount(), "A timer still exists").toEqual(0);
    expect(timerTxt.value).toEqual("00:00:00.032");

    onTimerReset();
    vi.advanceTimersToNextFrame();

    expect(vi.getTimerCount(), "A timer still exists").toEqual(0);
    expect(timerTxt.value).toEqual("00:00:00.000");
  });

  it("Prevent duplicate start timers", async () => {
    const { timerTxt, onTimerStart, onTimerReset } = useStopwatch();

    onTimerStart();
    vi.advanceTimersToNextFrame();

    expect(vi.getTimerCount(), "The timer was not started").toEqual(1);
    expect(timerTxt.value).toEqual("00:00:00.016");

    onTimerStart();
    vi.advanceTimersToNextFrame();

    expect(vi.getTimerCount(), "Invalid number of timers").toEqual(1);
    expect(timerTxt.value).toEqual("00:00:00.032");

    onTimerReset();
  });

  //this test is awful we may want a different way to try it
  it.skip("Ensure timer increments appropriately", async () => {
    //vi.useRealTimers();
    vi.useFakeTimers({
      toFake: ['requestAnimationFrame', 'cancelAnimationFrame']
    });
    const { timerTxt, onTimerStart } = useStopwatch();
    let timerVal = 0;
    console.log(timerVal);

    vi.spyOn(performance, 'now').mockImplementation(() => {
      console.log(timerVal);
      return timerVal;
    });

    onTimerStart();
    timerVal += 2000;
    vi.advanceTimersToNextFrame();
    vi.advanceTimersToNextFrame();

    expect(timerTxt.value).toEqual("00:00:00.032");

    await waitForMs(2000);

    expect(timerTxt.value).toEqual("00:00:02.032");

    await vi.advanceTimersByTimeAsync(2000 * 60);

    expect(timerTxt.value).toEqual("00:02:03.360");

    await vi.advanceTimersByTimeAsync(1000 * 60 * 60);

    expect(timerTxt.value).toEqual("01:02:02.016");
  });
});