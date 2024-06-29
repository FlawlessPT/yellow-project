// External Libs
import moment from 'moment';

export const today =
  moment().startOf('week').format('dddd') === 'Sunday'
    ? moment().format('dddd') === 'Sunday'
      ? 6
      : moment().weekday() - 1
    : moment().weekday();

export const getWeekdaysStrings = (day: string) => {
  switch (day) {
    case '0':
      return 'monday';
    case '1':
      return 'tuesday';
    case '2':
      return 'wednesday';
    case '3':
      return 'thursday';
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
