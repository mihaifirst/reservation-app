export default function abbreviation(name) {
  let nameArr = name.split(" ");
  if (nameArr.length === 1) {
    return name;
  } else {
    return nameArr[0][0] + ". " + nameArr[nameArr.length - 1];
  }
}
