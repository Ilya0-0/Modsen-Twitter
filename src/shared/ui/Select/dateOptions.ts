import { SelectOption } from './SelectOption';

const MIN_AGE = 16;
const MAX_AGE = 100;

export const getMonths = (): SelectOption<number>[] => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return Array.from({ length: 12 }, (_, i) => ({
    title: monthNames[i],
    value: i + 1,
  }));
};

export const getDays = (
  month: number | null,
  year: number | null
): SelectOption<number>[] => {
  if (month === null || year === null) {
    return [];
  }

  const daysInMonth = new Date(year, month, 0).getDate();

  return Array.from({ length: daysInMonth }, (_, i) => ({
    title: (i + 1).toString().padStart(2, '0'),
    value: i + 1,
  }));
};

export const getYears = (): SelectOption<number>[] => {
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - MAX_AGE;
  const endYear = currentYear - MIN_AGE;

  const years: SelectOption<number>[] = [];
  for (let year = endYear; year >= startYear; year--) {
    years.push({ title: year.toString(), value: year });
  }
  return years;
};
