// https://github.com/adobe/react-spectrum/blob/57401289baf80a273c444a8201f96e2f88bf3ec6/packages/react-aria-components/src/utils.tsx#L273-L279
const composeRenderProps = <T, State, U extends T>(
  // https://tejasbubane.github.io/posts/2026-07-04-typescript-distributive-union-types/#distributive-conditional-types
  value: T extends unknown ? T | ((renderProps: State) => U) : never,
  wrap: (prevValue: T, state: State) => U,
): ((state: State) => U) => {
  return (state) =>
    wrap(
      // https://github.com/microsoft/TypeScript/issues/37663#issuecomment-2130687770
      typeof value === "function" ? value(state) : value,
      state,
    );
};

export { composeRenderProps };
