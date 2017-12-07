import request from '../utils/request';

export function signUp(username,password) {
  console.log(password);
  const formData = new window.FormData();
  formData.append('username', username);
  formData.append('password', password);
  const promise = request('/api/user/signUp', {
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    printInfo(v.data,"signUp");
    return v.data;
  });
}

export function login(username,password) {
  const formData = new window.FormData();
  formData.append('username', username);
  formData.append('password', password);
  const promise = request('/api/user/login', {
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    printInfo(v.data,"login");
    return v.data;
  });
}

export function getAlbums(username) {
  const formData = new window.FormData();
  formData.append("username",username);
  const promise = request('/api/album/getAlbums',{
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    printInfo(v.data,"getAlbums");
    return v.data;
  });
}

/**
 * 创建新专辑
 * @param album 专辑名称
 * @returns {Promise.<TResult>|*}
 */
export function createAlbum(album) {
  const email = window.sessionStorage.getItem("email");
  const formData = new window.FormData();
  formData.append("email",email);
  formData.append("album",album);
  const promise = request('/api/album/create',{
    method: 'POST',
    body: formData,
  });
  return promise.then((v) => {
    printInfo(v.data,"createAlbum");
    return v.data;
  });
}

function printInfo(info,func) {
  console.log("userService/"+func+": "+info);
}
