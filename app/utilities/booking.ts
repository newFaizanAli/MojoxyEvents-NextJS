export const formatDateForInput = (
  year: number,
  month: number,
  day: number,
) => {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
};

export const isDateBooked = (booked_dates: string[], dateStr: string) => {
  return booked_dates.includes(dateStr);
};

export const isDatePast = (dateStr: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const checkDate = new Date(dateStr);
  return checkDate < today;
};

export const getDaysInMonth = (
  date: Date,
): { daysInMonth: number; startingDayOfWeek: number } => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  return { daysInMonth, startingDayOfWeek };
};
