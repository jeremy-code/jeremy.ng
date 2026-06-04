import { createIsomorphicFn } from "@tanstack/react-start";

import { env } from "#config/env";

const getBaseUrl = createIsomorphicFn()
  .client(() => "")
  .server(() => env.VITE_BASE_URL);

export { getBaseUrl };
