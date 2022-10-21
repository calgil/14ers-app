export const isEmailValid = (str) => {
  const emailRegEx = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  if (str.match(emailRegEx)) {
    return true;
  }
  return false;
};
