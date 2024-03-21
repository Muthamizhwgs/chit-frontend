const currentDate = new Date();
const currentMonthIndex = currentDate.getMonth();
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const CurrentMonthName = monthNames[currentMonthIndex];
