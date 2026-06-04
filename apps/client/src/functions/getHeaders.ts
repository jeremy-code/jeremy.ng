import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import type { HTTPHeaders } from "@trpc/client";

const getHeaders = createIsomorphicFn()
  .server((): HTTPHeaders => getRequestHeaders())
  .client((): HTTPHeaders => ({}));

export { getHeaders };
