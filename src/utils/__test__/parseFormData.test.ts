import { describe, expect, it } from "vitest";

import { parseFormData } from "../parseFormData";

describe("parseFormData", () => {
  it("parses standard form data entries correctly", () => {
    const formData = new FormData();
    formData.append("key1", "value1");
    formData.append("key2", "value2");

    const result = parseFormData(formData);

    expect(result).toEqual({
      key1: "value1",
      key2: "value2",
    });
  });

  it("filters out $ACTION_ properties", () => {
    const formData = new FormData();
    formData.append("$ACTION_key", "actionValue");
    formData.append("normalKey", "normalValue");

    const result = parseFormData(formData);

    expect(result).toEqual({
      normalKey: "normalValue",
    });
  });

  it("handles multiple values for the same key", () => {
    const formData = new FormData();
    formData.append("multiKey", "value1");
    formData.append("multiKey", "value2");

    const result = parseFormData(formData);

    expect(result).toEqual({
      multiKey: ["value1", "value2"],
    });
  });

  it("handles empty FormData object", () => {
    const formData = new FormData();

    const result = parseFormData(formData);

    expect(result).toEqual({});
  });
});
