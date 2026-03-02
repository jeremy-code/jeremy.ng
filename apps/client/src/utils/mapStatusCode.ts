import { STATUS_CODES } from "node:http";

const STATUS_CLASS_MAP = {
  1: "INFORMATIONAL",
  2: "SUCCESSFUL",
  3: "REDIRECTION",
  4: "CLIENT_ERROR",
  5: "SERVER_ERROR",
} as const;

type HttpResponseClass =
  (typeof STATUS_CLASS_MAP)[keyof typeof STATUS_CLASS_MAP];

type Status = {
  ok: boolean;
  /** {@link Status.status} is between 100 and 599, inclusive */
  status: number;
  statusText: string | undefined;
  statusClass: HttpResponseClass;
};

/**
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
      statusText: STATUS_CODES[500], // 'Internal Server Error'
      statusClass: "SERVER_ERROR",
    };
  }

  const firstDigit = Math.floor(status / 100) as keyof typeof STATUS_CLASS_MAP;
  const statusClass = STATUS_CLASS_MAP[firstDigit] ?? "SERVER_ERROR";

  return {
    ok: statusClass === "SUCCESSFUL",
    status,
    statusText: STATUS_CODES[status],
    statusClass,
  };
};

export { mapStatusCode };
