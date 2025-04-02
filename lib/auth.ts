export const getAuthToken = () => {
  const cookieArray = document.cookie.split(';');
  for (let cookie of cookieArray) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'jwt') {
      return value;
    }
  }
  return "";
};