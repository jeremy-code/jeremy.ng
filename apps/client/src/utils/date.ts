import dayjs, { extend } from "dayjs";
import dayjsDevHelper from "dayjs/plugin/devHelper";
import dayjsRelativeTime from "dayjs/plugin/relativeTime";
import dayjsTimezone from "dayjs/plugin/timezone";
import dayjsUtc from "dayjs/plugin/utc";

extend(dayjsDevHelper);
extend(dayjsUtc);
extend(dayjsTimezone);
extend(dayjsRelativeTime);

export { dayjs };
