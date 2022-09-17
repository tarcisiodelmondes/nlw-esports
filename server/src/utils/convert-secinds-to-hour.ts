export const convertSecondsToHour = (seconds: number) => {
  const secondsToHour = seconds / 3600;

  const fillHourWithZeroInStart = String(secondsToHour).padStart(5, "0");
  const fillHourWithZeroInEnd = fillHourWithZeroInStart.padEnd(5, "0");

  const hourFormattedWithTwoPoint = fillHourWithZeroInEnd
    .split("")
    .map((char, index) => {
      if (index === 2) {
        return ":";
      }

      return char;
    })
    .join("");

  return hourFormattedWithTwoPoint;
};
