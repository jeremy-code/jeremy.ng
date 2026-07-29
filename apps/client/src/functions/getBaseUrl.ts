import { createIsomorphicFn } from "@tanstack/react-start";

import { env } from "#utils/env";

const getBaseUrl = createIsomorphicFn()
  .client(() => "")
  .server(() => env.VITE_BASE_URL);

export { getBaseUrl };
