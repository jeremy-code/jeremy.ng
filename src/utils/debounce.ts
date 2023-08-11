const debounce = <T extends unknown[]>(
  func: (this: unknown, ...args: T) => void,
  delay: number
) => {
  let debounceTimer: ReturnType<typeof setTimeout>;
  return function (this: unknown, ...args: T) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(this, args), delay);
  };
};

export default debounce;
