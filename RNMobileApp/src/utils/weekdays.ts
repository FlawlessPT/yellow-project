// External Libs
import moment from 'moment';

export const today = moment().weekday();

export const getWeekdays = () => {
  const daysBefore = [];
  const daysAfter = [];

  for (let i = today + 1; i < 7; i++) {
    daysAfter.push(i);
  }

  for (let i = today - 2; i >= 0; i--) {
    daysBefore.push(i);
  }

  return { daysBefore, daysAfter };
};

export const getWeekdaysStrings = (day: string) => {
  switch (day) {
    case '0':
      return 'monday';
    case '1':
      return 'tuesday';
    case '2':
      return 'wednesday';
    case '3':
      return 'thrusday';
    case '4':
      return 'friday';
    case '5':
      return 'saturday';
    case '6':
      return 'sunday';
    default:
      return day;
  }
};
