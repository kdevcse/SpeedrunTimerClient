import { vi } from "vitest";

export async function waitForTime(timeToWait: number) {
  await vi.runOnlyPendingTimersAsync();
  vi.setSystemTime(new Date(vi.getMockedSystemTime() as any).getTime() + timeToWait);
  await vi.advanceTimersToNextTimerAsync();
}