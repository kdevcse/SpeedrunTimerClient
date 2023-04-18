import { vi } from "vitest";

export async function waitForTime(timeToWait: number) {
  await vi.runOnlyPendingTimersAsync();
  vi.setSystemTime(new Date(vi.getMockedSystemTime() as Date).getTime() + timeToWait);
  await vi.advanceTimersToNextTimerAsync();
}