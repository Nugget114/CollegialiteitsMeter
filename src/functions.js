export function formatToTime(number) {
  return ("0" + number).slice(-2);
}

export function convertTimestamp(timestamp, method = "short") {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.toLocaleString('nl-NL', { month: 'long' });

  if (method === "short") {
    return `${day} ${month}`;
  }

  const year = date.getFullYear();
  const hours = formatToTime(date.getHours());
  const minutes = formatToTime(date.getMinutes());
  const seconds = formatToTime(date.getSeconds());

  return `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;
}
