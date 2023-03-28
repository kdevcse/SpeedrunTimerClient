import { vi } from "vitest";

export async function waitForTime(timeToWait) {
  await vi.runOnlyPendingTimersAsync();
  vi.setSystemTime(new Date(vi.getMockedSystemTime()).getTime() + timeToWait);
  await vi.advanceTimersToNextTimerAsync();
}