import { STATUS_CODES } from "node:http";

import { assertNever } from "./assertNever";

// https://httpwg.org/specs/rfc9110.html#status.codes
type StatusClass =
  | "INFORMATIONAL"
  | "SUCCESSFUL"
  | "REDIRECTION"
  | "CLIENT_ERROR"
  | "SERVER_ERROR";

/**
 * `ok`, `status`, and `statusText` properties are based on {@link Response} API
 */
type Status = {
  ok: boolean;
  /** {@link Status.status} is between 100 and 599, inclusive */
  status: number;
  statusText: string | undefined;
  statusClass: StatusClass;
};

/**
 * Given a status code, map it to a {@link Status} object.
 *
 * @see https://httpwg.org/specs/rfc9110.html#status.codes
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status
 */
const mapStatusCode = (input: keyof typeof STATUS_CODES): Status => {
  const status = Number(input);

  if (status < 100 || status > 599) {
    // A client that receives a response with an invalid status code SHOULD
    // process the response as if it had a 5xx (Server Error) status code.
    return {
      ok: false,
      status: 500,
      statusText: STATUS_CODES[500], // "Internal Server Error"
      statusClass: "SERVER_ERROR",
    };
  }
  const statusClass: StatusClass =
    status >= 100 && status < 200 ? "INFORMATIONAL"
    : status >= 200 && status < 300 ? "SUCCESSFUL"
    : status >= 300 && status < 400 ? "REDIRECTION"
    : status >= 400 && status < 500 ? "CLIENT_ERROR"
    : status >= 400 && status < 600 ? "SERVER_ERROR"
    : assertNever(status as never);

  return {
    ok: statusClass === "SUCCESSFUL",
    status,
    statusText: STATUS_CODES[status],
    statusClass,
  };
};

export { mapStatusCode };
