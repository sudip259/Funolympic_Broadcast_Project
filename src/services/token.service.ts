// function which returns local refresh token
const getLocalRefreshToken = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return user?.refresh;
};
// function which returns local access token
const getLocalAccessToken = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return user?.access;
};
// function which update local access token
const updateLocalAccessToken = (token: any) => {
  let user = JSON.parse(localStorage.getItem("user") || "{}");
  user.access = token;
  localStorage.setItem("user", JSON.stringify(user));
};
// function which update local refresh token
const updateLocalRefreshToken = (token: any) => {
  let user = JSON.parse(localStorage.getItem("user") || "{}");
  user.refresh = token;
  localStorage.setItem("user", JSON.stringify(user));
};
// function which returns current logged in user details
const getUser = () => {
  return JSON.parse(localStorage.getItem("user") || "{}");
};
// function which set current logged in user
const setUser = (user: any) => {
  localStorage.setItem("user", JSON.stringify(user));
};
// function which remove the user from localstorage when logout
const removeUser = () => {
  localStorage.removeItem("user");
};
const TokenService = {
  getLocalRefreshToken,
  getLocalAccessToken,
  updateLocalAccessToken,
  updateLocalRefreshToken,
  getUser,
  setUser,
  removeUser,
};
export default TokenService;
