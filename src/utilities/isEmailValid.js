export const isEmailValid = (str) => {
  if (!str.length) {
    return false;
  }
  const emailRegEx = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  if (!str.match(emailRegEx)) {
    return false;
  }
  return true;
};
