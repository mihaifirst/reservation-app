export default function formatDate(date) {
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const day = date.getDate();
  return `${day}/${month}/${year}`;
}
