import { describe, expect, it } from "vitest";

import { dateCompareFn } from "./dateCompareFn.js";

describe("dateCompareFn", () => {
  it("sorts dates in ascending order", () => {
    expect(
      ["2024-03-15", "2020-01-01", "2023-06-10", "2021-12-25"].toSorted(
        dateCompareFn,
      ),
    ).toEqual(["2020-01-01", "2021-12-25", "2023-06-10", "2024-03-15"]);
  });

  it("returns a negative number when the first date is earlier", () => {
    expect(dateCompareFn("2020-01-01", "2021-01-01")).toBeLessThan(0);
  });

  it("returns a positive number when the first date is later", () => {
    expect(dateCompareFn("2022-01-01", "2021-01-01")).toBeGreaterThan(0);
  });

  it("returns zero for equivalent dates", () => {
    expect(dateCompareFn("2024-01-01", "2024-01-01")).toBe(0);
  });

  it("compares dates in different formats", () => {
    expect(dateCompareFn("2024-01-01", new Date("2024-01-01"))).toBe(0);
  });

  it("supports numeric timestamps", () => {
    expect(dateCompareFn(0, 1000)).toBe(-1000);
    expect(dateCompareFn(2000, 1000)).toBe(1000);
  });

  it("returns NaN when either date is invalid", () => {
    expect(dateCompareFn("invalid", "2024-01-01")).toBeNaN();
    expect(dateCompareFn("2024-01-01", "invalid")).toBeNaN();
  });
});
