function computeCategoriesTitle(arr) {
  if (!arr) {
    return [];
  }
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].fields.length; j++) {
      result.push(arr[i].fields[j].id + ". " + arr[i].title);
    }
  }
  return result;
}

module.exports = { computeCategoriesTitle };
