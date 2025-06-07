import dayjs from "dayjs";

export function dayjsFormat(
  date: dayjs.ConfigType,
  format?: string | undefined
): string {
  return dayjs(date).format(format);
}

export function getDaysDifference(
  targetDate: dayjs.ConfigType,
  referenceDate?: dayjs.ConfigType // Optional parameter
): number {
  const targetDay = dayjs(targetDate).startOf("day"); // Normalize to start of day
  const referenceDay = dayjs(referenceDate).startOf("day"); // Normalize reference to start of day (or current date if not provided)

  return targetDay.diff(referenceDay, "day"); // Calculate difference in days
}
