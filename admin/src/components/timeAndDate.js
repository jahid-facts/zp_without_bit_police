export function getTimeDifferenceInMinutes(timestamp) {
  // Convert the timestamp to a JavaScript Date object
  const date = new Date(timestamp);

  // Calculate the difference between the current time and the given timestamp
  const currentTime = new Date();
  const timeDifference = currentTime.getTime() - date.getTime();

  // Calculate the time difference in minutes
  const minutesDifference = Math.floor(timeDifference / (1000 * 60));

  // Return the time difference in minutes
  return minutesDifference;
}
