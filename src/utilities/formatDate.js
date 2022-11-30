const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

export const formatDate = (str) => {
  const dateEnd = str.indexOf("T");
  const date = str.slice(0, dateEnd);
  const year = date.slice(0, 4);
  const month = date.slice(5, 7);
  const day = date.slice(-2);
  return `${months[month - 1]} ${day}, ${year}`;
};
