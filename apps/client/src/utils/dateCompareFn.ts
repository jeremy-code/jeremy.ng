/**
 * Sort dates in ascending order (oldest to newest)
 */
export const dateCompareFn = (
  a: ConstructorParameters<DateConstructor>[0],
  b: ConstructorParameters<DateConstructor>[0],
) => new Date(a).getTime() - new Date(b).getTime();
