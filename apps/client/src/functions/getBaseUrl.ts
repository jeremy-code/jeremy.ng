import { createIsomorphicFn } from "@tanstack/react-start";

import { env } from "#utils/env";

const getBaseUrl = createIsomorphicFn()
  .client(() => "")
  .server(() => env.BASE_URL);

export { getBaseUrl };
