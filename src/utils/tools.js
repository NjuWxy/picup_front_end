export function getWinHeight() {
  let minHeight = 0;
  if (window.innerHeight)
    minHeight = window.innerHeight;
  else if ((document.body) && (document.body.clientHeight))
    minHeight = document.body.clientHeight;
  return minHeight;
}

export function getUserName() {
  return window.sessionStorage.getItem("username") === null ? "" : window.sessionStorage.getItem("username");;
}

export function getUserAvatar() {
  return window.sessionStorage.getItem("avatar");
}

export function getUid() {
  return window.sessionStorage.getItem("uid");
}

export function savePassword(password) {
  window.sessionStorage.setItem("password",password);
}

export function saveAvatar(avatar) {
  window.sessionStorage.setItem("avatar",avatar);
}

export function saveUser(uid,username,password,avatar) {
  window.sessionStorage.setItem("username",username);
  window.sessionStorage.setItem("avatar",avatar);
  window.sessionStorage.setItem("uid",uid);
  window.sessionStorage.setItem("password",password);
}

export function removeUser() {
  window.sessionStorage.removeItem("username");
  window.sessionStorage.removeItem("avatar");
  window.sessionStorage.removeItem("uid");
  window.sessionStorage.removeItem("password");
}

export function isSelf(username) {
  return window.sessionStorage.getItem("username")===username;
}

export function isLogin() {
  return window.sessionStorage.getItem("username") !== null;
}
