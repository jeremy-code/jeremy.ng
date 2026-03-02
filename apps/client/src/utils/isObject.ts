const isObject = (value: unknown) =>
  value !== null && typeof value === "object";

export { isObject };
