export const isPasswordValid = (str) => {
  if (!str.length) {
    return false;
  }
  const passwordRegEx =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  if (!str.match(passwordRegEx)) {
    return false;
  }
  return true;
};
