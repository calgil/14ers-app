export const doPasswordsMatch = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return false;
  }
  if (password === confirmPassword) {
    return true;
  }
};
