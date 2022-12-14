export const isNameInArray = (arr, name) => {
  const found = arr.some((el) => el.name.includes(name));
  if (found) {
    return true;
  }
  if (!found) {
    return false;
  }
};
