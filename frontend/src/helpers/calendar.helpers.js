export default function formatDate(date) {
  let month = date.getMonth() + 1;
  const year = date.getFullYear();
  let day = date.getDate();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  return `${month}/${day}/${year}`;
}
