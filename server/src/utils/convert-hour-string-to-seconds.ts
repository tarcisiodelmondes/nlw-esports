export const convertStringHourToSeconds = (hourString: string) => {
  const hourToNumber = Number(hourString.replace(":", "."));

  const hourToSeconds = hourToNumber * 3600; // 1 second = 3600

  return hourToSeconds;
};
