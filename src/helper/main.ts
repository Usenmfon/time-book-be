export function parseDBError(error: any) {
  const index = error?.message?.indexOf(':');
  let message = error?.message;
  if (index >= 0) {
    message = error.message.substr(index + 1);
  }
  return message;
}

export function clearNullField<T>(obj: T) {
  const keys = Object.keys(obj);
  const result = {} as T;
  if (keys.length >= 1) {
    keys.forEach((item) => {
      if (obj[item]) {
        result[item] = obj[item];
      }
    });
    return result;
  }
  return obj;
}

export function getStartAndEndOfWeek(date) {
  const currentDate = date ? new Date(date) : new Date();
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Set to the first day of the week (Sunday)

  const endOfWeek = new Date(currentDate);
  endOfWeek.setDate(startOfWeek.getDate() + 6); // Set to the last day of the week (Saturday)

  return { startOfWeek, endOfWeek };
}
