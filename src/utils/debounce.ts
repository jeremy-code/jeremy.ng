const debounce = <T extends unknown[]>(
  func: (this: unknown, ...args: T) => void,
  delay: number
) => {
  let debounceTimer: ReturnType<typeof setTimeout>;
  return function (this: unknown, ...args: T) {
    const context = this;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

export default debounce;
