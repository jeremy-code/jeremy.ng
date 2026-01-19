import dayjs, { extend } from "dayjs";
import dayjsCustomParseFormat from "dayjs/plugin/customParseFormat";
import dayjsDevHelper from "dayjs/plugin/devHelper";
import dayjsRelativeTime from "dayjs/plugin/relativeTime";
import dayjsTimezone from "dayjs/plugin/timezone";
import dayjsUtc from "dayjs/plugin/utc";

extend(dayjsCustomParseFormat);
extend(dayjsDevHelper);
extend(dayjsUtc);
extend(dayjsTimezone);
extend(dayjsRelativeTime);

export { dayjs };
