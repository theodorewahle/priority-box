import moment from 'moment';

export const transformDatetimeToTime = val => {
  let isValidDate;
  try {
    isValidDate = moment(val).isValid();
  } catch (error) {
    isValidDate = false;
  }
  if (isValidDate) {
    return moment(val).format('h:mm a');
  }
  return val;
};

export const transformDatetimeToLongDate = val => {
  let isValidDate;
  try {
    isValidDate = moment(val).isValid();
  } catch (error) {
    isValidDate = false;
  }
  if (isValidDate) {
    return moment(val).format('MMMM Do, YYYY');
  }
  return val;
};
