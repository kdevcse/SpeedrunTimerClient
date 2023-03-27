import { describe, test } from "vitest";
import { useStopwatch } from "../../src/composables/stopwatch";

describe("Stopwatch unit tests", () => {
  test("Timer Start Test", () => {
    const { onTimerStart } = useStopwatch();
    onTimerStart.call();
  });
});