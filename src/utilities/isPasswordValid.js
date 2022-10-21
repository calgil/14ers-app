export const isPasswordValid = (str) => {
  const passwordRegEx =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  if (!str.match(passwordRegEx)) {
    return false;
  }
  return true;
};
