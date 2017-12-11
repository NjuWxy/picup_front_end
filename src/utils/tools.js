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
  console.log("getUserAvatar");
  console.log(window.sessionStorage.getItem("avatar"));
  return window.sessionStorage.getItem("avatar");
}

export function getFansNum() {
  return window.sessionStorage.getItem("fansNum");
}

export function getFollowedNum() {
  return window.sessionStorage.getItem("followedNum");
}

export function getUid() {
  return window.sessionStorage.getItem("uid");
}

export function saveAvatar(avatar) {
  window.sessionStorage.setItem("avatar",avatar);
}

export function saveUser(uid,username,avatar,fansNum,followedNum) {
  window.sessionStorage.setItem("username",username);
  window.sessionStorage.setItem("avatar",avatar);
  window.sessionStorage.setItem("uid",uid);
  window.sessionStorage.setItem("fansNum",fansNum);
  window.sessionStorage.setItem("followedNum",followedNum);
}

export function removeUser() {
  window.sessionStorage.removeItem("username");
  window.sessionStorage.removeItem("avatar");
  window.sessionStorage.removeItem("uid");
  window.sessionStorage.removeItem("fansNum");
  window.sessionStorage.removeItem("followedNum");
}

export function isSelf(username) {
  return window.sessionStorage.getItem("username")===username;
}

export function isSelfById(uid) {
  return window.sessionStorage.getItem("uid")===uid;
}

export function isLogin() {
  return window.sessionStorage.getItem("username") !== null;
}
