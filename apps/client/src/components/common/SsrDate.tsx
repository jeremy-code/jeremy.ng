import { ClientOnly } from "@tanstack/react-router";
import { Temporal } from "temporal-polyfill";

type SsrDateProps = {
  dateTime: Temporal.InstantLike;
  locales?: Intl.LocalesArgument;
  options?: Intl.DateTimeFormatOptions;
};

/**
 * To avoid hydration errors, an Instant/ZonedDateTime is rendered in the UTC
 * timeozone on the server, and as its original format when JavaScript has
 * loaded on the client
 */
const SsrDate = ({ dateTime, locales, options }: SsrDateProps) => {
  const instant = Temporal.Instant.from(dateTime);

  return (
    <ClientOnly
      fallback={instant
        .toZonedDateTimeISO("UTC")
        .toLocaleString(locales, options)}
    >
      {typeof dateTime === "string" ?
        instant.toLocaleString(locales, options)
      : dateTime.toLocaleString(locales, options)}
    </ClientOnly>
  );
};

export { SsrDate, type SsrDateProps };
