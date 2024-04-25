export const formatDate = (dateString) => {
  const months = [
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
  const dateObject = new Date(dateString);
  const day = dateObject.getDate();
  const monthIndex = dateObject.getMonth();
  const year = dateObject.getFullYear();
  const monthName = months[monthIndex];
  return `${day} ${monthName} ${year}`;
};

export const extractTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};
